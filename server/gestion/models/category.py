from django.core.files import storage
from gestion.models.subCategory import SubCategory
from django.db import models

from gestion.utils import categories_path_and_rename
from gestion.models.subCategory import SubCategory

class Category(models.Model):
    title = models.CharField(max_length=40, unique=False)
    image = models.ImageField(upload_to=categories_path_and_rename, blank=True, null=True)
    subCategories = models.ManyToManyField(SubCategory, blank=True, through="CategorySubCategoryMany")

    def __str__(self):
        return self.title


class CategorySubCategoryMany(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    subCategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE)