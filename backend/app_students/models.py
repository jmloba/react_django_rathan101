
# Create your models here.
from django.db import models

# Create your models here.


class Student(models.Model):
    student_id  = models.CharField(max_length=15, unique=True)
    name = models.CharField(max_length=50)
    branch = models.CharField(max_length=20)
    image = models.ImageField(upload_to='student_images/', null=True, blank=True)

    def __str__(self):
        return self.name
