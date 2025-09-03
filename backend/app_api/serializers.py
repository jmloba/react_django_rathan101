from .models import Books
from rest_framework import serializers

class BookSerializer(serializers.ModelSerializer):
  class Meta:
    model = Books
    fields="__all__"
    # fields =['id','title','cover']
  def create(self, validated_data):  
    books=Books.objects.create(**validated_data)
    return books
    