from django.db import models

from .product import Product

class SalesAndBalance(models.Model):
    chooseProduct = models.OneToOneField(Product, on_delete=models.CASCADE)
    totalSales = models.IntegerField(default=0)
    balance = models.IntegerField(default=0)

    def __str__(self):
        return "{}'s balance".format(self.chooseProduct)
