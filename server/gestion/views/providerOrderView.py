import datetime
import math
import re
import json

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

from gestion.models.providerOrder import ProviderOrder
from auth_app.models.user import User
from gestion.models.provider import Provider
from gestion.models.entries import Entries
from gestion.models.product import Product

from gestion.serializers.providerOrderSerializer import ProviderOrderSerializer

entriesInPage = 2
possibleSearchKeys = {
    "creationDate__gte" : ["Date de création supérieure ou égale à", "datetime-local"],
    "creationDate__lte" : ["Date de création inférieure ou égale à", "datetime-local"],
    "total__gte" : ["total superieur ou égale à", "number"],
    "total__lte" : ["total inférieure ou égale à", "number"],
}

#! provider order views

@api_view(['GET']) 
def getProviderOrderPossibleSearchKeys(request: HttpRequest):
    return Response(possibleSearchKeys, status=status.HTTP_200_OK)

@api_view(['POST']) 
def getProviderOrders(request: HttpRequest, page):

    if page <= 0:
        page = 1

    sellerId = request.data.get("sellerId")
    providerId = request.data.get("providerId")

    start = entriesInPage * (page-1)
    end = entriesInPage * page

    order = ProviderOrder.objects.all()
    if sellerId:
        order = order.filter(seller__id=sellerId)
    if providerId:
        order = order.filter(provider__id=providerId)
    serialized = ProviderOrderSerializer(order[start:end], context={'request': request}, many=True)

    return Response({
        "providerOrders" : serialized.data,
        "pageCount" : math.ceil(order.count() / entriesInPage)
    })

@api_view(['GET'])
def getProviderOrder(request: HttpRequest, id):
    order = get_object_or_404(ProviderOrder, id=id)
    serialized = ProviderOrderSerializer(order, context={'request': request})

    return Response(serialized.data)

@api_view(['POST'])
def searchProviderOrders(request: HttpRequest, page):

    if page <= 0:
        page = 1

    search = request.data.get("search", "")
    sellerId = request.data.get("sellerId")
    providerId = request.data.get("providerId")

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

    order = ProviderOrder.objects.filter(**searchParam)
    if sellerId:
        order = order.filter(seller__id=sellerId)
    if providerId:
        order = order.filter(provider__id=providerId)
    serialized = ProviderOrderSerializer(order[start:end], context={'request': request}, many=True)

    return Response({
        "providerOrders" : serialized.data,
        "pageCount" : math.ceil(order.count() / entriesInPage)
    })

@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
#@allowed_groups()
def postProviderOrder(request: HttpRequest):
    data = json.loads(request.data.get("providerOrder"))
    seller = User.objects.get(id=data.pop("seller").get("id"))
    provider = Provider.objects.get(id=data.pop("provider").get("id"))

    orderList = data.pop("orderList")

    serialised = ProviderOrderSerializer(data=data, context={'request': request})
    if serialised.is_valid():
        try:
            providerOrder = serialised.save(seller=seller, provider=provider)

            permission = check_user_has_permission(request.user, ["admin"])

            for item in orderList:
                product = Product.objects.get(id=item.pop("product").get("id"))
                item.pop("price")
                if not permission:
                    item["unitPrice"] = product.price
                Entries.objects.create(**item, order=providerOrder, product=product)

            return Response(status=status.HTTP_201_CREATED)
        except Exception as e:
            providerOrder.delete()
            
    
    print(serialised.error_messages)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes((IsAuthenticated, ))
@allowed_groups(group_names=["admin"])
def updateProviderOrder(request: HttpRequest, id):  

    data = json.loads(request.data.get("providerOrder"))
    seller = User.objects.get(id=data.pop("seller").get("id"))
    provider = Provider.objects.get(id=data.pop("provider").get("id"))
    orderList = data.pop("orderList")

    order = get_object_or_404(ProviderOrder, id=id)

    data.pop("orderNumber")
    data.pop("creationDate")
    
    serialised = ProviderOrderSerializer(instance=order ,data=data, partial=True)
    if serialised.is_valid():
        providerOrder = serialised.save(seller=seller, provider=provider)

        Entries.objects.filter(order=providerOrder).delete()
        for item in orderList:
            product = Product.objects.get(id=item.pop("product").get("id"))
            item.pop("price")
            Entries.objects.create(**item, order=providerOrder, product=product)
        
        return Response(status=status.HTTP_200_OK)
    
    print(serialised.error_messages)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes((IsAuthenticated, ))
@allowed_groups(group_names=["admin"])
def deleteProviderOrder(request: HttpRequest, id):
    proOrder = get_object_or_404(ProviderOrder, id=id)

    proOrder.delete()
    return Response(status=status.HTTP_200_OK)

def printProviderInvoice(request: HttpRequest, id):
    order: OrderData = get_object_or_404(ProviderOrder, id=id)

    htmlInvoice = loader.get_template("gestion/invoice-A4.html")
    context = {
        "title" : "Pièce fournisseur",
        "sourceTitle" : "Fournisseur",
        "sourceHeader" : order.provider.name + " " + order.provider.lastName,
        "source" : [
            order.provider.adress,
            order.provider.city,
            "N°MF : " + order.provider.nMF,
            "N°RC : " + order.provider.nRC,
            "N°AI : " + order.provider.nAI,
        ],
        "summary": [
            {
                "title": "Total",
                "value": order.total,
            },
            
        ],
        "order" : order,
        "orderNumber": "PF" + str(order.id).zfill(7),
    }
    return HttpResponse(htmlInvoice.render(context, request))