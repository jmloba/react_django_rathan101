from django.urls import path, include
from app_accounts import views as UserView
from api_ViewSetsEmployees import views as Employee_Viewset


# from app_task import views as Task_Viewset 

from app_api import views as api_ViewSet
from . import views

from app_api.views import studentsView, studentDetailView, StoreMasterFile



# from app_projects import views as Project_Viewset

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register('gender', Employee_Viewset.GenderViewset, basename='gender')
router.register('employees', Employee_Viewset.EmployeeViewset, basename='employee')

router.register('department', Employee_Viewset.DepartmentViewset, basename='department')

router.register('books', api_ViewSet.BookViewSet, basename='book')
router.register('condobill', api_ViewSet.CondoBillViewSet, basename='condo')

# router.register('Task', Task_Viewset.Task_ViewSet, basename='task')
# router.register('Review', Task_Viewset.TaskReview_ViewSet, basename='review')

# router.register('projects', Project_Viewset.ProjectViewset, basename='project')

# router.register('projectmanager', Project_Viewset.ProjectManagerViewset, basename='projectmanager')


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

]