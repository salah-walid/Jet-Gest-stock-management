from django.db.models import fields
from rest_framework import serializers

from gestion.models.orderRando import OrderRando
from auth_app.serializers.userSerializer import UserSerializer

class OrderRandoDataSerializer(serializers.ModelSerializer):

    seller = UserSerializer(read_only=True)
    orderList = serializers.SerializerMethodField("getOrderList", required=False)
    orderNumber = serializers.SerializerMethodField(read_only=False, required=False)

    class Meta:
        model = OrderRando
        fields = ('__all__')

    def create(self, validated_data):
        order = OrderRando.objects.create(**validated_data)

        return order

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)
        
    def getOrderList(self, obj):
        from .productRandoOrderSerializer import ProductRandoOrderSerializer
        return ProductRandoOrderSerializer(obj.orderList(), context=self.context, many=True).data
    
    def get_orderNumber(self, obj: OrderRando):
        return str(obj.id).zfill(5)