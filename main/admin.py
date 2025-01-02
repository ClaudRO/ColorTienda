# Register your models here.
from django.contrib import admin
from .models import Product, Color, ColorRelationship

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'price', 'stock')
    search_fields = ('name', 'type')
    list_filter = ('type',)

@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):
    list_display = ('name', 'hex_code') 
    search_fields = ('name',)
    
@admin.register(ColorRelationship)
class ColorRelationshipAdmin(admin.ModelAdmin):
    list_display = ('base_color', 'related_color') 
