from gestion.models.product import Product
from gestion.models.client import Client
from gestion.models.provider import Provider
from gestion.models.category import Category
from gestion.models.subCategory import SubCategory
from gestion.models.providerOrder import ProviderOrder
from gestion.models.orderData import OrderData
from gestion.models.orderRando import OrderRando

from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


@receiver(post_save)
def _post_save_receiver(sender, instance, using, created, **kwargs):
    if using == "default":
        update(instance)

@receiver(post_delete)
def _post_delete_receiver(sender, instance, using, **kwargs):
    if using == "default":
        update(instance)

def update(instance):
    message = None
    if isinstance(instance, Product):
        message = 1
    elif isinstance(instance, Client):
        message = 2
    elif isinstance(instance, Provider):
        message = 3
    elif isinstance(instance, (Category, SubCategory)):
        message = 4
    elif isinstance(instance, ProviderOrder):
        message = 5
    elif isinstance(instance, OrderData):
        message = 6
    elif isinstance(instance, OrderRando):
        message = 7
    else:
        return
    
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        'user_update_group',
        {'type': 'update_message', 'update': message}
    )
