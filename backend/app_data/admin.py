from django.contrib import admin
from .models import NextDataControl


class NextDataControlAdmin(admin.ModelAdmin):
  list_display=('id','dataname','nextserial','description' ,
             'created','modified')
  ordering=('dataname',)
  list_editable =('nextserial','description',)
  filter_horizontal=()
  list_filter =()
  fieldsets=()
admin.site.register(NextDataControl,NextDataControlAdmin)    