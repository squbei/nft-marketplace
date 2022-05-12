from django.contrib import admin
from .models import Template, NFT

# Register your models here.
class TemplateAdmin(admin.ModelAdmin):
    pass

admin.site.register(Template, TemplateAdmin)

class NFTAdmin(admin.ModelAdmin):
    pass

admin.site.register(NFT, NFTAdmin)