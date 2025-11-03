from django.shortcuts import render,get_object_or_404


from rest_framework import viewsets
from app_employees.models import Employee, Department, Gender

from app_employees.serializers import EmployeeSerializers, DepartmentSerializers, GenderSerializers   
from app_employees.filters import EmployeeFilter, DepartmentFilter, GenderFilter
from rest_framework.response import Response
from rest_framework import status

from app_employees.paginations import CustomPagination

class GenderViewset(viewsets.ModelViewSet):
  queryset = Gender.objects.all().order_by('gender')
  serializer_class = GenderSerializers
  filterset_class = GenderFilter
class DepartmentViewset(viewsets.ModelViewSet):
  queryset = Department.objects.all().order_by('deptname')
  serializer_class = DepartmentSerializers
  filterset_class = DepartmentFilter
  
class EmployeeViewset(viewsets.ModelViewSet):
  queryset = Employee.objects.all().order_by('emp_id')
  serializer_class = EmployeeSerializers
  # pagination_class = CustomPagination

  # filterset_fields = ['designation']
  filterset_class = EmployeeFilter

  
