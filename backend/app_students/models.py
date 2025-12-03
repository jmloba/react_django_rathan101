
# Create your models here.
from django.db import models

# Create your models here.
class Courses(models.Model):
    course = models.CharField(max_length=100, unique=True)


class Student(models.Model):
    student_id  = models.CharField(max_length=15, unique=True)
    lastname = models.CharField(max_length=50,null=True,blank=True)
    firstname = models.CharField(max_length=50)
    middlename = models.CharField(max_length=50)

    branch = models.CharField(max_length=20)
    image = models.ImageField(upload_to='student_images/', null=True, blank=True)

    def __str__(self):
        return self.name
