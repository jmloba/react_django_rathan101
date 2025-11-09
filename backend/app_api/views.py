from django.shortcuts import render
from django.http import JsonResponse

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView

from .serializers import BookSerializer
from .models import Books
from django.http import HttpResponse

from app_students.models import Student
from app_students.serializers import StudentSerializer

from app_store.models import MasterFile
from app_store.serializers import MasterFileSerializer

from app_condo.models import CondoBill
from app_condo.serializers import CondoBillSerializers

from app_products.models import Products , Product_Category ,TempEntries, SalesEntries
from app_products.serializers import ProductSerializers, ProductCategorySerializers  ,TempEntriesSerializers, SalesEntriesSerializer
from app_products.filters import ProductsFilter  , TempEntriesFilter, SalesEntriesFilter

from app_data.models import NextDataControl
from app_data.serializers import NextDataControlSerializers  
from app_data.filters import NextDataControlFilter





@api_view(['GET','POST'])
def studentsView(request):
  # students=Student.objects.all()
  # students_list = list(students.values())
  # print(f'students_list: {students_list}')
  # return JsonResponse(students_list, safe=False)
  if request.method == 'GET':
    students=Student.objects.all()
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  elif request.method == 'POST':
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    print (serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE'])
def studentDetailView(request, pk):
  try:
    student=Student.objects.get(pk=pk)
  except Student.DoesNotExist:
    return Response({'message':'The student does not exist'}, status=status.HTTP_404_NOT_FOUND)
  
  if request.method == 'GET':
    serializer = StudentSerializer(student)
    return Response(serializer.data)
  elif request.method == 'PUT':
    serializer = StudentSerializer(student, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  elif request.method == 'DELETE':
    student.delete()
    return Response({'message':'Student was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

# store master file using class 
class StoreMasterFile(APIView):
  def get(self, request):

    masterfile=MasterFile.objects.all()
    serializer = MasterFileSerializer(masterfile, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

  def post(self, request):
   
    serializer = MasterFileSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    print (serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CondoBillViewSet(viewsets.ModelViewSet):
  queryset = CondoBill.objects.all().order_by('statement_date')
  serializer_class = CondoBillSerializers

  def post(self, request, *args,  **kwargs):
    statement_date = request.data['statement_date']
    statement_amount = request.data['statement_amount']
    CondoBill.objects.create(
      
      statement_date= statement_date, 
      statement_amount=statement_amount
      )
    return HttpResponse({'message':'CondoBill created'}, status = 200)

class BookViewSet(viewsets.ModelViewSet):
  queryset = Books.objects.all().order_by('title')
  serializer_class = BookSerializer
  
  def post(self, request, *args,  **kwargs):
    cover = request.data['cover']
    title = request.data['title']
    Books.objects.create(title= title, cover=cover)
    return HttpResponse({'message':'Book created'}, status = 200)

class ProductCategoryViewSet(viewsets.ModelViewSet):
  queryset = Product_Category.objects.all().order_by('category_name')
  serializer_class = ProductCategorySerializers

  def post(self, request, *args,  **kwargs):
    category_id = request.data['category_id']
    category_name = request.data['category_name']
    Product_Category.objects.create(
      category_id= category_id, 
      category_name=category
      ) 
    return HttpResponse({'message':'Product Category created'}, status = 200)

class ProductCategoryViewSet(viewsets.ModelViewSet):
  queryset = Product_Category.objects.all().order_by('category_name')
  serializer_class = ProductCategorySerializers

  def post(self, request, *args,  **kwargs):
    category_name = request.data['category_name']
    Product_Category.objects.create(
      category_name=category_name
      ) 
    return HttpResponse({'message':'Product Category created'}, status = 200)  

class ProductViewSet(viewsets.ModelViewSet):
  queryset = Products.objects.all().order_by('product_name')
  serializer_class = ProductSerializers
  filterset_class = ProductsFilter

class TempEntriesViewSet(viewsets.ModelViewSet):
  queryset = TempEntries.objects.all()
  serializer_class = TempEntriesSerializers
  # filterset_class = TempEntriesFilter
  filterset_fields =('username','wholesale_price')

class NextDataControlViewset(viewsets.ModelViewSet):
  queryset = NextDataControl.objects.all()
  serializer_class = NextDataControlSerializers
  filterset_class = NextDataControlFilter

  # def post(self, request, *args,  **kwargs):
  #   dataname = request.data['dataname']
  #   nextserial= request.data['nextserial']
  #   description = request.data['description']
  #   NextDataControl.objects.create(
  #     dataname=dataname,
  #     nextserial=nextserial,
  #     description=description
  #     ) 
  #   return HttpResponse({'message':'Next Data record created'}, status = 200)  

class SalesEntriesViewset(viewsets.ModelViewSet):
  queryset = SalesEntries.objects.all()
  serializer_class = SalesEntriesSerializer
  filterset_class = SalesEntriesFilter
