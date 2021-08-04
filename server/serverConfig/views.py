from django.http.request import HttpRequest
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from serverConfig.models.gestionParams import GestionParam

# Create your views here.
@api_view(['GET'])
def getTva(request: HttpRequest):
    tva : GestionParam = GestionParam.objects.first()

    return Response({"tva": tva.defaultTva}, status=status.HTTP_200_OK)