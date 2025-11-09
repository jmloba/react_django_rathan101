from app_products.models import Products, Product_Category , TempEntries, SalesEntries

from rest_framework import serializers


class ProductCategorySerializers(serializers.ModelSerializer):
  class Meta:
    model = Product_Category
    fields = '__all__'  
  def validate(self, data):
      # Assuming 'unique_field' is the field that should be unique
      unique_field_value = data.get('category_name')

      # Check if an object with this 'unique_field' already exists
      if Product_Category.objects.filter(category_name=unique_field_value).exists():
          raise serializers.ValidationError(
              {'unique_field': 'This value for category_name already exists.'}
          )
      return data          


class ProductSerializers(serializers.ModelSerializer):
  class Meta:
    model = Products
    # fields = '__all__'
    fields=[
      'id','product_itemno', 'product_name','product_category',
      'wholesale_price','retail_price','stock','image',
      'category_name']
  # def validate(self, data):
  #     # Assuming 'unique_field' is the field that should be unique
  #     unique_field_value = data.get('product_itemno')

  #     # Check if an object with this 'unique_field' already exists
  #     if Products.objects.filter(product_itemno=unique_field_value).exists():
  #         raise serializers.ValidationError(
  #             {'unique_field': 'This value for product_itemno already exists.'}
  #         )
  #     return data      

class TempEntriesSerializers(serializers.ModelSerializer) :
  class Meta:
    model = TempEntries
    # fields = '__all__'
    fields=[
      'id','username',
      'product_linkid', 
      'itemnumber',
      'product_name', 
      'wholesale_price', 
      'retail_price',
      'quantity', 
      # 'created','modified'
      
      ]    
    
class SalesEntriesSerializer(serializers.ModelSerializer)    :
   
  class Meta:
    model = SalesEntries
    # fields = '__all__'
    fields=['username',
            'invoice_ref',
            'product_linkid',
            'quantity',

            ]
    