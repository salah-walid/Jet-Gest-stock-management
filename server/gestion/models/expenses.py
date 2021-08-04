from datetime import datetime
from dateutil.relativedelta import relativedelta

from django.db import models
from django.core.validators import MinValueValidator

class Expense(models.Model):

    class ExpensesType(models.IntegerChoices):
        Constant = 0,
        Periodic = 1,

    name = models.CharField(max_length=40, unique=True)
    creationDate = models.DateTimeField(default=datetime.now, blank=False)
    expenseType = models.IntegerField(default=0, choices=ExpensesType.choices)
    value = models.FloatField(default=0, validators=[MinValueValidator(0.0)])

    def getExpense(self):
        if self.expenseType == Expense.ExpensesType.Constant:
            return self.value
        elif self.expenseType == Expense.ExpensesType.Periodic:
            delta = relativedelta(datetime.now(), self.creationDate)
            monthsDelta = delta.years * 12 + delta.months

            return monthsDelta * self.value
        
        return 0

    def __str__(self) -> str:
        return self.name