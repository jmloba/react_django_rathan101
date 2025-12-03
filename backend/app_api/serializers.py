from .models import Books
# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

class BookSerializer(serializers.ModelSerializer):
  class Meta:
    model = Books
    fields="__all__"
    # fields =['id','title','cover']
  def create(self, validated_data):  
    books=Books.objects.create(**validated_data)
    return books
    
class UserSerializer(serializers.ModelSerializer) :
  class Meta:
    model = User
    # fields="__all__"
    fields = ['id', 'username', 'email', 'first_name', 'last_name','is_Staff','password']
    extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
            'is_staff': {'required': False, 'initial': False}, # Make is_staff optional in payload
        }
    
  def create(self, validated_data):
    # Extract first_name, last_name, and is_staff from validated_data before creating the user object
    print('***validated_data in serializer ', validated_data)


    first_name = validated_data.pop('first_name', '')
    last_name = validated_data.pop('last_name', '')
    is_staff_status = validated_data.pop('is_staff', False) # Safely pop the field

    user = User.objects.create_user(
        username=validated_data['username'],
        email=validated_data['email'],
        password=validated_data['password'],
    )
    
    # Assign the fields directly to the user object
    user.first_name = first_name
    user.last_name = last_name
    user.is_staff = is_staff_status

    user.save() # Save the changes
    return user