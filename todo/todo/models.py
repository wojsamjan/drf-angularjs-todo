from django.db import models


class ToDo(models.Model):
    todo_text = models.CharField(max_length=255)
    done = models.BooleanField()
