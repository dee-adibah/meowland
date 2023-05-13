from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from rest_framework.renderers import JSONRenderer
from . import views

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("token/refresh/", jwt_views.TokenRefreshView.as_view(),
         name='token_refresh'),
    path("user/login/", views.LoginView.as_view(renderer_classes=[JSONRenderer]), name="user-login"),
    path("user/signup/", views.RegisterUsersView.as_view(renderer_classes=[JSONRenderer]), name="user-signup"),
    path("profile/", views.ProfileView.as_view(renderer_classes=[JSONRenderer]), name="profile"),
    path("profile/<str:username>/", views.ProfileOne.as_view(renderer_classes=[JSONRenderer]), name="one-profile"),
    path("profile/update/<int:user_id>", views.ProfileUpdate.as_view(), name="update-profile"),
    path('topics/', views.TopicList.as_view(renderer_classes=[JSONRenderer]), name='topic-list'),
    path('topics/create/', views.TopicCreate.as_view(), name='topic-create'),
    path('topics/update/<int:pk>/', views.TopicUpdate.as_view(), name='topic-update'),
    path('topics/delete/<int:pk>/', views.TopicDelete.as_view(), name='topic-delete'),
    path('threads/', views.ThreadList.as_view(renderer_classes=[JSONRenderer]), name='thread-list'),
    path('threads/<str:topic>', views.ThreadListByTopic.as_view(renderer_classes=[JSONRenderer]), name="thread-list-by-topic"),
    path('threads/create/', views.ThreadCreate.as_view(), name='thread-create'),
    path('threads/update/<int:pk>/', views.ThreadUpdate.as_view(), name='thread-update'),
    path('threads/delete/<int:pk>/', views.ThreadDelete.as_view(), name='thread-delete'),
    path('posts/', views.PostList.as_view(renderer_classes=[JSONRenderer]), name='post-list'),
    path('posts/<int:thread_id>', views.PostListByThread.as_view(renderer_classes=[JSONRenderer]), name="post-list-by-thread"),
    path('posts/create/', views.PostCreate.as_view(), name='post-create'),
    path('posts/update/<int:pk>/', views.PostUpdate.as_view(), name='post-update'),
    path('posts/delete/<int:pk>/', views.PostDelete.as_view(), name='post-delete'),
]
