from django.shortcuts import render

from django.http import JsonResponse
from django.contrib.auth.decorators import login_required

from django.contrib.auth.models import User
from .serializers import UserSerializer


from .serializers import BookSerializer
from .models import Books
from django.http import HttpResponse


from app_api.filters import BooksFilter
from app_employees.models import Gender, Department,Employee,EmployeeSalary
from app_employees.serializers import EmployeeSerializers,EmployeeSalarySerializers, GenderSerializers, DepartmentSerializers
from app_employees.filters import EmployeeFilter, EmployeeSalaryFilter, GenderFilter, DepartmentFilter


from app_condo.models import CondoBill
from app_condo.serializers import CondoBillSerializers

from app_data.models import NextDataControl
from app_data.serializers import NextDataControlSerializers  
from app_data.filters import NextDataControlFilter


from app_products.models import Products , Product_Category ,TempEntries, SalesEntries, SalesInvoice, SalesDetails
from app_products.serializers import ProductSerializers, ProductCategorySerializers  ,TempEntriesSerializers, SalesEntriesSerializer
from app_products.serializers import  SalesInvoiceSerializers, SalesDetailsSerializers

from app_products.filters import ProductsFilter  , TempEntriesFilter, SalesEntriesFilter

from app_store.models import MasterFile
from app_store.serializers import MasterFileSerializer

from app_students.models import Student
from app_students.serializers import StudentSerializer


from rest_framework import viewsets, status 
from rest_framework import filters
from rest_framework.response import Response
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAuthenticated, IsAdminUser,DjangoModelPermissionsOrAnonReadOnly
from django_filters.rest_framework import DjangoFilterBackend

from django.db.models import Sum, F



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

class PostUserWritePermission(BasePermission):
  message = 'Editing is for the author only'
  def has_object_permission(self, request,view,obj):
    if request.method in SAFE_METHODS:
      return True
    return obj.username == request.user


class BookViewSet(viewsets.ModelViewSet):
  queryset = Books.objects.all().order_by('title')
  serializer_class = BookSerializer
  filterset_class = BooksFilter
  # permission_classes = (IsAuthenticated,)
  # permission_classes=[isAuthenticated]
  # permission_classes = [IsAdminUser]
  permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
  # permission_classes = [IsAdminUser]
  

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


class ProductViewSet(viewsets.ModelViewSet):
  queryset = Products.objects.all().order_by('product_name')
  serializer_class = ProductSerializers
  filterset_class = ProductsFilter

#http://127.0.0.1:8000/api/v1/tempentries/summary_by_username/?username=ana
class TempEntriesViewSet(viewsets.ModelViewSet):
  quertset = TempEntries.objects.all()
  serializer_class = TempEntriesSerializers
  filterset_class = TempEntriesFilter
    
  filterset_fields =('username',)
  filter_backends = [DjangoFilterBackend, filters.SearchFilter]
  search_fields = ['username']

  def get_queryset(self):
    queryset = TempEntries.objects.all()
    return queryset.distinct()    
  @action(detail=False, methods=['get'])
  def summary_by_username(self, request):
    username = request.query_params.get('username')
    if not username:
        return Response({"error": "username parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

    queryset = self.get_queryset().filter(username=username)

    total_quantity = queryset.aggregate(total_qty=Sum('quantity'))['total_qty']
    total_value = queryset.annotate(
        item_value=F('quantity') * F('retail_price')
    ).aggregate(total_val=Sum('item_value'))['total_val']

    return Response({
        'username': username,
        'total_quantity': total_quantity if total_quantity is not None else 0,
        'total_value': total_value if total_value is not None else 0
    })  

class NextDataControlViewset(viewsets.ModelViewSet):
  queryset = NextDataControl.objects.all()
  serializer_class = NextDataControlSerializers
  filterset_class = NextDataControlFilter
  filterset_fields =('dataname',)
  filter_backends = [DjangoFilterBackend, filters.SearchFilter]
  search_fields = ['dataname']
  def get_queryset(self):
    queryset = NextDataControl.objects.all()
    return queryset.distinct()    

# https://www.youtube.com/watch?v=LCYqDsl1WYI
# ------django-filter and DRF API filtering - Django REST Framework
# https://www.youtube.com/watch?v=NDFgTGTI8zg&t=600s
# http://127.0.0.1:8000/api/v1/salesEntries/
# http://127.0.0.1:8000/api/v1/salesEntries/?username__icontains=kim
# http://127.0.0.1:8000/api/v1/salesEntries/?invoice_ref=8
#http://127.0.0.1:8000/api/v1/salesEntries/?invoice_ref__range=8,9
# http://127.0.0.1:8000/api/v1/salesEntries/?invoice_ref=10

 #http://127.0.0.1:8000/api/v1/salesEntries/?username__icontains=en&invoice_ref=8&invoice_ref__range=8%2C9&invoice_ref__gt=&invoice_ref__lt=&invoice_ref__gte=&invoice_ref__lte=&quantity=&quantity__gt=&quantity__lt=&quantity__range=
# http://127.0.0.1:8000/api/v1/salesEntries/?invoice_ref=10&quantity=2

# adding filtersetfilterset_fields = ['username','invoice_ref']
# http://127.0.0.1:8000/api/v1/salesEntries/?username__icontains=kim
# http://127.0.0.1:8000/api/v1/salesEntries/?search=im

#http://127.0.0.1:8000/api/v1/salesentries/?search=sardines

# get distinct
#http://127.0.0.1:8000/api/v1/salesentries/distinct_invoices/
class SalesEntriesViewset(viewsets.ModelViewSet ):
  permission_classes =[PostUserWritePermission]
  # queryset = SalesEntries.objects.all()
  serializer_class = SalesEntriesSerializer
  # filterset_fields = ['username','invoice_ref', 'quantity']
  filterset_class = SalesEntriesFilter
  filter_backends = [DjangoFilterBackend, filters.SearchFilter]
  search_fields = ['username','invoice_ref','product_linkid__product_name',]

  @action(detail=False, methods=['get'])
  def distinct_invoices(self, request):
      """
      An API endpoint to get all distinct invoice reference numbers.
      """
      # Retrieve distinct 'invoice_ref' values from the queryset
      # values_list() returns a list of tuples (or flat list if flat=True)
      # distinct() ensures only unique values are returned
      invoice_refs = SalesEntries.objects.order_by('invoice_ref').values_list('invoice_ref', flat=True).distinct()

      # Convert the QuerySet to a standard Python list for the response
      return Response(list(invoice_refs), status=status.HTTP_200_OK)

  def get_queryset(self):
    queryset = SalesEntries.objects.all().order_by('invoice_ref') 
    return queryset.distinct()    


#http://127.0.0.1:8000/api/v1/salesInvoice/37/  
# * getting the details per invoice

#http://127.0.0.1:8000/api/v1/salesDetails/by_quantity_range/?min_quantity=10&max_quantity=86
#http://127.0.0.1:8000/api/v1/salesDetails/by_quantity_range/?min_quantity=15&max_quantity=86

#http://127.0.0.1:8000/api/v1/salesInvoice/distinct_invoices/
#http://127.0.0.1:8000/api/v1/salesInvoice/by_date_range/?start_date=2025-11-10&end_date=2025-11-18
class SalesInvoiceViewSet(viewsets.ModelViewSet):
    queryset = SalesInvoice.objects.all()
    serializer_class = SalesInvoiceSerializers
    @action(detail=False, methods=['get'])
    def distinct_invoices(self, request):
        invoices = SalesInvoice.objects.values('id', 'invoice_no','total_amount').distinct()
        return Response(invoices)
    @action(detail=False, methods=['get'])
    def by_date_range(self, request):
      """
      Custom action to filter SalesInvoices by a date range.
      Expects 'start_date' and 'end_date' as query parameters in YYYY-MM-DD format.
      """
      start_date_str = request.query_params.get('start_date', None)
      end_date_str = request.query_params.get('end_date', None)

      if not start_date_str or not end_date_str:
          return Response(
              {"error": "Please provide both start_date and end_date query parameters in YYYY-MM-DD format."},
              status=status.HTTP_400_BAD_REQUEST
          )

      try:
          # Optional: convert string dates to date objects for validation/manipulation if needed
          # start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date()
          # end_date = datetime.strptime(end_date_str, '%Y-%m-%d').date()
          pass # The __range lookup works directly with strings if they are in 'YYYY-MM-DD' format
      except ValueError:
          return Response(
              {"error": "Invalid date format. Use YYYY-MM-DD."},
              status=status.HTTP_400_BAD_REQUEST
          )

      # Use the __range lookup to filter the queryset
      # The field name in the model is 'invoice_date'
      queryset = self.queryset.filter(invoice_date__range=(start_date_str, end_date_str))

      # Serialize the filtered data
      serializer = self.get_serializer(queryset, many=True)
      return Response(serializer.data)    

class SalesDetailsViewSet(viewsets.ModelViewSet):
  queryset = SalesDetails.objects.all()
  serializer_class = SalesDetailsSerializers
  # permission_classes = [IsAuthenticated] # Optional, but good practice
  # Custom action to filter by a quantity range


  @action(detail=False, methods=['get'])
  def by_quantity_range(self, request):
        """
        Custom action to filter SalesDetails by a range of quantities.
        Expects 'min_quantity' and 'max_quantity' as query parameters.
        """
        min_quantity = request.query_params.get('min_quantity', None)
        max_quantity = request.query_params.get('max_quantity', None)

        if not min_quantity or not max_quantity:
            return Response(
                {"error": "Please provide both min_quantity and max_quantity query parameters."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Convert string parameters to appropriate types (Decimal or float)
            min_quantity = float(min_quantity)
            max_quantity = float(max_quantity)
        except ValueError:
            return Response(
                {"error": "Invalid quantity format. Must be a number."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Use the __range lookup to filter the queryset
        # Note: F expression is not needed for simple value range lookup
        queryset = self.queryset.filter(quantity__range=(min_quantity, max_quantity))

        # Serialize the filtered data
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
  

class GenderViewset(viewsets.ModelViewSet):
  queryset = Gender.objects.all().order_by('gender')
  serializer_class = GenderSerializers
  filterset_class = GenderFilter
  
class DepartmentViewset(viewsets.ModelViewSet):
  queryset = Department.objects.all().order_by('deptname')
  serializer_class = DepartmentSerializers
  filterset_class = DepartmentFilter
  

  #http://127.0.0.1:8000/api/v1/employees/
  #http://127.0.0.1:8000/api/v1/employees/2/

class EmployeeViewset(viewsets.ModelViewSet):
  queryset = Employee.objects.all().order_by('emp_id')
  serializer_class = EmployeeSerializers
  filterset_class = EmployeeFilter
  permission_classes = [IsAuthenticated]


#http://127.0.0.1:8000/api/v1/empsalary/?sal_basic_min=15000&sal_basic_max=19000
class EmployeeSalaryViewset(viewsets.ModelViewSet):
  queryset = EmployeeSalary.objects.all().order_by('sal_empid')
  serializer_class = EmployeeSalarySerializers
  filterset_class = EmployeeSalaryFilter
  permission_classes = [IsAuthenticated]



