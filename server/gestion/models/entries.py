from django.db import models
from .providerOrder import ProviderOrder
from .product import Product

from django.db.models.signals import pre_save, pre_delete
from django.dispatch import receiver

class Entries(models.Model):

    quantity = models.IntegerField(default=0)
    unitPrice = models.FloatField(default=0)

    product = models.ForeignKey(Product, null=False, on_delete=models.CASCADE)
    order = models.ForeignKey(ProviderOrder, null=False, on_delete=models.CASCADE)

    def price(self):
        return float(self.quantity) * self.unitPrice

    def __str__(self):
        return "N°" + str(self.id) + " -- " + str(self.quantity) + " " + self.product.title

@receiver(pre_save, sender=Entries)
def _post_save_receiver(sender, instance: Entries, using, **kwargs):
    if using == "default":
        from .SalesAndBalance import SalesAndBalance
        sab, c = SalesAndBalance.objects.get_or_create(chooseProduct=instance.product)
        try:
            prev = Entries.objects.get(id=instance.id)
            sab.balance += instance.quantity - prev.quantity
        except:
            sab.balance += instance.quantity
        
        sab.save()

@receiver(pre_delete, sender=Entries)
def _pre_delete_receiver(sender, instance: Entries, using, **kwargs):
    if using == "remote":
        return
    from .SalesAndBalance import SalesAndBalance
    sab, c = SalesAndBalance.objects.get_or_create(chooseProduct=instance.product)
    
    sab.balance -= instance.quantity
    sab.save()
