from django.db import models
from django.contrib.auth.models import User

class article(models.Model):
    name = models.CharField(max_length=100)
    descripttion = models.TextField()
    Image = models.ImageField(upload_to='static/article/img')
    owner = models.ForeignKey(User, related_name='article', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name

# Create your models here.
