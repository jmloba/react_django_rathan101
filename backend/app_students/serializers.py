from app_students.models import Student
from rest_framework import serializers

class StudentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Student
    fields = '__all__'  
    fields = ['student_id', 'name', 'branch']
