import math
import json

from rest_framework.permissions import IsAuthenticated
from serverConfig.utils import allowed_groups
from gestion.serializers.subCategorySerializer import SubCategorySerializer
from gestion.models.subCategory import SubCategory
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.http.request import HttpRequest
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import parser_classes
from django.shortcuts import get_object_or_404

from gestion.models.category import Category,CategorySubCategoryMany
from gestion.models.subCategory import SubCategory

from gestion.serializers.categorySerializer import CategorySerializer, CategorySerializerSimplified
from gestion.serializers.subCategorySerializer import SubCategorySerializer

entriesInPage = 2

#! category views

@api_view(['GET'])
def getCategories(request):
    categories = Category.objects.all()
    serialized = CategorySerializer(categories, context={'request': request}, many=True)

    return Response(serialized.data)

@api_view(['POST'])
def listCategories(request: HttpRequest, page):

    if page <= 0:
        page = 1

    name = request.data.get("search")

    start = entriesInPage * (page-1)
    end = entriesInPage * page

    cats = Category.objects.all()
    if name:
        cats = cats.filter(title__contains=name)

    serialized = CategorySerializer(cats[start:end], context={'request': request}, many=True)

    return Response({
        "categories" : serialized.data,
        "pageCount" : math.ceil(cats.count() / entriesInPage)
    })


@api_view(['GET'])
def getCategory(request: HttpRequest, id):
    cat = get_object_or_404(Category, id=id)
    serialized = CategorySerializer(cat, context={'request': request})

    return Response(serialized.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getSubCategory(request: HttpRequest, id):
    subCat = get_object_or_404(SubCategory, id=id)
    serialized = SubCategorySerializer(subCat, context={'request': request})

    return Response(serialized.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getCatSubCatCombo(request):
    categoriesSerialized = CategorySerializerSimplified(Category.objects.all(), many=True)
    subCategoriesSerializer = SubCategorySerializer(SubCategory.objects.all(), many=True)


    return Response(
        {
            "categories": categoriesSerialized.data,
            "subCategory": subCategoriesSerializer.data,
        }
    )

@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
@parser_classes([MultiPartParser])
def postCategory(request: HttpRequest):
    request.data._mutable = True
    subCats = request.data.pop("subCategories", [])
    request.data._mutable = False
    
    serialized = CategorySerializer(data=request.data, context={'request': request})

    if serialized.is_valid():
        cat = serialized.save()

        for subCat in json.loads(subCats[0]):
            CategorySubCategoryMany.objects.create(category=cat, subCategory_id=subCat)

        return Response(status=status.HTTP_201_CREATED)
    
    print(serialized.error_messages)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes((IsAuthenticated, ))
@parser_classes([MultiPartParser])
@allowed_groups(group_names=["admin"])
def putCategory(request: HttpRequest, id):

    category = get_object_or_404(Category, id=id)
    request.data._mutable = True
    subCats = request.data.pop("subCategories", [])
    request.data._mutable = False
    serialized = CategorySerializer(category ,data=request.data, context={'request': request})

    if serialized.is_valid():
        cat = serialized.save()

        CategorySubCategoryMany.objects.filter(category=cat).delete()

        for subCat in json.loads(subCats[0]):
            CategorySubCategoryMany.objects.create(category=cat, subCategory_id=subCat)

        return Response(status=status.HTTP_200_OK)
    
    print(serialized.error_messages)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes((IsAuthenticated, ))
@allowed_groups(group_names=["admin"])
def deleteCategory(request: HttpRequest, id):
    cat = get_object_or_404(Category, id=id)
    cat.delete()

    return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def postSubCategory(request: HttpRequest):
    serialized = SubCategorySerializer(data=request.data, context={'request': request})
    if serialized.is_valid():
        cat = serialized.save()

        return Response(status=status.HTTP_201_CREATED)
    
    print(serialized.error_messages)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes((IsAuthenticated, ))
@allowed_groups(group_names=["admin"])
def putSubCategory(request: HttpRequest, id):
    subCategory = get_object_or_404(SubCategory, id=id)
    serialized = SubCategorySerializer(subCategory ,data=request.data, context={'request': request})
    if serialized.is_valid():
        serialized.save()

        return Response(status=status.HTTP_200_OK)
    
    print(serialized.error_messages)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes((IsAuthenticated, ))
@allowed_groups(group_names=["admin"])
def deleteSubCategory(request: HttpRequest, id):
    cat = get_object_or_404(SubCategory, id=id)
    cat.delete()

    return Response(status=status.HTTP_200_OK)