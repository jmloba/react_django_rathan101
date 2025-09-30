from app_todo.models import Task
from rest_framework import serializers

class TaskSerializers(serializers.ModelSerializer):
  class Meta:
    model = Task
    fields =['id','title','completed','added_by']
