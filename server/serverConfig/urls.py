from django.urls import path
from serverConfig.views import *

urlpatterns = [
    path("getTva", getTva),
]