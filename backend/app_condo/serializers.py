from .models import CondoBill   
from rest_framework import serializers

class CondoBillSerializers(serializers.ModelSerializer):    
    class Meta:
        model = CondoBill
        # fields = '__all__'

        fields = ['id','statement_date','statement_amount','payment_date',
        'payment_amount','payment_ref','img_stmt','img_pymt']