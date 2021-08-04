from datetime import datetime

from django.db import models
from django.conf import settings

from gestion.models.provider import Provider

class ProviderOrder(models.Model):
    seller = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL)
    provider = models.ForeignKey(Provider, null=True, blank=True, on_delete=models.SET_NULL)
    
    creationDate = models.DateTimeField(default=datetime.now, blank=False)
    total = models.FloatField(default=0)

    def orderList(self):
        from .entries import Entries
        return Entries.objects.filter(order=self)

    def __str__(self):
        return "#PF" + str(self.id).zfill(7)
