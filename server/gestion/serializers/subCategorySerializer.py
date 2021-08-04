import os
from rest_framework import serializers

from gestion.models.subCategory import SubCategory

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ("__all__")

    def update(self, instance, validated_data):
        image = validated_data.get("image", None)
        if not image:
            if instance.image:
                os.remove(instance.image.path)
            instance.image = None
        return super().update(instance, validated_data)

