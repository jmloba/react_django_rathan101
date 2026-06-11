from django.db import models
from django.contrib.auth.models import User # Import the User model

# Create your models here.
def stmt_upload_path(instance, filename):
  return '/'.join(['condobill_stmt',str(instance.bill_date),filename])
def pymt_upload_path(instance, filename):
  return '/'.join(['condobill_pymt',str(instance.payment_date),filename])

class CondoBill(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='condo_bills')
    bill_date = models.DateField(null=True, blank=True)
    bill_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    bill_img = models.ImageField(blank=True, null=True, upload_to='stmt_upload_path') # Replace with actual path
    date_of_entry = models.DateTimeField(auto_now_add=True)

    
    def __str__(self):
    # This will get the date part of the datetime object
      entry_date = self.date_of_entry.date() 
      return f"{self.id} {entry_date.strftime('%Y-%m-%d')} - {self.bill_amount}" 

class CondoPayment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='condo_payments') # New field
    bill_ref = models.ForeignKey(CondoBill, on_delete=models.CASCADE, related_name='payments', null=True, blank=True)
    payment_date = models.DateField(null=True, blank=True)
    payment_amount = models.FloatField(null=True, blank=True)
    payment_ref = models.CharField(max_length=30, null=True, blank=True)
    payment_img = models.ImageField(blank=True, null=True, upload_to=pymt_upload_path)
    date_of_entry = models.DateTimeField(auto_now_add=True) # New field, automatically set on creation

    def __str__(self):
        return self.payment_date.strftime("%Y-%m-%d") + " - " + str(self.payment_amount)
    

