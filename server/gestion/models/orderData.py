from datetime import datetime

from django.db import models
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator

from django.db.models.signals import post_save
from django.dispatch import receiver

from serverConfig.models.gestionParams import GestionParam
from gestion.models.client import Client
from computedfields.models import ComputedFieldsModel, computed

class OrderData(ComputedFieldsModel):
    seller = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, null=True, on_delete=models.CASCADE)
    creationDate = models.DateTimeField(default=datetime.now, blank=False)

    tva = models.FloatField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
    totalHT = models.FloatField(default=0)

    @computed(models.FloatField(default=0), depends=[['self', ['totalHT', 'tva']]])
    def totalTTC(self):
        return (self.totalHT * (self.tva + 100)) / 100
    
    def tvaAmount(self):
        return (self.tva * self.totalHT) / 100

    def orderList(self):
        from .productOrderData import ProductOrderData
        return ProductOrderData.objects.filter(order=self)

    def __str__(self):
        return "#ORD" + str(self.id).zfill(7)

@receiver(post_save, sender=OrderData)
def _post_save_receiver(sender, instance, using, created, **kwargs):
    if created and instance.tva == 0:
        instance.tva = GestionParam.objects.first().defaultTva
        instance.save()
