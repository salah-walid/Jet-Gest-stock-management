import math
import re

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from django.http.request import HttpRequest
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from serverConfig.utils import allowed_groups

from gestion.models.client import Client

from gestion.serializers.clientSerializer import ClientSerializer

entriesInPage = 2
possibleSearchKeys = {
    "name__contains" : "Nom",
    "lastName__contains" : "Prénom",
    "adress__contains" : "Adresse",
    "city__contains" : "Ville",
}

#! products views

@api_view(['GET']) 
def getClientPossibleSearchKeys(request: HttpRequest):
    return Response(possibleSearchKeys, status=status.HTTP_200_OK)

@api_view(['POST']) 
def getClients(request: HttpRequest, page):

    if page <= 0:
        page = 1

    start = entriesInPage * (page-1)
    end = entriesInPage * page

    order = Client.objects.all()
    serialized = ClientSerializer(order[start:end], context={'request': request}, many=True)

    return Response({
        "Clients" : serialized.data,
        "pageCount" : math.ceil(order.count() / entriesInPage)
    })

@api_view(['GET']) 
def getAllClients(request: HttpRequest):
    order = Client.objects.all()
    serialized = ClientSerializer(order, context={'request': request}, many=True)

    return Response(serialized.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getClient(request: HttpRequest, id):
    order = get_object_or_404(Client, id=id)
    serialized = ClientSerializer(order, context={'request': request})

    return Response(serialized.data)

@api_view(['POST'])
def searchClients(request: HttpRequest, page):
    if page <= 0:
        page = 1

    search = request.data.get("search", {})

    searchParam = {}

    for item in search:
        result = re.search(
            r"^({})=(.+)$".format("|".join([key for (key, _) in possibleSearchKeys.items()])),
            item,
            re.IGNORECASE
        )
        if not result:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        searchParam[result.group(1)] = result.group(2)

    start = entriesInPage * (page-1)
    end = entriesInPage * page

    order = Client.objects.filter(**searchParam)

    serialized = ClientSerializer(order[start:end], context={'request': request}, many=True)

    return Response({
        "Clients" : serialized.data,
        "pageCount" : math.ceil(order.count() / entriesInPage)
    })

@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
#@allowed_groups()
def postClient(request: HttpRequest):
    serialised = ClientSerializer(data=request.data, context={'request': request})
    if serialised.is_valid():
        serialised.save()

        return Response(status=status.HTTP_201_CREATED)
    
    print(serialised.error_messages)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes((IsAuthenticated, ))
@allowed_groups(group_names=["admin"])
def updateClient(request: HttpRequest, id):
    order = get_object_or_404(Client, id=id)
    
    serialised = ClientSerializer(order ,data=request.data, context={'request': request})
    if serialised.is_valid():
        serialised.save()

        return Response(status=status.HTTP_200_OK)
    
    print(serialised.error_messages)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes((IsAuthenticated, ))
@allowed_groups(group_names=["admin"])
def deleteClient(request: HttpRequest, id):
    client = get_object_or_404(Client, id=id)
    client.delete()

    return Response(status=status.HTTP_200_OK)