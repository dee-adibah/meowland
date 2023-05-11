from rest_framework import serializers
from django.contrib.auth.models import User
from .models import User, Profile, Topic, Thread, Post
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# customized Token Obtain Pair Serializer
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # encrypt username for custom claim
        token['username'] = user.username

        return token

# register serializer
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def validate(self, data):
        data = super().validate(data)

        # Validate the password
        password = data.get('password')
        validate_password(password)

        return data

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')

class TokenSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=255)

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'status')

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = (
            'id',
            'topic',
            'description',
        )

class ThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = (
            'id',
            'topic',
            'thread',
            'content',
            'creator',
            'created',
        )
        #fields = '__all__'
        #depth = 1
    

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = (
            'id',
            'thread',
            'title',
            'content',
            'creator',
            'created',
            'updated',
        )
        #depth = 1