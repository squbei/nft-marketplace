from operator import mod
from django.db import models

# Create your models here.
class Template(models.Model):
    brand_address = models.CharField(max_length=500, default='None')
    name = models.CharField(max_length=500)
    description = models.TextField()
    image_hash = models.CharField(max_length=200)
    price = models.FloatField()
    
    def _str_(self): 
        return self.name

class NFT(models.Model):
    brand_address = models.CharField(max_length=500, default='None')
    token_id = models.IntegerField(default=-1)
    template_id = models.IntegerField(default=-1, blank=True)
    product_id = models.CharField(max_length=100)
    name = models.CharField(max_length=500)
    secret_code = models.CharField(max_length=16, default=None)
    description = models.TextField()
    ipfs_hash = models.CharField(max_length=200, blank=True)
    minted = models.BooleanField(blank=True, default=False)

    def _str_(self):
        return self.name + self.id

class Account(models.Model):
    wallet_address = models.CharField(max_length=500)
    type = models.CharField(
        max_length=20,
        choices=(("seller", "Seller"), ("buyer", "Buyer")), 
        default="Buyer"
    )
    username = models.CharField(max_length=16, unique=True)
    name = models.CharField(max_length=20)
    description = models.TextField()

    