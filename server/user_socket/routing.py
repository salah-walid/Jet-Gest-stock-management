from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path('ws/updateListener', consumers.consumer.as_asgi()),
]