from django.contrib import admin

from .models import CondoBill 
class CondoBillAdmin(admin.ModelAdmin):
  list_display=('statement_date','statement_amount',
  'payment_date','payment_amount','payment_ref', 'img_stmt','img_pymt')
  ordering=('statement_date',)
  list_editable =('statement_amount', 'payment_date',
  'payment_amount','payment_ref', 'img_stmt','img_pymt')
  filter_horizontal=()
  list_filter =()
  fieldsets=()

admin.site.register(CondoBill,CondoBillAdmin) 