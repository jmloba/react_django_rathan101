from django.contrib import admin

from .models import CondoBill , CondoPayment
class CondoBillAdmin(admin.ModelAdmin):
  list_display=('id','user','bill_date','bill_amount',
  'bill_img',)
  ordering=('bill_date',)
  list_editable =('bill_amount', 'bill_img',) 
  
  filter_horizontal=()
  list_filter =()
  fieldsets=()

admin.site.register(CondoBill,CondoBillAdmin) 
class CondoPaymentAdmin(admin.ModelAdmin):
  list_display=('bill_ref','payment_date','payment_amount',
  'payment_ref','payment_img',)
  ordering=('bill_ref',)
  list_editable =('payment_date','payment_amount',
  'payment_ref','payment_img',) 
  
  filter_horizontal=()
  list_filter =()
  fieldsets=()

admin.site.register(CondoPayment, CondoPaymentAdmin)