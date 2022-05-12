from rest_framework import serializers
from .models import Template, NFT

class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = ('id', 'name', 'description', 'image_hash', 'price')

class NFTSerializer(serializers.ModelSerializer):
    class Meta:
        model = NFT
        fields = ('id', 'token_id', 'template_id', 'product_id', 'name', 'secret_code', 'description', 'ipfs_hash')



