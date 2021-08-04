from django.contrib.auth.models import AbstractUser
from django.db import models
from .group import AuthGroup

class User(AbstractUser):
    authGroups = models.ManyToManyField(AuthGroup, through="user_group_many", related_name="authGroups")

class user_group_many(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(AuthGroup, on_delete=models.CASCADE)
