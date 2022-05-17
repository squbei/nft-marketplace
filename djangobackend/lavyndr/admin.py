from django.contrib import admin
from .models import Template, NFT, Account

# Register your models here.
class TemplateAdmin(admin.ModelAdmin):
    pass

class NFTAdmin(admin.ModelAdmin):
    pass

class AccountAdmin(admin.ModelAdmin):
    pass

admin.site.register(Template, TemplateAdmin)
admin.site.register(NFT, NFTAdmin)
admin.site.register(Account, AccountAdmin)
