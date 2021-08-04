from django.urls import path
from gestion.views.productViews import *
from gestion.views.categoryView import *
from gestion.views.providerView import *
from gestion.views.providerOrderView import *
from gestion.views.orderViews import *
from gestion.views.clientView import *
from gestion.views.orderRandoView import *

urlpatterns = [
    #! products views
    path("getProducts/<int:page>", getProducts),
    path("getProduct/<int:id>", getProduct),
    path("searchProducts/<int:page>", searchProducts),
    path("postProduct", postProduct),
    path("updateProduct/<int:id>", updateProduct),
    path("deleteProduct/<int:id>", deleteProduct),

    #! provider views
    path("getProviderPossibleSearchKeys", getProviderPossibleSearchKeys),
    path("getAllProviders", getAllProviders),
    path("getProviders/<int:page>", getProviders),
    path("getProvider/<int:id>", getProvider),
    path("searchProviders/<int:page>", searchProviders),
    path("postProvider", postProvider),
    path("updateProvider/<int:id>", updateProvider),
    path("deleteProvider/<int:id>", deleteProvider),

    #! client views
    path("getClientPossibleSearchKeys", getClientPossibleSearchKeys),
    path("getAllClients", getAllClients),
    path("getClients/<int:page>", getClients),
    path("getClient/<int:id>", getClient),
    path("searchClients/<int:page>", searchClients),
    path("postClient", postClient),
    path("updateClient/<int:id>", updateClient),
    path("deleteClient/<int:id>", deleteClient),

    #! provider order views
    path("getProviderOrderPossibleSearchKeys", getProviderOrderPossibleSearchKeys),
    path("getProviderOrders/<int:page>", getProviderOrders),
    path("getProviderOrder/<int:id>", getProviderOrder),
    path("searchProviderOrders/<int:page>", searchProviderOrders),
    path("postProviderOrder", postProviderOrder),
    path("updateProviderOrder/<int:id>", updateProviderOrder),
    path("deleteProviderOrder/<int:id>", deleteProviderOrder),
    path("printProviderInvoice/<int:id>", printProviderInvoice),

    #! order views
    path("getOrderPossibleSearchKeys", getOrderPossibleSearchKeys),
    path("getOrders/<int:page>", getOrders),
    path("getOrder/<int:id>", getOrder),
    path("searchOrders/<int:page>", searchOrders),
    path("postOrder", postOrder),
    path("updateOrder/<int:id>", updateOrder),
    path("deleteOrder/<int:id>", deleteOrder),
    path("printInvoice/<int:id>", printInvoice),

    #! rando order views
    path("getOrderRandoPossibleSearchKeys", getOrderRandoPossibleSearchKeys),
    path("getRandoOrders/<int:page>", getRandoOrders),
    path("getRandoOrder/<int:id>", getRandoOrder),
    path("searchRandoOrders/<int:page>", searchRandoOrders),
    path("postRandoOrder", postRandoOrder),
    path("updateRandoOrder/<int:id>", updateRandoOrder),
    path("deleteRandoOrder/<int:id>", deleteRandoOrder),
    path("printRandoInvoice/<int:id>", printRandoInvoice),

    #! category views
    path("getCategories", getCategories),
    path("listCategories/<int:page>", listCategories),
    path("getCatSubCatCombo", getCatSubCatCombo),
    path("postCategory", postCategory),
    path("getCategory/<int:id>", getCategory),
    path("getSubCategory/<int:id>", getSubCategory),
    path("putCategory/<int:id>", putCategory),
    path("deleteCategory/<int:id>", deleteCategory),
    path("postSubCategory", postSubCategory),
    path("putSubCategory/<int:id>", putSubCategory),
    path("deleteSubCategory/<int:id>", deleteSubCategory),
]