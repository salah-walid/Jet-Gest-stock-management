from .gestionParams import GestionParam

__all__ = [
    "GestionParam"
]

try:
    if not GestionParam.objects.exists():
        GestionParam.objects.create()
except Exception:
    pass