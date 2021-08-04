from django.contrib import admin
from .models.gestionParams import GestionParam

@admin.register(GestionParam)
class generalSettingsModelAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        base_has_permission = super(generalSettingsModelAdmin, self).has_add_permission(request)
        return base_has_permission and not GestionParam.objects.exists()