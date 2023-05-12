from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from .serializers import TopicSerializer, ProfileSerializer, ThreadSerializer, PostSerializer, MyTokenObtainPairSerializer, RegisterSerializer, UserSerializer, TokenSerializer, UserAndProfileSerializer, ProfileUpdateSerializer
from django.contrib.auth import authenticate, login
from .models import User, Profile, Topic, Thread, Post
# JWT settings
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)

# Create your views here.
class TopicList(generics.ListAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [AllowAny]
    
class TopicCreate(generics.CreateAPIView):
    serializer_class = TopicSerializer
    #permission_classes = [AllowAny]

class TopicUpdate(generics.UpdateAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    #permission_classes = [AllowAny]

class TopicDelete(generics.DestroyAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    #permission_classes = [AllowAny]
    
class ThreadList(generics.ListAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer
    #permission_classes = [AllowAny]

class ThreadListByTopic(generics.ListAPIView):
    serializer_class = ThreadSerializer
    #permission_classes = [AllowAny]
    def get_queryset(self):
        topic = self.kwargs['topic']
        queryset = Thread.objects.filter(topic__topic=topic)
        return queryset

class ThreadCreate(generics.CreateAPIView):
    serializer_class = ThreadSerializer
    queryset = Thread.objects.all()
    permission_classes = [AllowAny]
    
    def perform_create(self, serializer):
    # Set the foreign key field to an existing object
        topic_id = self.request.data.get('topic')
        topic = Topic.objects.get(id=topic_id) 
        creator_id = self.request.data.get('creator')
        creator = User.objects.get(username=creator_id)
        serializer.save(creator=creator, topic=topic) 
        
class ThreadUpdate(generics.UpdateAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer
    #permission_classes = [AllowAny]

class ThreadDelete(generics.DestroyAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer
    #permission_classes = [AllowAny]
    
class PostList(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    #permission_classes = [AllowAny]

class PostListByThread(generics.ListAPIView):
    serializer_class = PostSerializer
    #permission_classes = [AllowAny]
    def get_queryset(self):
        thread_id = self.kwargs['thread_id']
        queryset = Post.objects.filter(thread__id=thread_id)
        return queryset

class PostCreate(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
   # permission_classes = [AllowAny]
    
    def perform_create(self, serializer):
    # Set the foreign key field to an existing object
        thread_id = self.request.data.get('thread')
        thread = Thread.objects.get(id=thread_id) 
        creator_id = self.request.data.get('creator')
        creator = User.objects.get(id=creator_id)
        serializer.save(creator=creator, thread=thread) 

class PostUpdate(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
   # permission_classes = [AllowAny]

class PostDelete(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    #permission_classes = [AllowAny]

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# class RegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     permission_classes = [AllowAny]
#     serializer_class = RegisterSerializer

class LoginView(generics.ListCreateAPIView):
    """
    POST user/login/
    """

    # This permission class will overide the global permission class setting
    # Permission checks are always run at the very start of the view, before any other code is allowed to proceed.
    # The permission class here is set to AllowAny, which overwrites the global class to allow anyone to have access to login.
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer
    queryset = User.objects.all()


    def post(self, request, *args, **kwargs):
        username = request.data.get("username", "")
        password = request.data.get("password", "")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            # login saves the user’s ID in the session,
            # using Django’s session framework.
            login(request, user)
            refresh = RefreshToken.for_user(user)
            serializer = TokenSerializer(data={
                # using DRF JWT utility functions to generate a token
                "token": str(refresh.access_token)
                })
            serializer.is_valid()
            return Response(serializer.data)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

class RegisterUsersView(generics.ListCreateAPIView):
    """
    POST user/signup/
    """
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer
    #queryset = User.objects.all()

    def post(self, request, *args, **kwargs):
        username = request.data.get("username", "")
        password = request.data.get("password", "")
        email = request.data.get("email", "")
        if not username or not password or not email:
            return Response(
                data={
                    "message": "username, password and email is required to register a user"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        new_user = User.objects.create_user(
            username=username, password=password, email=email
        )
        profile = Profile.objects.create_user(
            user=new_user, status='user'
        )
        return Response(status=status.HTTP_201_CREATED)

class ProfileView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserAndProfileSerializer
    #permission_classes = [AllowAny]
    
class ProfileOne(generics.RetrieveAPIView):
    serializer_class = UserAndProfileSerializer
    queryset = User.objects.all()
    lookup_field = 'username' 
    #permission_classes = [AllowAny]
    
class ProfileUpdate(generics.UpdateAPIView):
    serializer_class = ProfileUpdateSerializer
    queryset = Profile.objects.all()
    lookup_field = 'user_id'
   # permission_classes = [AllowAny]