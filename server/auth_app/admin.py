from django.contrib import admin

from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm

from .models.user import User, user_group_many
from .models.group import AuthGroup

# Register your models here.

class userInlineProduct(admin.TabularInline):
    model = user_group_many
    extra = 1

class MyUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = User

class newUser(UserAdmin):
    form = MyUserChangeForm

    fieldsets = UserAdmin.fieldsets

    inlines = (userInlineProduct,)


admin.site.register(User, newUser)
admin.site.register(AuthGroup)