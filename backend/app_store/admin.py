from django.contrib import admin
from app_store.models import MasterFile

class MasterFileAdmin(admin.ModelAdmin):
  list_display=('itemnumber','description','quantity','price','storecategory','image')
  ordering=('itemnumber',)
  list_editable =('description','quantity','price','storecategory',)
  filter_horizontal=()
  list_filter =()
  fieldsets=()

admin.site.register(MasterFile,MasterFileAdmin) 