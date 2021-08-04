from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class GestionParam(models.Model):
    defaultTva = models.FloatField(default=19, validators=[MinValueValidator(0), MaxValueValidator(100)])

    def __str__(self) -> str:
        return "Gestion parameter"