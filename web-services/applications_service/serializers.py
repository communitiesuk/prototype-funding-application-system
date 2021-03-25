from rest_framework import serializers

from applications_service.models import Application, CountableCommitment


class CountableCommitmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountableCommitment
        fields = ["criterion", "committed_quantity"]


class ApplicationSerializer(serializers.HyperlinkedModelSerializer):
    countable_commitments = CountableCommitmentSerializer(many=True)

    class Meta:
        model = Application
        fields = ["url", "fund", "title", "submitted_at", "countable_commitments"]

    def create(self, validated_data):
        countable_commitment_data = validated_data.pop("countable_commitments")
        application = Application.objects.create(**validated_data)
        for commitment_data in countable_commitment_data:
            CountableCommitment.objects.create(
                application=application, **commitment_data
            )
        return application
