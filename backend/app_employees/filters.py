import django_filters
from django.db.models import Q
from .models import Employee, Department, Gender
#----- second sample  search on multiple fields

class DepartmentFilter(django_filters.FilterSet):
  q = django_filters.CharFilter(method='my_dept_filter', label="Search")
  class Meta:
    model = Department
    fields=['q']
      
  def my_dept_filter(self, queryset, name, value):
        return queryset.filter(
            Q(deptname__icontains=value) 
        )  
class GenderFilter(django_filters.FilterSet)    :
  q = django_filters.CharFilter(method='my_gender_filter', label="Search")
  class Meta:
    model = Gender
    fields=['q']
      
  def my_gender_filter(self, queryset, name, value):
        return queryset.filter(
            Q(gender__icontains=value) 
        )  

    

class EmployeeFilter(django_filters.FilterSet):
  q = django_filters.CharFilter(method='my_custom_filter', label="Search")
  
  # id = django_filters.RangeFilter(field_name='id')
  
  id_min = django_filters.CharFilter(method='filter_by_id_range',label='From EmpId')
  id_max = django_filters.CharFilter(method='filter_by_id_range',label='To EmpId')

  
  class Meta:
    model = Employee  
    fields=['q','id_min', 'id_max']

    
    
  def my_custom_filter(self, queryset, name, value):
        return queryset.filter(
            Q(emp_name__icontains=value) |
            Q(designation__icontains=value)  |
            Q(email__icontains=value)  
            
        )
        
  def filter_by_id_range(self,queryset,name,value):
    if name =='id_min':
      return queryset.filter(emp_id__gte=value)
    
    elif name == 'id_max':
      return queryset.filter(emp_id__lte=value)
    return queryset

# --------- first sample
# class EmployeeFilter(django_filters.FilterSet):
#   # designation = django_filters.CharFilter(field_name='designation', lookup_expr='iexact')
#   designation = django_filters.CharFilter(field_name='designation', lookup_expr='icontains')
  
#   emp_name = django_filters.CharFilter(field_name='emp_name', lookup_expr='icontains')

#   # id = django_filters.RangeFilter(field_name='id')

#   # id_min = django_filters.CharFilter(method='filter_by_id_range',label='From EmpId')
#   # id_max = django_filters.CharFilter(method='filter_by_id_range',label='To EmpId')

#   class Meta:
#     model = Employee
#     # fields =['designation','emp_name','id_min', 'id_max']
#     fields =['designation','emp_name']
    
#   # def filter_by_id_range(self,queryset,name,value):
#   #   if name =='id_min':
#   #     return queryset.filter(emp_id__gte=value)
#   #   elif name == 'id_max':
#   #     return queryset.filter(emp_id__lte=value)
#   #   return queryset
  
  