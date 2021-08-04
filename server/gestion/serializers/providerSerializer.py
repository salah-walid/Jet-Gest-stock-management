from rest_framework import serializers
from gestion.models.provider import Provider

class ProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        fields = ("__all__")