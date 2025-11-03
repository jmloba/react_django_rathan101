from django.contrib import admin
from .models import Employee, Department, Gender



class DepartmentAdmin(admin.ModelAdmin):
  list_display=('deptname','created','modified')
  ordering=('deptname',)
  list_editable =()
  filter_horizontal=()
  list_filter =()
  fieldsets=()

class EmployeeAdmin(admin.ModelAdmin):
  list_display=('id','emp_id','emp_name',
  'deptname','department',
  'gender','emp_gendername',
  'designation','email','image')
  ordering=('emp_id',)
  list_editable =('emp_name','designation',)
  filter_horizontal=()
  list_filter =()
  fieldsets=()
  
admin.site.register(Department,DepartmentAdmin)
admin.site.register(Employee,EmployeeAdmin)

class GenderAdmin(admin.ModelAdmin):
  list_display=('id','gender','created','modified')
  ordering=('gender',)
  list_editable =()
  filter_horizontal=()
  list_filter =()
  fieldsets=()
admin.site.register(Gender,GenderAdmin)

