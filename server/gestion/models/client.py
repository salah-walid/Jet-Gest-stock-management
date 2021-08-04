from django.db import models

class Client(models.Model):
    name = models.CharField(max_length=60)
    lastName = models.CharField(max_length=60)
    adress = models.TextField(blank=True)
    city = models.CharField(max_length=40)
    nMF = models.CharField(max_length=40)
    nRC = models.CharField(max_length=40)
    nAI = models.CharField(max_length=40)

    def __str__(self) -> str:
        return "client {} {}".format(self.name, self.lastName)