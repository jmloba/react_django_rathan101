from django.shortcuts import render
from rest_framework import viewsets, status ,permissions
from app_employees.models import Gender
from app_employees.serializers import GenderSerializers

# Create your views here.
class GenderViewset(viewsets.ModelViewSet):
  queryset = Gender.objects.all().order_by('gender')
  serializer_class = GenderSerializers
  # filterset_class = GenderFilter