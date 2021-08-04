from gestion.models.productRandoOrder import ProductRandoOrder
from gestion.models.product import Product
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

from gestion.models.orderRando import OrderRando

from gestion.serializers.orderRandoSerializer import OrderRandoDataSerializer

entriesInPage = 2
possibleSearchKeys = {
    "creationDate__gte" : ["Date de création supérieure à", "datetime-local"],
    "creationDate__lte" : ["Date de création inférieure à", "datetime-local"],
    "total__gte" : ["total superieur à", "number"],
    "total__lte" : ["total inférieure à", "number"],
    "client__contains" : ["Client : ", "text"],
}

#! order views

@api_view(['GET']) 
def getOrderRandoPossibleSearchKeys(request: HttpRequest):
    return Response(possibleSearchKeys, status=status.HTTP_200_OK)

@api_view(['POST']) 
def getRandoOrders(request: HttpRequest, page):
    if page <= 0:
        page = 1

    sellerId = request.data.get("sellerId")

    start = entriesInPage * (page-1)
    end = entriesInPage * page

    order = OrderRando.objects.all()
    if sellerId:
        order = order.filter(seller__id=sellerId)
    serialized = OrderRandoDataSerializer(order[start:end], context={'request': request}, many=True)

    return Response({
        "order" : serialized.data,
        "pageCount" : math.ceil(order.count() / entriesInPage)
    })

@api_view(['GET'])
def getRandoOrder(request: HttpRequest, id):
    order = get_object_or_404(OrderRando, id=id)
    serialized = OrderRandoDataSerializer(order, context={'request': request})

    return Response(serialized.data)

@api_view(['POST'])
def searchRandoOrders(request: HttpRequest, page):

    if page <= 0:
        page = 1

    search = request.data.get("search", "")
    sellerId = request.data.get("sellerId")

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

    order = OrderRando.objects.filter(**searchParam)
    if sellerId:
        order = order.filter(seller__id=sellerId)

    serialized = OrderRandoDataSerializer(order[start:end], context={'request': request}, many=True)

    return Response({
        "order" : serialized.data,
        "pageCount" : math.ceil(order.count() / entriesInPage)
    })

@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
#@allowed_groups()
def postRandoOrder(request: HttpRequest):
    data = json.loads(request.data.get("order"))
    seller = User.objects.get(id=data.pop("seller").get("id"))

    orderList = data.pop("orderList")

    serialised = OrderRandoDataSerializer(data=data, context={'request': request})
    if serialised.is_valid():
        order = serialised.save(seller=seller)

        permission = check_user_has_permission(request.user, ["admin"])

        for item in orderList:
            product : Product = Product.objects.get(id=item.pop("product").get("id"))
            item.pop("price")
            
            if not permission:
                item["unitPrice"] = product.price
            ProductRandoOrder.objects.create(**item, order=order, product=product)
    

        return Response(status=status.HTTP_201_CREATED)
    
    print(serialised.error_messages)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes((IsAuthenticated, ))
@allowed_groups(group_names=["admin"])
def updateRandoOrder(request: HttpRequest, id):
    order = get_object_or_404(OrderRando, id=id)

    data = json.loads(request.data.get("order"))
    seller = User.objects.get(id=data.pop("seller").get("id"))

    data.pop("orderNumber")
    data.pop("creationDate")

    orderList = data.pop("orderList")
    
    serialised = OrderRandoDataSerializer(order ,data=data, context={'request': request})
    if serialised.is_valid():
        order = serialised.save(seller=seller)

        ProductRandoOrder.objects.filter(order=order).delete()
        for item in orderList:
            product : Product = Product.objects.get(id=item.pop("product").get("id"))
            item.pop("price")
            
            ProductRandoOrder.objects.create(**item, order=order, product=product)

        return Response(status=status.HTTP_200_OK)
    
    print(serialised.error_messages)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes((IsAuthenticated, ))
@allowed_groups(group_names=["admin"])
def deleteRandoOrder(request: HttpRequest, id):
    proOrder = get_object_or_404(OrderRando, id=id)

    proOrder.delete()
    return Response(status=status.HTTP_200_OK)

def printRandoInvoice(request: HttpRequest, id):
    order: OrderData = get_object_or_404(OrderRando, id=id)

    htmlInvoice = loader.get_template("gestion/invoice-A4.html")
    context = {
        "title" : "Bon Pour",
        "sourceTitle" : "client",
        "sourceHeader" : order.client,
        "source" : [
            
        ],
        "summary": [
            {
                "title": "total",
                "value": order.total,
            },
        ],
        "order" : order,
        "orderNumber": "BP" + str(order.id).zfill(7),
    }
    return HttpResponse(htmlInvoice.render(context, request))