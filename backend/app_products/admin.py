from django.contrib import admin
from .models import Products, Product_Category, TempEntries

class TempEntriesAdmin(admin.ModelAdmin):
  list_display=('id','username','itemnumber','product_name',
  'wholesale_price','retail_price','quantity', 'created','modified')
  ordering=('product_name',)
  list_editable =('quantity',)
  filter_horizontal=()
  list_filter =()
  fieldsets=()
admin.site.register(TempEntries,TempEntriesAdmin)    

class ProductCategoryAdmin(admin.ModelAdmin):
    list_display=('id','category_name','created','modified')
    ordering=('category_name',)
    list_editable =()
    filter_horizontal=()
    list_filter =()
    fieldsets=()
admin.site.register(Product_Category,ProductCategoryAdmin)    

class ProductsAdmin  (admin.ModelAdmin):
  list_display=('id','product_itemno','product_name','product_category',
  'wholesale_price','retail_price','stock','image'  )
  ordering=('product_name',)
  list_editable =('product_name', 'product_category',
  'wholesale_price','retail_price','stock','image')
  filter_horizontal=()
  list_filter =()
  fieldsets=()
admin.site.register(Products,ProductsAdmin)
