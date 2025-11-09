import django_filters
from django.db.models import Q
from .models import NextDataControl


class NextDataControlFilter(django_filters.FilterSet):
  q = django_filters.CharFilter(method='datacontrol', label="Search")
  class Meta:
    model = NextDataControl
    fields=['q']
      
  def datacontrol(self, queryset, name, value):
        return queryset.filter(
            Q(dataname__icontains=value)
            # Q(username__exact=value)
          )    