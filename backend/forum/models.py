from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Create your models here.
class User(AbstractUser):
    pass

class ProfileManager(BaseUserManager):
    def create_user(self, user, status):
        if not user:
            raise ValueError('The User field must be set')
        profile = self.model(user=user, status=status)
        profile.save(using=self._db)
        return profile

    def create_superuser(self, user, status):
        profile = self.create_user(user=user, status=status)
        profile.is_admin = True
        profile.save(using=self._db)
        return profile

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=16, default='user', blank=True)
    about = models.TextField(max_length=500, default="Hello there", blank=True)
    photo = models.URLField(default='https://t4.ftcdn.net/jpg/03/73/50/09/360_F_373500999_wAWkzJZRb2XHm9KeHEDcCJBkx4wR67us.jpg', blank=True)
    objects = ProfileManager()
    
    def __str__(self):
        return self.status

class Topic(models.Model):
    topic = models.CharField(max_length=30, unique=True)
    description = models.CharField(max_length=200)
    
    def __str__(self):
        return self.topic

class Thread(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.DO_NOTHING)
    thread = models.CharField(max_length=90, unique=True)
    content = models.TextField()
    creator = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    created = models.DateTimeField(auto_now_add=True)
   
    def __str__(self):
        return self.thread

class Post(models.Model):
    thread = models.ForeignKey(Thread, on_delete=models.DO_NOTHING)
    title = models.CharField(max_length=90, blank=True)
    content = models.TextField()
    creator = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(null=True)
    
    def __str__(self):
        return self.title