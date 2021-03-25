from django.db import models

from funds_service.models import CountableCriterion, Fund, SummableCriterion


class Application(models.Model):
    fund = models.ForeignKey(Fund, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    submitted_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ["-submitted_at"]

    def __str__(self):
        return f"Application submitted at {self.submitted_at}"


class CountableCommitment(models.Model):
    application = models.ForeignKey(
        Application, on_delete=models.CASCADE, related_name="countable_commitments"
    )
    criterion = models.ForeignKey(
        CountableCriterion,
        on_delete=models.CASCADE,
        related_name="application_commitments",
    )
    committed_quantity = models.FloatField()


class SummableCommitment(models.Model):
    application = models.ForeignKey(
        Application, on_delete=models.CASCADE, related_name="summable_commitments"
    )
    criterion = models.ForeignKey(
        SummableCriterion,
        on_delete=models.CASCADE,
        related_name="application_commitments",
    )
    committed_quantity = models.FloatField()
