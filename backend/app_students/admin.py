
from django.contrib import admin

from .models import Student 
class StudentAdmin(admin.ModelAdmin):
  list_display=('student_id','lastname', 'firstname','middlename', 'branch','image')

  ordering=('lastname','firstname','firstname',)
  list_editable =( 'firstname','lastname' ,'middlename' ,'branch')
  filter_horizontal=()
  list_filter =()
  fieldsets=()

admin.site.register(Student,StudentAdmin) 