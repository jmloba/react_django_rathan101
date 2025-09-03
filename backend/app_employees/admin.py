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
  list_display=('emp_id','emp_name','designation','email','gender','department','image')
  ordering=('emp_id',)
  list_editable =('emp_name','designation',)
  filter_horizontal=()
  list_filter =()
  fieldsets=()
  
admin.site.register(Department,DepartmentAdmin)
admin.site.register(Employee,EmployeeAdmin)

class GenderAdmin(admin.ModelAdmin):
  list_display=('gender','created','modified')
  ordering=('gender',)
  list_editable =()
  filter_horizontal=()
  list_filter =()
  fieldsets=()
admin.site.register(Gender,GenderAdmin)

