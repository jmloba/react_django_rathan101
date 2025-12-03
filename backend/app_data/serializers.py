from rest_framework import serializers
from app_data.models import NextDataControl

class NextDataControlSerializers(serializers.ModelSerializer):
    class Meta:
        model  = NextDataControl
        fields = ['id','dataname',
                  'nextserial','description' 
                  
                  ]

    