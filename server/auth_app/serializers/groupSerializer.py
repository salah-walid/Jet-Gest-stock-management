from rest_framework import serializers

from auth_app.models.group import AuthGroup

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthGroup
        fields = ("__all__")
        