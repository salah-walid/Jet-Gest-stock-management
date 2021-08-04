from datetime import datetime

from django.db import models
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator

from django.db.models.signals import post_save
from django.dispatch import receiver

from serverConfig.models.gestionParams import GestionParam
from gestion.models.client import Client
from computedfields.models import ComputedFieldsModel, computed

class OrderRando(ComputedFieldsModel):
    seller = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE)
    client = models.CharField(max_length=40, blank=False, null=False)
    creationDate = models.DateTimeField(default=datetime.now, blank=False)

    total = models.FloatField(default=0)

    def orderList(self):
        from .productRandoOrder import ProductRandoOrder
        return ProductRandoOrder.objects.filter(order=self)

    def __str__(self):
        return "#BONPOUR" + str(self.id).zfill(7)

