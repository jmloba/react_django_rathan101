import django_filters
from django.db.models import Q
from .models import Products, Product_Category,TempEntries
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
  q = django_filters.CharFilter(method='mytempEntriesFilter', label="Search")
  class Meta:
    model = TempEntries
    fields=['q']
      
  def mytempEntriesFilter(self, queryset, name, value):
        return queryset.filter(
            Q(product_name__icontains=value)
          )    