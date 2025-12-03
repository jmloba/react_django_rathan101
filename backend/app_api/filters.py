import django_filters

from django.db.models import Q
from app_api.models import Books

class BooksFilter(django_filters.FilterSet):
  q = django_filters.CharFilter(method='my_books_filter', label="Search")
  class Meta:
    model = Books
    fields=['q']
      
  def my_books_filter(self, queryset, name, value):
        return queryset.filter(
            Q(title__icontains=value) 
        )  