from django.db import models

# Create your models here.
def stmt_upload_path(instance, filename):
  return '/'.join(['condobill_stmt',str(instance.statement_date),filename])
def pymt_upload_path(instance, filename):
  return '/'.join(['condobill_pymt',str(instance.statement_date),filename])

class CondoBill(models.Model):

  statement_date = models.DateField(null=True, blank=True)
  statement_amount = models.FloatField(null=True, blank=True)
  payment_date = models.DateField(null=True, blank=True)
  payment_amount = models.FloatField(null=True, blank=True)
  payment_ref = models.CharField(max_length=30, null=True, blank=True)

  img_stmt = models.ImageField(blank=True, null=True, upload_to=stmt_upload_path)
  img_pymt = models.ImageField(blank=True, null=True, upload_to=pymt_upload_path)
  def __str__(self):
    return self.statement_date.strftime("%Y-%m-%d") + " - " + str(self.statement_amount)
