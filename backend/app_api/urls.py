from django.urls import path, include
from app_accounts import views as UserView 
from api_ViewSetsEmployees import views as Employee_Viewset
from . import views
from app_api import views as api_ViewSet
from app_api.views import studentsView, studentDetailView, StoreMasterFile
from app_user import views  as app_user_view 




# from app_projects import views as Project_Viewset

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register('gender', api_ViewSet.GenderViewset, basename='gender')
router.register('employees', api_ViewSet.EmployeeViewset, basename='employees')
router.register('empsalary', api_ViewSet.EmployeeSalaryViewset, basename='empsalary')

router.register('department', api_ViewSet.DepartmentViewset, basename='department')

router.register('books', api_ViewSet.BookViewSet, basename='book')
router.register('condobill', api_ViewSet.CondoBillViewSet, basename='condo')

router.register('products', api_ViewSet.ProductViewSet , basename='products')
router.register('productcategory', api_ViewSet.ProductCategoryViewSet , basename='productcategory')


router.register('tempentries', api_ViewSet.TempEntriesViewSet , basename='tempentries')
router.register('datacontrol', api_ViewSet.NextDataControlViewset , basename='datacontrol')
router.register('salesentries', api_ViewSet.SalesEntriesViewset , basename='salesentries')
router.register('salesInvoice', api_ViewSet.SalesInvoiceViewSet , basename='salesInvoice')
router.register('salesDetails', api_ViewSet.SalesDetailsViewSet , basename='salesDetails')


app_name='app_api'

urlpatterns=[
  path('register/',UserView.RegisterView.as_view() ),
  
  path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),      
  
  path('protected-view/',UserView.Protected_View.as_view()),
  path('', include(router.urls)),

  path('students/', views.studentsView, name='student-view'),

  path('students/<int:pk>/', views.studentDetailView, name='student-detail-view'),
  
  

  path('store/masterfile/', views.StoreMasterFile.as_view(), name='store-master-file'),
  
  path('user-data/', app_user_view.get_user_data, name='user_data'),

  
  path('user-permission/',UserView.UserPermissionView.as_view() , name='_user_permission'),


]