from django.contrib import admin
from .models import Employee, Department, Gender,EmployeeSalary



class DepartmentAdmin(admin.ModelAdmin):
  list_display=('deptname','created','modified')
  ordering=('deptname',)
  list_editable =()
  filter_horizontal=()
  list_filter =()
  fieldsets=()
admin.site.register(Department,DepartmentAdmin)
class EmployeeAdmin(admin.ModelAdmin):
  list_display=('id','emp_id','lastname','firstname','middlename',
  'deptname','department',
  'gender','emp_gendername',
  'designation','email','image')
  ordering=('emp_id',)
  list_editable =('lastname','firstname','middlename','designation',)
  filter_horizontal=()
  list_filter =()
  fieldsets=()
admin.site.register(Employee,EmployeeAdmin)  


class EmpployeeSalaryAdmin(admin.ModelAdmin):
  list_display=('id','sal_empid','sal_basic','sal_transportation','sal_housing')
  ordering=('sal_empid',)
  list_editable =('sal_basic','sal_transportation','sal_housing')
  filter_horizontal=()
  list_filter =()
  fieldsets=()  
admin.site.register(EmployeeSalary,EmpployeeSalaryAdmin)

class GenderAdmin(admin.ModelAdmin):
  list_display=('id','gender','created','modified')
  ordering=('gender',)
  list_editable =()
  filter_horizontal=()
  list_filter =()
  fieldsets=()
admin.site.register(Gender,GenderAdmin)

