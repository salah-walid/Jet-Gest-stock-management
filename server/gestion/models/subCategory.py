from django.core.files import storage
from django.db import models

from gestion.utils import subCategories_path_and_rename

class SubCategory(models.Model):
    title = models.CharField(max_length=40, unique=True)
    image = models.ImageField(upload_to=subCategories_path_and_rename, blank=True, null=True)

    def __str__(self):
        return self.title