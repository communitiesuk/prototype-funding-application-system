from rest_framework import serializers

from funds_service.models import Fund


class FundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fund
        fields = "__all__"
