
from django.contrib import admin
from  .models import Task

class TaskAdmin(admin.ModelAdmin):
  list_display=('title','completed','added_by')
  ordering=('title',)
  list_editable =()
  filter_horizontal=()
  list_filter =()
  fieldsets=()

admin.site.register(Task,TaskAdmin)