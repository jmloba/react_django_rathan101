from django.shortcuts import render

from rest_framework import viewsets, status 
from rest_framework.response import Response
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAuthenticated, IsAdminUser,DjangoModelPermissionsOrAnonReadOnly

# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_data(request):
    user = request.user
    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "staff": user.is_staff
    })


class UserPermissionsView(APIView):
  permission_classes = [IsAuthenticated]

  def get(self, request):
      user = request.user
      user_id = user.id 
      # Get all permissions for the user
      user_permissions = user.get_all_permissions()
      return Response({
         'permissions': list(user_permissions),
         'user_id': user_id,
                       })  

