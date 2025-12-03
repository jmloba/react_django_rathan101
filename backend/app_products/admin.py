from django.contrib import admin
from .models import Products, Product_Category, TempEntries, SalesEntries, SalesInvoice, SalesDetails

class SalesInvoiceAdmin(admin.ModelAdmin):
  list_display=('id','invoice_no','username','invoice_date','total_quantity', 'total_amount')
  ordering=('invoice_no',)
  list_editable =('total_quantity','total_amount')
  filter_horizontal=()
  list_filter =()
  fieldsets=()
admin.site.register(SalesInvoice,SalesInvoiceAdmin)    

class SalesDetailsAdmin(admin.ModelAdmin):
  list_display=('invoice','product','quantity')
  ordering=('invoice',)
  list_editable =('quantity',)
  filter_horizontal=()
  list_filter =()
  fieldsets=()

admin.site.register(SalesDetails,SalesDetailsAdmin)      

class SalesEntriesAdmin(admin.ModelAdmin):
  list_display=('id','invoice_ref','username','product_linkid','quantity')
  ordering=('invoice_ref','product_linkid')
  list_editable =('quantity',)
  filter_horizontal=()
  list_filter =()
  fieldsets=()
admin.site.register(SalesEntries,SalesEntriesAdmin)    

class TempEntriesAdmin(admin.ModelAdmin):
  list_display=('id','username','product_linkid','itemnumber','product_name',
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
