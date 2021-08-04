from django.core.management.base import BaseCommand

from auth_app.models.user import User
from auth_app.models.group import AuthGroup

class Command(BaseCommand):

    def handle(self, *args, **options):
        if User.objects.count() == 0:
            adminGroup, created = AuthGroup.objects.get_or_create(name="admin")
            user = User.objects.create(username="admin")
            user.authGroups.set([adminGroup.id])
            user.set_password("admin")
            user.is_superuser = True
            user.is_staff = True
            user.save()
            print("Super-user created \nusername: admin \npassword: admin")
        else:
            print("super user already exists")