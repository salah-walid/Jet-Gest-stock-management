from rest_framework import serializers
from gestion.models.client import Client

class ClientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Client
        fields = ("__all__")