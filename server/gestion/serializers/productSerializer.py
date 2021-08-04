import os
from gestion.serializers.subCategorySerializer import SubCategorySerializer
from gestion.serializers.categorySerializer import CategorySerializerSimplified
from rest_framework import serializers

from gestion.models.product import Product
class ProductSerializer(serializers.ModelSerializer):

    categories = CategorySerializerSimplified(many=True, required=False)
    subCategories = SubCategorySerializer(many=True, required=False)
    image = serializers.ImageField(required=False, allow_null=True)

    salesCount = serializers.SerializerMethodField(read_only=True, required=False)
    stock = serializers.SerializerMethodField(read_only=True, required=False)
    generatedPrice = serializers.SerializerMethodField(read_only=True, required=False)

    class Meta:
        model = Product
        fields = (
            'id',
            'title',
            'description',
            'creationDate',
            'image',
            'forcePrice',

            'salesCount',
            'stock',
            'price',
            'generatedPrice',

            'categories',
            'subCategories'
        )
        extra_kwargs = {
            'image': {'required': False}, 
        }
    
    def create(self, validated_data):

        product = Product.objects.create(**validated_data)

        return product

    def update(self, instance, validated_data):
        image = validated_data.get("image", None)
        if not image:
            if instance.image:
                os.remove(instance.image.path)
            instance.image = None

        return super().update(instance, validated_data)

    def get_salesCount(self, obj: Product):
        return obj.salesCount()

    def get_stock(self, obj: Product):
        return obj.quantity()

    def get_generatedPrice(self, obj: Product):
        return obj.getPrice()

