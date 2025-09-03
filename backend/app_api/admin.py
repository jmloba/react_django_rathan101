
# Register your models here.
from django.contrib import admin
from .models import Books


class BooksAdmin(admin.ModelAdmin):
  list_display=('title','cover')
  ordering=('title',)
  list_editable =('cover',)
  filter_horizontal=()
  list_filter =()
  fieldsets=()

admin.site.register(Books,BooksAdmin)