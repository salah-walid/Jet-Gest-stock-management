from django.shortcuts import get_object_or_404
from serverConfig.utils import allowed_groups
from django.http.request import HttpRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

from auth_app.serializers.userSerializer import UserSerializer
from auth_app.serializers.groupSerializer import GroupSerializer

from auth_app.models.user import User, user_group_many
from auth_app.models.group import AuthGroup

@api_view(['POST'])
def login(request: HttpRequest):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response(
            {
                "status": 0,
                "token": "",
            },
            status=status.HTTP_200_OK
        )

    user = authenticate(username=username, password=password)

    if not user:
        return Response(
            {
                "status": 1,
                "token": "",
            },
            status=status.HTTP_200_OK
        )
    
    token, c = Token.objects.get_or_create(user=user)
    return Response(
        {
            "status": 2,
            "token": token.key,
        },
        status=status.HTTP_200_OK
    )

@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def getUser(request: HttpRequest):
    serialized = UserSerializer(request.user, context={'request': request})

    return Response(serialized.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
@allowed_groups(group_names=["admin"])
def userGet(request: HttpRequest, id):
    user = get_object_or_404(User, id=id)
    serialized = UserSerializer(user, context={'request': request})

    return Response(serialized.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def userList(request: HttpRequest):
    serialized = UserSerializer(User.objects.all(), context={'request': request}, many=True)

    return Response(serialized.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def getGroups(request: HttpRequest):
    serialized = GroupSerializer(AuthGroup.objects.all(), many=True, context={'request': request})

    return Response(serialized.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
@allowed_groups(group_names=["admin"])
def postUser(request: HttpRequest):
    groups = request.data.pop("authGroups", [])
    serialised = UserSerializer(data=request.data, context={'request': request})
    if serialised.is_valid():
        user = serialised.save()

        for group in groups:
            user_group_many.objects.create(user=user, group_id=group["id"])

        return Response(status=status.HTTP_201_CREATED)
    
    print(serialised.error_messages)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes((IsAuthenticated, ))
@allowed_groups(group_names=["admin"])
def updateUser(request: HttpRequest, id):
    user = get_object_or_404(User, id=id)
    groups = request.data.pop("authGroups", [])

    serialised = UserSerializer(user , data=request.data, context={'request': request}, partial=True)
    if serialised.is_valid():
        serialised.save()

        user_group_many.objects.filter(user=user).delete()

        for group in groups:
            user_group_many.objects.create(user=user, group_id=group["id"])

        return Response(status=status.HTTP_200_OK)
    
    print(serialised.error_messages)
    return Response(status=status.HTTP_400_BAD_REQUEST)
