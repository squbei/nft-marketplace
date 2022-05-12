from operator import mod
from django.db import models

# Create your models here.
class Template(models.Model):
    name = models.CharField(max_length=500)
    description = models.TextField()
    image_hash = models.CharField(max_length=200)
    price = models.FloatField()
    
    def _str_(self): 
        return self.name

class NFT(models.Model):
    token_id = models.IntegerField(default=-1)
    template_id = models.IntegerField(default=-1, blank=True)
    product_id = models.CharField(max_length=100)
    name = models.CharField(max_length=500)
    secret_code = models.CharField(max_length=16, default=None)
    description = models.TextField()

    def _str_(self):
        return self.name + self.id


    