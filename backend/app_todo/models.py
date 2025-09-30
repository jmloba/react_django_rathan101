from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Task(models.Model):
    title= models.CharField(max_length=200)
    completed = models.BooleanField(False,null=True,blank=True)
    added_by = models.ForeignKey(User,on_delete=models.DO_NOTHING)
    def __str__(self):
        return self.title