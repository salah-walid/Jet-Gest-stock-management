from rest_framework import status
from rest_framework.response import Response
from django.http.request import HttpRequest

def allowed_groups(group_names=[]):
    def decorator(view_func):
        def wrapper_func(request: HttpRequest, *args, **kwargs):
            result = check_user_has_permission(request.user, group_names)
            if result:
                return view_func(request, *args, **kwargs)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
            
        return wrapper_func
    return decorator

def check_user_has_permission(user, group_names=[]):
    userGroups = set([u.name for u in user.authGroups.all()])
    if userGroups.intersection(set(group_names)):
        return True
    else:
        return False