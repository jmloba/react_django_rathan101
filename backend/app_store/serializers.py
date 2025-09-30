from .models import MasterFile
from rest_framework import serializers

class MasterFileSerializer(serializers.ModelSerializer):
  class Meta:
    model = MasterFile
    # fields="__all__"
    fields =['itemnumber','description','quantity','price','storecategory','image']
  def create(self, validated_data):  
    masterfile=MasterFile.objects.create(**validated_data)
    return masterfile