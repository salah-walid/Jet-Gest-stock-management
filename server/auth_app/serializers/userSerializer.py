from auth_app.models.user import User, user_group_many
from auth_app.serializers.groupSerializer import GroupSerializer

from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    
    authGroups = GroupSerializer(many=True, required=False)

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'authGroups',
            'password',
        )
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop("password")
        groups = validated_data.pop("authGroups", [])

        user: User = User(**validated_data)
        user.set_password(password)
        user.save()


        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        if password:
            instance.set_password(password)

        return super().update(instance, validated_data)
