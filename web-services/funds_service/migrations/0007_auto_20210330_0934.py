# Generated by Django 3.1.7 on 2021-03-30 09:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("funds_service", "0006_auto_20210330_0655"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="countablecriterion",
            name="fund",
        ),
        migrations.RemoveField(
            model_name="summablecriterion",
            name="fund",
        ),
        migrations.AddField(
            model_name="fund",
            name="countable_criteria",
            field=models.ManyToManyField(
                blank=True, related_name="funds", to="funds_service.CountableCriterion"
            ),
        ),
        migrations.AddField(
            model_name="fund",
            name="summable_criteria",
            field=models.ManyToManyField(
                blank=True, related_name="funds", to="funds_service.SummableCriterion"
            ),
        ),
    ]
