from django.db.models import fields
from rest_framework import serializers

from gestion.models.productRandoOrder import ProductRandoOrder
from gestion.serializers.productSerializer import ProductSerializer 

class ProductRandoOrderSerializer(serializers.ModelSerializer):

    price = serializers.SerializerMethodField()
    product = ProductSerializer()

    class Meta:
        model = ProductRandoOrder
        fields = (
            'id',
            'quantity',
            'price', 
            'unitPrice',
            'product',
        )

    def get_price(self, obj: ProductRandoOrder):
        return obj.price()