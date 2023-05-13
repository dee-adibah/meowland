from django.contrib import admin
from .models import User, Profile, Topic, Thread, Post

# Register your models here.
admin.site.register(User)
admin.site.register(Profile)
admin.site.register(Topic)
admin.site.register(Thread)
admin.site.register(Post)