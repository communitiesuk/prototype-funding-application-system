from django.db import models

from funds_service.models import Fund


class Application(models.Model):
    fund = models.ForeignKey(Fund, on_delete=models.CASCADE)
    submitted_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ["-submitted_at"]

    def __str__(self):
        return f"Application submitted at {self.submitted_at}"
