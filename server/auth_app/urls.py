from django.urls import path
from .views.authViews import (
    login,
    getUser,
    getGroups,
    postUser,
    updateUser,
    userGet,
    userList,
)

urlpatterns = [
    path("login", login),
    path("getUser", getUser),
    path("user/<int:id>", userGet),
    path("userList", userList),
    path("getGroups", getGroups),
    path("postUser", postUser),
    path("updateUser/<int:id>", updateUser),
]