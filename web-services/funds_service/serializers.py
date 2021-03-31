from rest_framework import serializers

from funds_service.models import CountableCriterion, SummableCriterion, Fund


class CountableCriterionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountableCriterion
        fields = ["id", "output_category", "label", "guidance_notes"]


class SummableCriterionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SummableCriterion
        fields = ["id", "output_category", "label", "unit", "guidance_notes"]


class FundSerializer(serializers.HyperlinkedModelSerializer):
    countable_criteria = CountableCriterionSerializer(many=True, read_only=True)
    summable_criteria = SummableCriterionSerializer(many=True, read_only=True)

    class Meta:
        model = Fund
        fields = "__all__"
