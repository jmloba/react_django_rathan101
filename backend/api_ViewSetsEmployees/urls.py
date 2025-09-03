
from django.urls import path,include
from . import views


from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register('gender', views.GenderViewset, basename='gender')
router.register('employees', views.EmployeeViewset, basename='employee')

router.register('department', views.DepartmentViewset, basename='department')


app_name = 'api_ViewSetsEmployee'

urlpatterns = [
  # function based
  path('', include(router.urls)),
   
]
