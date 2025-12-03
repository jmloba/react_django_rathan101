import django_filters
from django.db.models import Q
from .models import NextDataControl


class NextDataControlFilter(django_filters.FilterSet):
  class Meta:
    model = NextDataControl
    fields={
      'dataname':['iexact']

      }
      
  