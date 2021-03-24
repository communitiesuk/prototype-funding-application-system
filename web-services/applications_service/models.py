from django.db import models


class Application(models.Model):
    submitted_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ["-submitted_at"]

    def __str__(self):
        return f"Application submitted at {self.submitted_at}"
