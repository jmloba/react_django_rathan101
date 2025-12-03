
from app_employees.models import Employee, Department, Gender, EmployeeSalary
import json

from rest_framework import serializers

from django.db import transaction

class GenderSerializers(serializers.ModelSerializer):
  class Meta:
    model = Gender
    fields = '__all__'
class DepartmentSerializers(serializers.ModelSerializer):
  class Meta:
    model = Department
    fields = '__all__'





class EmployeeSalarySerializers(serializers.ModelSerializer):
  class Meta:
    model = EmployeeSalary
    fields = ['sal_basic','sal_transportation','sal_housing'] 


class EmployeeSerializers(serializers.ModelSerializer):
  employee_salary = EmployeeSalarySerializers(many=True, required=False)

  class Meta:
    model = Employee
    fields = [
        'id','emp_id', 'lastname','firstname','middlename',
        'designation','email', 'deptname', 'department',
        'gender', 'emp_gendername', 'image', 'employee_salary'
    ]
    read_only_fields = ['department', 'emp_gendername']



  def to_internal_value(self, data):
    """
    Manually decode the 'employee_salary' field from a JSON string
    when using multipart/form-data.
    """
    if 'employee_salary' in data and isinstance(data['employee_salary'], str):
      try:
          # Create a mutable copy if the QueryDict is immutable
          mutable_data = data.copy()
          # Decode the JSON string back into a Python list/dict
          mutable_data['employee_salary'] = json.loads(data['employee_salary'])
          data = mutable_data
      except json.JSONDecodeError:
          raise serializers.ValidationError({
              'employee_salary': 'Invalid JSON format for employee_salary.'
          })

    # Call the parent method to continue processing other fields
    return super().to_internal_value(data)

  def create(self, validated_data):
    # Your existing create method works fine after the above change
    salary_data = validated_data.pop('employee_salary', [])
    employee_instance = Employee.objects.create(**validated_data)
    for salary_item in salary_data:
        EmployeeSalary.objects.create(sal_empid=employee_instance, **salary_item)
    return employee_instance
  
  def update(self, instance, validated_data):
        # Handle the nested salary data separately
        salary_data = validated_data.pop('employee_salary', [])

        # Update the main Employee fields
        instance.firstname = validated_data.get('firstname', instance.firstname)
        instance.lastname = validated_data.get('lastname', instance.lastname)
        instance.middlename = validated_data.get('middlename', instance.middlename)
        instance.email = validated_data.get('email', instance.email)
        instance.deptname = validated_data.get('deptname', instance.deptname)
        instance.gender = validated_data.get('gender', instance.gender)
        # Add other fields like designation, image if needed
        instance.save()

        # Update or create the nested EmployeeSalary records
        # Assuming an employee has only one salary record based on your front-end logic (employee_salary[0])
        if salary_data:
            salary_item_data = salary_data[0]
            # Try to get the existing salary object for this employee instance
            try:
                salary_instance = EmployeeSalary.objects.get(sal_empid=instance)
                # Update existing salary fields
                salary_instance.sal_basic = salary_item_data.get('sal_basic', salary_instance.sal_basic)
                salary_instance.sal_housing = salary_item_data.get('sal_housing', salary_instance.sal_housing)
                salary_instance.sal_transportation = salary_item_data.get('sal_transportation', salary_instance.sal_transportation)
                salary_instance.save()
            except EmployeeSalary.DoesNotExist:
                # If no salary record exists, create a new one
                EmployeeSalary.objects.create(sal_empid=instance, **salary_item_data)

        return instance

