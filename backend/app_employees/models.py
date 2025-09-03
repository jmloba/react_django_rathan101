from django.db import models

def emp_upload_path(instance, filename):
  return '/'.join(['employee',str(instance.emp_id),filename])


class Gender(models.Model):
  gender = models.CharField(unique=True, max_length=10)
  created = models.DateTimeField(auto_now_add=True)
  modified =models.DateTimeField(auto_now=True)
  def __str__(self):
    return self.gender  
  
class Department(models.Model):
  deptname = models.CharField(unique=True, max_length=100)
  created = models.DateTimeField(auto_now_add=True)
  modified =models.DateTimeField(auto_now=True)
  def __str__(self):
    return self.deptname  

class Employee(models.Model):
  emp_id = models.CharField(max_length=20, unique=True)
  emp_name = models.CharField(max_length=50,null=False,blank=False)
   # to link to foreignkey
  deptname =models.ForeignKey(Department,on_delete=models.CASCADE, blank=True, null=True)
  
  
  designation  = models.CharField(max_length=50,null=True,blank=True)
  email = models.EmailField(blank=True, null=True)
  # gender = models.CharField(blank=True,null=True,max_length=10
  gender = models.ForeignKey(Gender, on_delete=models.CASCADE, blank=True, null=True)
                            
  department  = models.CharField(blank=True,null=True,max_length=50)
  
  # image = models.ImageField(blank=True, null=True, upload_to=emp_upload_path)
  
  image = models.ImageField(blank=True, null=True, upload_to='employee/')
  
  def __str__(self):
    return self.emp_name