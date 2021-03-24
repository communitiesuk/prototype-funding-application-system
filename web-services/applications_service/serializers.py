from rest_framework import serializers

from applications_service.models import Application


class ApplicationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Application
        fields = "__all__"
