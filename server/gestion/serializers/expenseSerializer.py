from rest_framework import serializers

from gestion.models.expenses import Expense

class ExpenseSerializer(serializers.ModelSerializer):

    expense = serializers.SerializerMethodField()

    class Meta:
        model = Expense
        fields = ("__all__")

    def get_expense(self, obj :Expense):
        return obj.getExpense()