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


class CountableOutput(models.Model):
    application = models.ForeignKey(
        Application, on_delete=models.CASCADE, related_name="countable_outputs"
    )
    criterion = models.ForeignKey(
        CountableCriterion,
        on_delete=models.CASCADE,
        related_name="application_outputs",
    )
    committed_quantity = models.FloatField()


class SummableOutput(models.Model):
    application = models.ForeignKey(
        Application, on_delete=models.CASCADE, related_name="summable_outputs"
    )
    criterion = models.ForeignKey(
        SummableCriterion,
        on_delete=models.CASCADE,
        related_name="application_outputs",
    )
    committed_quantity = models.FloatField()
