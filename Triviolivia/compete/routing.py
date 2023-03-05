from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/gameroom/', consumers.GameConsumer.as_asgi()),
]