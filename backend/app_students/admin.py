from django.contrib import admin
from .models import Student
# Register your models here.

class StudentAdmin(admin.ModelAdmin):
  list_display=('student_id','name','branch')
  ordering=('student_id',)
  list_editable =()
  filter_horizontal=()
  list_filter =()
  fieldsets=()

  
admin.site.register(Student,StudentAdmin)