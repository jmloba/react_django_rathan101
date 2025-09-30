from django.db import models

# Create your models here.
def store_upload_path(instance, filename):
  return '/'.join(['store',str(instance.itemnumber),filename])

class MasterFile(models.Model):
  itemnumber = models.CharField(max_length=20)
  description = models.CharField(max_length=200)
  quantity = models.IntegerField()
  price = models.DecimalField(max_digits=10, decimal_places=2)
  storecategory = models.CharField(max_length=50)
  
  image = models.ImageField(blank=True, null=True, upload_to=store_upload_path)
  def __str__(self):
      return self.description