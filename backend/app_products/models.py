from django.db import models
from datetime import date
# Create your models here.
from django.contrib.auth.models import User

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
    return self.product_itemno

  @property
  def category_name(self): 
    return self.product_category.category_name
class SalesEntries(models.Model):

  invoice_ref = models.IntegerField( null=False, blank=False)
  username  = models.CharField(max_length=50, null=True, blank=True)
  # date = models.DateField(default=date.today, null=True, blank=True)
  product_linkid =  models.ForeignKey(Products,  on_delete=models.CASCADE,null=False, blank=False)
  # itemnumber = models.CharField(max_length=50, null=True, blank=True)
  # product_name = models.CharField( max_length=100,null=True,blank=True)
  # wholesale_price= models.DecimalField(max_digits=10, decimal_places=2,null=True,blank=True)
  # retail_price= models.DecimalField(max_digits=10, decimal_places=2,null=True,blank=True)
  quantity  = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
  created = models.DateTimeField( auto_now_add=True)
  modified =models.DateTimeField(auto_now=True) 
    
  def __str__(self):
    # return self.product_linkid.product_name
    return self.product_linkid.product_name



class TempEntries(models.Model):
  username  = models.CharField(max_length=50, null=True, blank=True)
  product_linkid =  models.ForeignKey(Products,  on_delete=models.CASCADE,null=False, blank=False)
  itemnumber = models.CharField(max_length=50, null=True, blank=True)
  product_name = models.CharField( max_length=100,null=True,blank=True)
  wholesale_price= models.DecimalField(max_digits=10, decimal_places=2,null=True,blank=True)
  retail_price= models.DecimalField(max_digits=10, decimal_places=2,null=True,blank=True)
  quantity  = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
  created = models.DateTimeField( auto_now_add=True)
  modified =models.DateTimeField(auto_now=True) 
  def __str__(self):
    return self.product_linkid.product_itemno

# SALES --------
class SalesInvoice(models.Model):
  invoice_no = models.IntegerField( null=False, blank=False, unique=True)
  invoice_date = models.DateField(null=False, blank =False)
  total_quantity = models.IntegerField(default=0)
  total_amount = models.DecimalField(max_digits=10, decimal_places=2,default=0.00)
  created = models.DateTimeField( auto_now_add=True)
  modified =models.DateTimeField(auto_now=True) 
  username  = models.ForeignKey(User, on_delete=models.CASCADE)
  
  def __str__(self):
    return str(self.invoice_no)
  class Meta:
    ordering = ['-invoice_date', '-created']  

class SalesDetails(models.Model):
  invoice = models.ForeignKey(SalesInvoice, on_delete=models.CASCADE,  related_name='details')
  product =  models.ForeignKey(Products,  on_delete=models.CASCADE,null=False, blank=False, related_name='salesdetails')
  # itemnumber = models.CharField(max_length=50, null=True, blank=True)
  # product_name = models.CharField( max_length=100,null=True,blank=True)
  # wholesale_price= models.DecimalField(max_digits=10, decimal_places=2,null=True,blank=True)
  # retail_price= models.DecimalField(max_digits=10, decimal_places=2,null=True,blank=True)
  quantity  = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
  created = models.DateTimeField( auto_now_add=True)
  modified =models.DateTimeField(auto_now=True) 
  def __str__(self):
    return (f'{self.product.product_name} on Invoice {self.invoice.invoice_no}')
  class Meta:
    ordering = ['-created']


