import django_filters
from django.db.models import Q
from .models import Employee, Department, Gender, EmployeeSalary
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

#http://127.0.0.1:8000/api/v1/empsalary/?sal_basic_min=15000&sal_basic_max=19000
class EmployeeSalaryFilter(django_filters.FilterSet)    :
  sal_basic = django_filters.RangeFilter() # This will enable filtering by sal_basic__gte and sal_basic__lte


  class Meta:
    model = EmployeeSalary
    fields = ['sal_basic', 'sal_empid',] # Include other fields you want to filter by


#http://127.0.0.1:8000/api/v1/employees/?id_min=101&id_max=105
#http://127.0.0.1:8000/api/v1/employees/?basic_salary_min=200&basic_salary_max=2500
class EmployeeFilter(django_filters.FilterSet):
  q = django_filters.CharFilter(method='my_custom_filter', label="Search")
  id_min = django_filters.CharFilter(method='filter_by_id_range',label='From EmpId')
  id_max = django_filters.CharFilter(method='filter_by_id_range',label='To EmpId')
    # This filter name is arbitrary, we use a custom method to filter
  basic_salary_min = django_filters.NumberFilter(field_name='employee_salary__sal_basic', lookup_expr='gte')
  basic_salary_max = django_filters.NumberFilter(field_name='employee_salary__sal_basic', lookup_expr='lte')

  class Meta:
    model = Employee  
    fields=['q','id_min', 'id_max', 'basic_salary_min', 'basic_salary_max']
    
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
  
