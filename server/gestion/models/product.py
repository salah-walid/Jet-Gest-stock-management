from django.core.files import storage
from django.db import models

from gestion.utils import products_path_and_rename
from gestion.models.category import Category
from gestion.models.subCategory import SubCategory

class Product(models.Model):
    title = models.CharField(max_length=40, unique=True)
    description = models.TextField(default="", blank=True)
    creationDate = models.DateField(auto_now_add=True)
    image = models.ImageField(upload_to=products_path_and_rename ,blank=True , null=True)
    forcePrice = models.BooleanField(default=False)
    price = models.FloatField(default=0)

    categories = models.ManyToManyField(Category, blank=True, through="ProductCategoriesMany")
    subCategories = models.ManyToManyField(SubCategory, blank=True, through="ProductSubCategoriesMany")

    def getPrice(self):
        from .entries import Entries
        if self.forcePrice:
            return self.price
        else:
            entries = Entries.objects.filter(product=self)
            sumPrices = 0
            count = entries.count()
            if count <= 0:
                count = 1

            for entry in entries:
                sumPrices += entry.unitPrice
            
            if sumPrices == 0:
                return self.price
            else:
                return sumPrices / count

    def quantity(self):
        from .SalesAndBalance import SalesAndBalance
        sales, c = SalesAndBalance.objects.get_or_create(chooseProduct=self)
        return sales.balance

    def salesCount(self):
        from .SalesAndBalance import SalesAndBalance
        sales, c = SalesAndBalance.objects.get_or_create(chooseProduct=self)
        return sales.totalSales

    def __str__(self) -> str:
        return "{} - {}".format(self.id, self.title)


class ProductCategoriesMany(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

class ProductSubCategoriesMany(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    subCategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
