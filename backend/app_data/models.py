from django.db import models

# Create your models here.
class NextDataControl(models.Model):
    dataname = models.CharField(max_length=50, null=False, blank=False, unique=True)
    nextserial = models.IntegerField(blank=True, null=True)
    description = models.CharField(max_length=200, blank=True, null=True)
    created = models.DateTimeField( auto_now_add=True)
    modified =models.DateTimeField(auto_now=True) 
    def __str__(self):
        return self.dataname
    
    


  