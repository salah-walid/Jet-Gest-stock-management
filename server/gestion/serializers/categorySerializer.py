import os
from rest_framework import serializers

from gestion.models.category import Category
from gestion.serializers.subCategorySerializer import SubCategorySerializer

class CategorySerializer(serializers.ModelSerializer):

    subCategories = SubCategorySerializer(many=True, required=False)

    class Meta:
        model = Category
        fields = ("__all__")
    
    def create(self, validated_data):
        cat = Category.objects.create(**validated_data)

        return cat

    def update(self, instance, validated_data):
        image = validated_data.get("image", None)
        if not image:
            if instance.image:
                os.remove(instance.image.path)
            instance.image = None
        
        return super().update(instance, validated_data)

class CategorySerializerSimplified(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = (
            "id",
            "title",
            "image",
        )