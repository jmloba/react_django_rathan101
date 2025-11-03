from django.db import models

# Create your models here.


class Product_Category(models.Model):
  category_name = models.CharField(unique=True, max_length=20, null=False, blank=False )
  created = models.DateTimeField(auto_now_add=True)
  modified =models.DateTimeField(auto_now=True)
  def __str__(self):
    return self.category_name  


class Products(models.Model):    
  product_itemno = models.CharField(max_length=20, unique=True)
  product_name = models.CharField( max_length=100,null=False,blank=False)
  product_category =models.ForeignKey(Product_Category, blank=False, null=False, on_delete=models.CASCADE)
  wholesale_price  = models.DecimalField(max_digits=10, decimal_places=2,null=True,blank=True)
  retail_price  = models.DecimalField(max_digits=10, decimal_places=2,null=True,blank=True)
  stock = models.IntegerField(null=True,blank=True)     
  created = models.DateTimeField( auto_now_add=True)
  modified =models.DateTimeField(auto_now=True) 
  image = models.ImageField(blank=True, null=True, upload_to='products/')
  def __str__(self):
    return self.product_name  

  @property
  def category_name(self): 
    return self.product_category.category_name

class TempEntries(models.Model):
  username  = models.CharField(max_length=50, null=True, blank=True)
  itemnumber = models.ForeignKey(Products,  on_delete=models.CASCADE)
  product_name = models.CharField( max_length=100,null=False,blank=False)
  wholesale_price= models.DecimalField(max_digits=10, decimal_places=2,null=True,blank=True)
  retail_price= models.DecimalField(max_digits=10, decimal_places=2,null=True,blank=True)
  quantity  = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
  created = models.DateTimeField( auto_now_add=True)
  modified =models.DateTimeField(auto_now=True) 
  
  
  def __str__(self):
    return self.product_name

