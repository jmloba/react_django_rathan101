import django_filters
from django.db.models import Q
from .models import Products, Product_Category ,TempEntries, SalesEntries, SalesDetails, SalesInvoice

#----- second sample  search on multiple fields

class ProductsFilter(django_filters.FilterSet):
  q = django_filters.CharFilter(method='my_products_filter', label="Search")
  class Meta:
    model = Products
    fields=['q']
      
  def my_products_filter(self, queryset, name, value):
        return queryset.filter(
            Q(product_name__icontains=value)
          )  
  
class TempEntriesFilter(django_filters.FilterSet):
  class Meta:
     model = TempEntries
     fields={
        'username':[ 'iexact'],
     }


# ------django-filter and DRF API filtering - Django REST Framework
# https://www.youtube.com/watch?v=NDFgTGTI8zg&t=600s
# http://127.0.0.1:8000/api/v1/salesEntries/
# http://127.0.0.1:8000/api/v1/salesEntries/?username__icontains=kim
# http://127.0.0.1:8000/api/v1/salesEntries/?invoice_ref=8
#http://127.0.0.1:8000/api/v1/salesEntries/?invoice_ref__range=8,9

class SalesEntriesFilter(django_filters.FilterSet):
 
  class Meta:
    model = SalesEntries
    fields={
       'username':['icontains', 'iexact'],
       'invoice_ref':['iexact','range','gt','lt','gte','lte'],
       'quantity':['exact','gt','gte','lt', 'range']
    }
class SalesInvoiceFilter (django_filters.FilterSet):
  class Meta:
    model = SalesInvoice
    fields={
      'invoice_no': ['exact', 'range', 'gt', 'lt', 'gte', 'lte'],
      
    }
           
class SalesDetailsFilter(django_filters.FilterSet):
 
  class Meta:
    model = SalesDetails
    fields={
      # Use the correct field name 'invoice'
      'invoice__invoice_no': ['exact', 'range', 'gt', 'lt', 'gte', 'lte'],
      'quantity': ['exact', 'gt', 'gte', 'lt', 'range'],
      # You can also add product filtering
      'product__product_name': ['icontains'],
      
    }

    
      
    
