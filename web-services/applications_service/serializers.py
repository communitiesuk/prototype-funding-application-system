from rest_framework import serializers

from applications_service.models import (
    Application,
    CountableOutput,
    SummableOutput,
)


class CountableOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountableOutput
        fields = ["criterion", "committed_quantity"]


class SummableOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = SummableOutput
        fields = ["criterion", "committed_quantity"]


class ApplicationSerializer(serializers.HyperlinkedModelSerializer):
    countable_outputs = CountableOutputSerializer(many=True)
    summable_outputs = SummableOutputSerializer(many=True)

    class Meta:
        model = Application
        fields = [
            "url",
            "fund",
            "title",
            "submitted_at",
            "countable_outputs",
            "summable_outputs",
        ]

    def create(self, validated_data):
        countable_output_data = validated_data.pop("countable_outputs")
        summable_output_data = validated_data.pop("summable_outputs")

        application = Application.objects.create(**validated_data)

        for output_data in countable_output_data:
            CountableOutput.objects.create(application=application, **output_data)

        for output_data in summable_output_data:
            SummableOutput.objects.create(application=application, **output_data)

        return application
