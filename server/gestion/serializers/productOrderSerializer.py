from django.db.models import fields
from rest_framework import serializers

from gestion.models.productOrderData import ProductOrderData
from gestion.serializers.productSerializer import ProductSerializer

class ProductOrderSerializer(serializers.ModelSerializer):

    price = serializers.SerializerMethodField()
    product = ProductSerializer()

    class Meta:
        model = ProductOrderData
        fields = (
            'id',
            'quantity',
            'price', 
            'unitPrice',
            'product',
        )

    def get_price(self, obj: ProductOrderData):
        return obj.price()