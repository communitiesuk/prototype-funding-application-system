from django.db import models


class Fund(models.Model):
    name = models.CharField(max_length=255, help_text="Give a short name to this Fund")
    short_description = models.CharField(
        max_length=255,
        help_text="Give a short description, shown to the Applicant in the choice list",
    )

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name

    @property
    def countables_stipulated(self):
        return [c.label for c in self.countable_criteria.all()]

    @property
    def summables_stipulated(self):
        return [c.label for c in self.summable_criteria.all()]


class CountableCriterion(models.Model):
    """
    Additional Fund element which captures a criterion which can be counted to be totalled.
    """

    fund = models.ForeignKey(
        Fund, on_delete=models.CASCADE, related_name="countable_criteria"
    )
    label = models.CharField(
        max_length=255, help_text='Plural name of the criterion (e.g. "Rail routes")'
    )

    class Meta:
        ordering = ["label"]
        verbose_name_plural = "Countable criteria"

    def __str__(self):
        return f"{self.fund.name} {self.label}"


class SummableCriterion(models.Model):
    """
    Additional Fund element which captures a criterion which can be summed to be totalled.
    """

    fund = models.ForeignKey(
        Fund, on_delete=models.CASCADE, related_name="summable_criteria"
    )
    label = models.CharField(
        max_length=255, help_text='Singular name of the criterion (e.g. "Floorspace")'
    )
    unit = models.CharField(
        max_length=255, help_text='The unit of measurement (e.g. "m2")'
    )

    class Meta:
        ordering = ["label"]
        verbose_name_plural = "Summable criteria"

    def __str__(self):
        return f"{self.fund.name} {self.label} ({self.unit})"
