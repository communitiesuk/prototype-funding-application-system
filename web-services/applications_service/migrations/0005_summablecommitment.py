# Generated by Django 3.1.7 on 2021-03-25 14:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("funds_service", "0003_countablecriterion_summablecriterion"),
        ("applications_service", "0004_countablecommitment"),
    ]

    operations = [
        migrations.CreateModel(
            name="SummableCommitment",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("committed_quantity", models.FloatField()),
                (
                    "application",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="summable_commitments",
                        to="applications_service.application",
                    ),
                ),
                (
                    "criterion",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="application_commitments",
                        to="funds_service.summablecriterion",
                    ),
                ),
            ],
        ),
    ]
