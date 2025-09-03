from django.db import models

def upload_path(instance, filename):
  return '/'.join(['cover',str(instance.title),filename])


class Books(models.Model):
  title = models.CharField(max_length=32, blank=False)
  cover = models.ImageField(blank=True, null=True, upload_to='upload/books/')
  