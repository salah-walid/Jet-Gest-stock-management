from django.contrib import admin

from .models.product import Product, ProductCategoriesMany, ProductSubCategoriesMany
from .models.orderData import OrderData
from .models.productOrderData import ProductOrderData
from .models.category import Category, CategorySubCategoryMany
from .models.subCategory import SubCategory
from .models.client import Client
from .models.entries import Entries
from .models.provider import Provider
from .models.providerOrder import ProviderOrder
from .models.SalesAndBalance import SalesAndBalance
from .models.orderRando import OrderRando
from .models.productRandoOrder import ProductRandoOrder
from .models.expenses import Expense

# Register your models here.

class CategoriesInlineProduct(admin.TabularInline):
    model = ProductCategoriesMany
    extra = 1

class SubCategoriesInlineProduct(admin.TabularInline):
    model = ProductSubCategoriesMany
    extra = 1

class catSubCatInline(admin.TabularInline):
    model = CategorySubCategoryMany
    extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["id", "title"]
    readonly_fields = ["salesCount"]
    inlines = (CategoriesInlineProduct, SubCategoriesInlineProduct,)

@admin.register(OrderData)
class OrderDataAdmin(admin.ModelAdmin):
    list_display = ["id", "seller", "client", "creationDate", "totalHT", "totalTTC"]
    readonly_fields = ["orderList"]

    def orderList(self, obj):
        return obj.orderList()

@admin.register(OrderRando)
class OrderRandoDataAdmin(admin.ModelAdmin):
    list_display = ["id", "seller", "client", "creationDate", "total"]
    readonly_fields = ["orderList"]

    def orderList(self, obj):
        return obj.orderList()

@admin.register(ProductRandoOrder)
class ProductRandoOrderDataAdmin(admin.ModelAdmin):
    list_display = ["id", "product", "order", "price", "quantity"]

@admin.register(ProductOrderData)
class ProductOrderDataAdmin(admin.ModelAdmin):
    list_display = ["id", "product", "order", "price", "quantity"]


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["id", "title"]
    inlines = (catSubCatInline,)

@admin.register(SubCategory)
class subCategoryAdmin(admin.ModelAdmin):
    list_display = ["id", "title"]

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "lastName"]

@admin.register(Entries)
class EntriesAdmin(admin.ModelAdmin):
    list_display = ["id", "product", "price", "quantity", "order"]

@admin.register(Provider)
class ClientAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "lastName"]

@admin.register(ProviderOrder)
class OrderDataAdmin(admin.ModelAdmin):
    list_display = ["id", "seller", "provider", "creationDate", "total"]
    readonly_fields = ["orderList"]

    def orderList(self, obj):
        return obj.orderList()

@admin.register(SalesAndBalance)
class SalesAndBalanceAdmin(admin.ModelAdmin):
    list_display = ("chooseProduct", "totalSales", "balance")

@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ("name", "expenseType")
