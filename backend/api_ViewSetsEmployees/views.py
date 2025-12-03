from django.shortcuts import render,get_object_or_404


from rest_framework import viewsets
from app_employees.models import Employee, Department, Gender, EmployeeSalary
from app_data.models import NextDataControl

from app_employees.serializers import EmployeeSerializers,EmployeeSalarySerializers, DepartmentSerializers, GenderSerializers   
from app_data.serializers import NextDataControlSerializers

from app_employees.filters import EmployeeFilter,EmployeeSalaryFilter, DepartmentFilter, GenderFilter
from app_data.filters  import NextDataControlFilter

from rest_framework.response import Response
from rest_framework import status

from app_employees.paginations import CustomPagination

