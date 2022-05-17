from rest_framework import serializers
from .models import Template, NFT, Account

class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = ('id', 'brand_address', 'name', 'description', 'image_hash', 'price')

class NFTSerializer(serializers.ModelSerializer):
    class Meta:
        model = NFT
        fields = ('id', 'brand_address', 'token_id', 'template_id', 'product_id', 'name', 'secret_code', 'description', 'ipfs_hash', 'minted')

class AccountSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Account
        fields = ('id', 'wallet_address', 'type', 'username', 'name', 'description')



