from django.db import models

class User(models.Model):
    nome = models.CharField(max_length=20)
    sobreNome = models.CharField(max_length=32)
    senha = models.CharField(max_length=10)