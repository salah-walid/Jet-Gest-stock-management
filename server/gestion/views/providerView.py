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

from gestion.models.provider import Provider

from gestion.serializers.providerSerializer import ProviderSerializer

entriesInPage = 2
possibleSearchKeys = {
    "name__contains" : "Nom",
    "lastName__contains" : "Prénom",
    "adress__contains" : "Adresse",
    "city__contains" : "Ville",
}

#! provider views

@api_view(['GET']) 
def getProviderPossibleSearchKeys(request: HttpRequest):
    return Response(possibleSearchKeys, status=status.HTTP_200_OK)

@api_view(['GET']) 
def getAllProviders(request: HttpRequest):
    order = Provider.objects.all()
    serialized = ProviderSerializer(order, context={'request': request}, many=True)

    return Response(serialized.data, status=status.HTTP_200_OK)

@api_view(['POST']) 
def getProviders(request: HttpRequest, page):

    if page <= 0:
        page = 1

    start = entriesInPage * (page-1)
    end = entriesInPage * page

    order = Provider.objects.all()
    serialized = ProviderSerializer(order[start:end], context={'request': request}, many=True)

    return Response({
        "Providers" : serialized.data,
        "pageCount" : math.ceil(order.count() / entriesInPage)
    })

@api_view(['GET'])
def getProvider(request: HttpRequest, id):
    order = get_object_or_404(Provider, id=id)
    serialized = ProviderSerializer(order, context={'request': request})

    return Response(serialized.data)

@api_view(['POST'])
def searchProviders(request: HttpRequest, page):

    if page <= 0:
        page = 1

    search = request.data.get("search", [])

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
    
    searchParam = {
        result.group(1): result.group(2)
    }

    start = entriesInPage * (page-1)
    end = entriesInPage * page

    order = Provider.objects.filter(**searchParam)

    serialized = ProviderSerializer(order[start:end], context={'request': request}, many=True)

    return Response({
        "Providers" : serialized.data,
        "pageCount" : math.ceil(order.count() / entriesInPage)
    })

@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
#@allowed_groups()
def postProvider(request: HttpRequest):
    serialised = ProviderSerializer(data=request.data, context={'request': request})
    if serialised.is_valid():
        serialised.save()

        return Response(status=status.HTTP_201_CREATED)
    
    print(serialised.error_messages)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes((IsAuthenticated, ))
@allowed_groups(group_names=["admin"])
def updateProvider(request: HttpRequest, id):
    provider = get_object_or_404(Provider, id=id)
    
    serialised = ProviderSerializer(provider ,data=request.data, context={'request': request})
    if serialised.is_valid():
        serialised.save()

        return Response(status=status.HTTP_200_OK)
    
    print(serialised.error_messages)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes((IsAuthenticated, ))
@allowed_groups(group_names=["admin"])
def deleteProvider(request: HttpRequest, id):
    provider = get_object_or_404(Provider, id=id)

    provider.delete()
    return Response(status=status.HTTP_200_OK)