from django.db.models import fields
from rest_framework import serializers

from gestion.models.orderData import OrderData

from auth_app.serializers.userSerializer import UserSerializer
from gestion.serializers.clientSerializer import ClientSerializer

from serverConfig.utils import check_user_has_permission

from auth_app.models.user import User
from gestion.models.client import Client


class OrderDataSerializer(serializers.ModelSerializer):

    seller = UserSerializer(read_only=True)
    client = ClientSerializer(read_only=True)
    orderList = serializers.SerializerMethodField("getOrderList", required=False)
    tvaAmount = serializers.SerializerMethodField(required=False)
    orderNumber = serializers.SerializerMethodField(read_only=False, required=False)

    class Meta:
        model = OrderData
        fields = ('__all__')

    def create(self, validated_data):

        order = OrderData.objects.create(**validated_data)

        return order

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)
        
    def getOrderList(self, obj):
        from .productOrderSerializer import ProductOrderSerializer
        return ProductOrderSerializer(obj.orderList(), context=self.context, many=True).data
    

    def get_tvaAmount(self, obj : OrderData):
        return obj.tvaAmount()

    def get_orderNumber(self, obj: OrderData):
        return str(obj.id).zfill(5)