
from django.contrib import admin

from .models import Student 
class StudentAdmin(admin.ModelAdmin):
  list_display=('student_id','name',  'branch','image')

  ordering=('name',)
  list_editable =( 'name'  ,'branch')
  filter_horizontal=()
  list_filter =()
  fieldsets=()

admin.site.register(Student,StudentAdmin) 