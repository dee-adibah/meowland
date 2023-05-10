from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    pass

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=16, default='', blank=True)
    
    def __str__(self):
        return self.user

class Topic(models.Model):
    topic = models.CharField(max_length=30, unique=True)
    description = models.CharField(max_length=200)
    
    def __str__(self):
        return self.topic

class Thread(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='threads', null=True)
    thread = models.CharField(max_length=90)
    content = models.TextField()
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='creator_thread', null=True)
    created = models.DateTimeField(auto_now_add=True)
   
    def __str__(self):
        return self.thread

class Post(models.Model):
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE, related_name='thread_post')
    title = models.CharField(max_length=90)
    content = models.TextField()
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='creator_post')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(null=True)
    
    def __str__(self):
        return self.title