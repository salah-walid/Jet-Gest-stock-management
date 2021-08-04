import json
import math

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from django.http.request import HttpRequest
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from serverConfig.utils import allowed_groups
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import parser_classes

from gestion.models.product import Product, ProductCategoriesMany, ProductSubCategoriesMany

from gestion.serializers.productSerializer import ProductSerializer

entriesInPage = 2

#! products views
@api_view(['POST']) 
def getProducts(request: HttpRequest, page):

    if page <= 0:
        page = 1

    categoryId = request.data.get("catId")
    subCategoryId = request.data.get("subCatId")

    start = entriesInPage * (page-1)
    end = entriesInPage * page

    products = Product.objects.all()
    if categoryId:
        products = products.filter(categories__id=categoryId)
        if subCategoryId:
            products = products.filter(subCategories__id=subCategoryId)
    serialized = ProductSerializer(products[start:end], context={'request': request}, many=True)

    return Response({
        "products" : serialized.data,
        "pageCount" : math.ceil(products.count() / entriesInPage)
    })

@api_view(['GET'])
def getProduct(request: HttpRequest, id):
    product = get_object_or_404(Product, id=id)
    serialized = ProductSerializer(product, context={'request': request})

    return Response(serialized.data)

@api_view(['POST'])
def searchProducts(request: HttpRequest, page):

    if page <= 0:
        page = 1

    search = request.data.get("search")
    categoryId = request.data.get("catId")
    subCategoryId = request.data.get("subCatId")


    start = entriesInPage * (page-1)
    end = entriesInPage * page

    products = Product.objects.all()
    if search:
        products = products.filter(title__contains=search)
    if categoryId:
        products = products.filter(categories__id=categoryId)
        if subCategoryId:
            products = products.filter(subCategories__id=subCategoryId)
    
    serialized = ProductSerializer(products[start:end], context={'request': request}, many=True)

    return Response({
        "products" : serialized.data,
        "pageCount" : math.ceil(products.count() / entriesInPage)
    })

@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
@parser_classes([MultiPartParser])
#@allowed_groups()
def postProduct(request: HttpRequest, format=None):
    
    serialised = ProductSerializer(data=request.data, context={'request': request})
    if serialised.is_valid():
        product = serialised.save()

        cats = json.loads(request.data.get("categories", []))
        subCats = json.loads(request.data.get("subCategories", []))

        for cat in cats:
            ProductCategoriesMany.objects.create(product=product, category_id=cat)

        for subCat in subCats:
            ProductSubCategoriesMany.objects.create(product=product, subCategory_id=subCat)

        return Response(status=status.HTTP_202_ACCEPTED)
    
    print(serialised.error_messages)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes((IsAuthenticated, ))
@parser_classes([MultiPartParser])
@allowed_groups(group_names=["admin"])
def updateProduct(request: HttpRequest, id):
    product = None
    try:
        product = Product.objects.get(id=id)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    print(request.data)
    
    serialised = ProductSerializer(product ,data=request.data, context={'request': request})
    if serialised.is_valid():
        product = serialised.save()

        ProductCategoriesMany.objects.filter(product=product).delete()
        ProductSubCategoriesMany.objects.filter(product=product).delete()

        cats = json.loads(request.data.get("categories", []))
        subCats = json.loads(request.data.get("subCategories", []))

        for cat in cats:
            ProductCategoriesMany.objects.create(product=product, category_id=cat)

        for subCat in subCats:
            ProductSubCategoriesMany.objects.create(product=product, subCategory_id=subCat)

        return Response(status=status.HTTP_200_OK)
    
    print(serialised.error_messages)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes((IsAuthenticated, ))
@parser_classes([MultiPartParser])
@allowed_groups(group_names=["admin"])
def deleteProduct(request: HttpRequest, id):
    product = get_object_or_404(Product, id=id)
    product.delete()

    return Response(status=status.HTTP_200_OK)