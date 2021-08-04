from gestion.models.productOrderData import ProductOrderData
from gestion.models.product import Product
from gestion.models.client import Client
from auth_app.models.user import User
import json
import math
import re
import datetime

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from django.http.request import HttpRequest
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from serverConfig.utils import allowed_groups, check_user_has_permission

from django.http import HttpResponse
from django.template import loader

from gestion.models.orderData import OrderData

from gestion.serializers.orderSerializer import OrderDataSerializer

entriesInPage = 2
possibleSearchKeys = {
    "creationDate__gte" : ["Date de création supérieure à", "datetime-local"],
    "creationDate__lte" : ["Date de création inférieure à", "datetime-local"],
    "totalHT__gte" : ["total HT superieur à", "number"],
    "totalHT__lte" : ["total HT inférieure à", "number"],
    "totalTTC__gte" : ["total TTC superieur à", "number"],
    "totalTTC__lte" : ["total TTC inférieure à", "number"],
}

#! order views

@api_view(['GET']) 
def getOrderPossibleSearchKeys(request: HttpRequest):
    return Response(possibleSearchKeys, status=status.HTTP_200_OK)

@api_view(['POST']) 
def getOrders(request: HttpRequest, page):
    if page <= 0:
        page = 1

    sellerId = request.data.get("sellerId")
    clientId = request.data.get("clientId")

    start = entriesInPage * (page-1)
    end = entriesInPage * page

    order = OrderData.objects.all()
    if sellerId:
        order = order.filter(seller__id=sellerId)
    if clientId:
        order = order.filter(client__id=clientId)
    serialized = OrderDataSerializer(order[start:end], context={'request': request}, many=True)

    return Response({
        "order" : serialized.data,
        "pageCount" : math.ceil(order.count() / entriesInPage)
    })

@api_view(['GET'])
def getOrder(request: HttpRequest, id):
    order = get_object_or_404(OrderData, id=id)
    serialized = OrderDataSerializer(order, context={'request': request})

    return Response(serialized.data)

@api_view(['POST'])
def searchOrders(request: HttpRequest, page):

    if page <= 0:
        page = 1

    search = request.data.get("search", "")
    sellerId = request.data.get("sellerId")
    clientId = request.data.get("clientId")

    searchParam = {}

    for item in search:
        result = re.search(
            r"^({})=(.+)$".format("|".join([key for (key, _) in possibleSearchKeys.items()])),
            item,
            re.IGNORECASE
        )
        if not result:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if possibleSearchKeys[result.group(1)][1] == "datetime-local":
            date_in = result.group(2)
            date_processing = date_in.replace('T', '-').replace(':', '-').split('-')
            date_processing = [int(v) for v in date_processing]
            date_out = datetime.datetime(*date_processing)
            searchParam[result.group(1)] = date_out
        else:
            searchParam[result.group(1)] = result.group(2)

    start = entriesInPage * (page-1)
    end = entriesInPage * page

    start = entriesInPage * (page-1)
    end = entriesInPage * page

    order = OrderData.objects.filter(**searchParam)
    if sellerId:
        order = order.filter(seller__id=sellerId)
    if clientId:
        order = order.filter(client__id=clientId)
    serialized = OrderDataSerializer(order[start:end], context={'request': request}, many=True)

    return Response({
        "order" : serialized.data,
        "pageCount" : math.ceil(order.count() / entriesInPage)
    })

@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
#@allowed_groups()
def postOrder(request: HttpRequest):
    data = json.loads(request.data.get("order"))
    seller = User.objects.get(id=data.pop("seller").get("id"))
    client = Client.objects.get(id=data.pop("client").get("id"))

    orderList = data.pop("orderList")

    serialised = OrderDataSerializer(data=data, context={'request': request})
    if serialised.is_valid():
        order = serialised.save(seller=seller, client=client)

        permission = check_user_has_permission(request.user, ["admin"])

        for item in orderList:
            product : Product = Product.objects.get(id=item.pop("product").get("id"))
            item.pop("price")
            
            if not permission:
                item["unitPrice"] = product.price
            ProductOrderData.objects.create(**item, order=order, product=product)
    

        return Response(status=status.HTTP_201_CREATED)
    
    print(serialised.error_messages)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes((IsAuthenticated, ))
@allowed_groups(group_names=["admin"])
def updateOrder(request: HttpRequest, id):
    order = get_object_or_404(OrderData, id=id)

    data = json.loads(request.data.get("order"))
    seller = User.objects.get(id=data.pop("seller").get("id"))
    client = Client.objects.get(id=data.pop("client").get("id"))
    data.pop("totalTTC")
    data.pop("tvaAmount")
    data.pop("orderNumber")
    data.pop("creationDate")

    orderList = data.pop("orderList")
    print(data)
    
    serialised = OrderDataSerializer(order ,data=data, context={'request': request}, partial=True)
    if serialised.is_valid():
        order = serialised.save(seller=seller, client=client)

        permission = check_user_has_permission(request.user, ["admin"])

        ProductOrderData.objects.filter(order=order).delete()
        for item in orderList:
            product : Product = Product.objects.get(id=item.pop("product").get("id"))
            item.pop("price")
            
            if not permission:
                item["unitPrice"] = product.price
            ProductOrderData.objects.create(**item, order=order, product=product)

        return Response(status=status.HTTP_200_OK)
    
    print(serialised.error_messages)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes((IsAuthenticated, ))
@allowed_groups(group_names=["admin"])
def deleteOrder(request: HttpRequest, id):
    proOrder = get_object_or_404(OrderData, id=id)

    proOrder.delete()
    return Response(status=status.HTTP_200_OK)

def printInvoice(request: HttpRequest, id):
    order: OrderData = get_object_or_404(OrderData, id=id)

    htmlInvoice = loader.get_template("gestion/invoice-A4.html")
    context = {
        "title" : "Facture",
        "sourceTitle" : "client",
        "sourceHeader" : order.client.name + " " + order.client.lastName,
        "source" : [
            order.client.adress,
            order.client.city,
            "N°MF : " + order.client.nMF,
            "N°RC : " + order.client.nRC,
            "N°AI : " + order.client.nAI,
        ],
        "summary": [
            {
                "title": "total HT",
                "value": order.totalHT,
            },
            {
                "title": "Tva",
                "value": order.tvaAmount,
            },
            {
                "title": "Total TTC",
                "value": order.totalTTC,
            },
        ],
        "order" : order,
        "orderNumber": "FA" + str(order.id).zfill(7),
    }
    return HttpResponse(htmlInvoice.render(context, request))