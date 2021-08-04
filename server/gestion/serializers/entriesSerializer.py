from rest_framework import serializers

from gestion.models.entries import Entries
from gestion.serializers.productSerializer import ProductSerializer

class EntriesSerializer(serializers.ModelSerializer):

    price = serializers.SerializerMethodField()
    product = ProductSerializer()

    class Meta:
        model = Entries
        fields = (
            'id',
            'quantity',
            'price',
            'unitPrice',
            'product',
        )

    def get_price(self, obj: Entries):
        return obj.price()