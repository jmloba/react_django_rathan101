from django.shortcuts import render
from rest_framework import viewsets
from .serializers import BookSerializer
from .models import Books
from django.http import HttpResponse


class BookViewSet(viewsets.ModelViewSet):
  queryset = Books.objects.all().order_by('title')
  serializer_class = BookSerializer
  
  def post(self, request, *args,  **kwargs):
    cover = request.data['cover']
    title = request.data['title']
    Books.objects.create(title= title, cover=cover)
    return HttpResponse({'message':'Book created'}, status = 200)
