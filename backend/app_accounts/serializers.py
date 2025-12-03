from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import get_user_model  



class UserSerializer(serializers.ModelSerializer):
  
  password = serializers.CharField(write_only = True, 
    style={'input_type':'text'},
    min_length=8)
  
  class Meta:
    model = User
    fields=["username","email","password"]
    fields=['id','username','email','password','first_name','last_name']

  def create(self, validated_data):
    # user=User.objects.create_user(**validated_data)
    '''
    note : User.objects.create => save the password in a plain 
    User.objects.create_user    => automatically hash the pasword
    '''
    user = User.objects.create_user(
      username=validated_data['username'],
      email=validated_data['email'],      
      password=validated_data['password'],
      first_name=validated_data.get('first_name', ''),    
      last_name=validated_data.get('last_name', ''),

      is_staff=validated_data.get('is_staff', False),
      is_active=validated_data.get('is_active', True),

      # validated_data['username'],
      # validated_data['email'],
      # validated_data['password'],
    )
    return user
    
 

class UserPermissionsSerializer(serializers.ModelSerializer):
    permissions = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'is_staff', 'permissions']

    def get_permissions(self, obj):
        # Get all permissions for the user (including group permissions)
        return list(obj.get_all_permissions())