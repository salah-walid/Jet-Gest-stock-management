from django.apps import AppConfig


class UserSocketConfig(AppConfig):
    name = 'user_socket'

    def ready(self) -> None:
        import user_socket.watchers
        return super().ready()