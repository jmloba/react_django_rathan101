from rest_framework import serializers
from app_data.models import NextDataControl

class NextDataControlSerializers(serializers.ModelSerializer):
    class Meta:
        model  = NextDataControl
        fields = ['id','dataname',
                  'nextserial','description' 
                  
                  ]
    # def create(self,validated_data):
    #     return NextDataControl.objects.create(**validated_data)
    # def validate(self, data):
    #     # Assuming 'unique_field' is the field that should be unique
    #     unique_field_value = data.get('dataname')

    #     # Check if an object with this 'unique_field' already exists
    #     if NextDataControl.objects.filter(dataname=unique_field_value).exists():
    #       raise serializers.ValidationError(
    #           {'unique_field': 'Duplicate record on dataname.'}
    #       )
    #     return data        
    