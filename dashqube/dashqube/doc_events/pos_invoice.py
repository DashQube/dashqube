import frappe
from erpnext.accounts.doctype.pos_invoice.pos_invoice import make_merge_log

def after_submit(self,method):
		if self.name and self.docstatus == 1:
			make_merge_log([{"name": self.name}])