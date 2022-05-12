from django.shortcuts import render
from .serializers import NFTSerializer, TemplateSerializer
from rest_framework import viewsets
from .models import Template, NFT

# Create your views here.
class TemplateView(viewsets.ModelViewSet):
    serializer_class = TemplateSerializer
    queryset = Template.objects.all()

class NFTView(viewsets.ModelViewSet):
    serializer_class = NFTSerializer
    queryset = NFT.objects.all()
    
