
from app_employees.models import Employee, Department, Gender

from rest_framework import serializers

class GenderSerializers(serializers.ModelSerializer):
  class Meta:
    model = Gender
    fields = '__all__'



class EmployeeSerializers(serializers.ModelSerializer):
  class Meta:
    model = Employee
    # fields = '__all__'
    fields=['id','emp_name','deptname','email','gender','image']

class DepartmentSerializers(serializers.ModelSerializer):
  class Meta:
    model = Department
    fields = '__all__'
