from rest_framework import serializers
from .models import CondoBill, CondoPayment
from django.db.models import Sum

class CondoPaymentSerializers(serializers.ModelSerializer):
    class Meta:
        model = CondoPayment
        # fields = '__all__'  
        fields = ['id', 
                  'bill_ref', 
                  'payment_date', 'payment_amount', 
                   'payment_img','user','payment_ref']
    def perform_create(self, serializer):
        serializer.save(user=self.request.user) # Assign the current authenticated user
class CondoBillSerializers(serializers.ModelSerializer):
    payments_details = CondoPaymentSerializers(source='payments', many=True, read_only=True)
    total_paid = serializers.SerializerMethodField()
  
    class Meta:
        model = CondoBill
        fields = ['id', 'user', 'bill_date', 'bill_amount', 'bill_img', 'date_of_entry', 'payments_details', 'total_paid']
        read_only_fields = ['user'] # Mark user as read-only in the serializer

    def get_total_paid(self, obj):
        # Calculate the sum of all payments related to this bill instance
        total = obj.payments.aggregate(Sum('payment_amount'))['payment_amount__sum']
        # Return 0 if no payments are found
        return total if total is not None else 0.00
