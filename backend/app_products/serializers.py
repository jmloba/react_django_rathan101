from app_products.models import Products, Product_Category , TempEntries, SalesEntries, SalesInvoice, SalesDetails

from rest_framework import serializers
from django.contrib.auth.models import User

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
class SalesEntriesSerializer(serializers.ModelSerializer):
    # Define a custom field for the product name
  itemnumber = serializers.SerializerMethodField()
  product_name = serializers.SerializerMethodField()
  category = serializers.SerializerMethodField()
  wholesale = serializers.SerializerMethodField()
  retail = serializers.SerializerMethodField()
  class Meta:
    model = SalesEntries
    # fields = '__all__'
    fields=['id','username','invoice_ref', 'itemnumber', 'product_linkid','product_name',
            'category', 'quantity',    'wholesale',   'retail'            ]
    
  def get_product_name(self, obj):
        if obj.product_linkid:
            return obj.product_linkid.product_name
        return None  
  def get_wholesale(self, obj):
        if obj.product_linkid:
            return obj.product_linkid.wholesale_price
        return None  
  def get_retail(self, obj):
        if obj.product_linkid:
            return obj.product_linkid.retail_price
        return None  
  
  def get_itemnumber(self, obj):
        if obj.product_linkid:
            return obj.product_linkid.product_itemno
        return None    
  
  def get_category(self, obj):
      if obj.product_linkid and obj.product_linkid.product_category:
          return obj.product_linkid.product_category.category_name
      return None


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
    


class SalesDetailsSerializers(serializers.ModelSerializer):
    # Use Source to access related model fields directly for display purposes
    product_name = serializers.CharField(source='product.product_name', read_only=True)
    item_number = serializers.CharField(source='product.product_itemno', read_only=True)
    wholesale = serializers.CharField(source='product.wholesale_price', read_only=True)
    retail =  serializers.CharField(source='product.retail_price', read_only=True)
    class Meta:
        model = SalesDetails
        # Exclude 'invoice' field here so it's not expected in the nested data
        fields = ['id', 'product', 'product_name', 'item_number', 'quantity', 'wholesale','retail']

class SalesInvoiceSerializers(serializers.ModelSerializer):
    # Use the nested serializer for the 'details' field
    details = SalesDetailsSerializers(many=True)
    username = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = SalesInvoice
        fields = ['id','invoice_no', 'invoice_date', 'total_quantity', 'total_amount', 'username', 'details']

    # Override the create method to handle nested data saving
    def create(self, validated_data):
        details_data = validated_data.pop('details')
        # Create the SalesInvoice instance first
        sales_invoice = SalesInvoice.objects.create(**validated_data)
        # Create related SalesDetails instances
        for detail_data in details_data:
            SalesDetails.objects.create(invoice=sales_invoice, **detail_data)
        return sales_invoice