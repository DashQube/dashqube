frappe.pages['sales-return'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Sales Return',
		single_column: true
	});

	// Create the main container
	var container = $('<div class="sales-return-container"></div>').appendTo(page.main);
	
	// Add header section
	var header = $(`
		<div class="sales-return-header">
			<h2>Sales Return Management</h2>
			<p>Select a sales invoice to create a return invoice</p>
		</div>
	`).appendTo(container);

	// Add filters section
	var filters_section = $(`
		<div class="filters-section">
			<div class="row">
				<div class="col-md-3">
					<label>Customer</label>
					<input type="text" class="form-control" id="customer-filter" placeholder="Filter by customer">
				</div>
				<div class="col-md-3">
					<label>From Date</label>
					<input type="date" class="form-control" id="from-date">
				</div>
				<div class="col-md-3">
					<label>To Date</label>
					<input type="date" class="form-control" id="to-date">
				</div>
				<div class="col-md-3">
					<label>&nbsp;</label>
					<button class="btn btn-primary btn-block" id="filter-btn">Filter</button>
				</div>
			</div>
		</div>
	`).appendTo(container);

	// Add loading indicator
	var loading = $(`
		<div class="loading-indicator" style="display: none;">
			<div class="text-center">
				<i class="fa fa-spinner fa-spin fa-2x"></i>
				<p>Loading sales invoices...</p>
			</div>
		</div>
	`).appendTo(container);

	// Add sales invoices table
	var table_container = $(`
		<div class="table-container">
			<div class="table-responsive">
				<table class="table table-striped table-hover" id="sales-invoices-table">
					<thead>
						<tr>
							<th>Invoice No.</th>
							<th>Customer</th>
							<th>Posting Date</th>
							<th>Due Date</th>
							<th>Grand Total</th>
							<th>Outstanding Amount</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody id="sales-invoices-tbody">
					</tbody>
				</table>
			</div>
		</div>
	`).appendTo(container);

	// Add CSS styles
	var styles = $(`
		<style>
			.sales-return-container {
				padding: 20px;
			}
			.sales-return-header {
				margin-bottom: 30px;
				text-align: center;
			}
			.sales-return-header h2 {
				color: #2c3e50;
				margin-bottom: 10px;
			}
			.filters-section {
				background: #f8f9fa;
				padding: 20px;
				border-radius: 8px;
				margin-bottom: 30px;
			}
			.filters-section label {
				font-weight: 600;
				color: #495057;
			}
			.table-container {
				background: white;
				border-radius: 8px;
				box-shadow: 0 2px 4px rgba(0,0,0,0.1);
				overflow: hidden;
			}
			.table th {
				background: #007bff;
				color: white;
				border: none;
				font-weight: 600;
			}
			.table td {
				vertical-align: middle;
			}
			.btn-create-return {
				background: #28a745;
				border: none;
				color: white;
				padding: 6px 12px;
				border-radius: 4px;
				font-size: 12px;
			}
			.btn-create-return:hover {
				background: #218838;
				color: white;
			}
			.btn-create-return:disabled {
				background: #6c757d;
				cursor: not-allowed;
			}
			.status-badge {
				padding: 4px 8px;
				border-radius: 12px;
				font-size: 11px;
				font-weight: 600;
			}
			.status-paid { background: #d4edda; color: #155724; }
			.status-unpaid { background: #f8d7da; color: #721c24; }
			.status-partly-paid { background: #fff3cd; color: #856404; }
			.status-overdue { background: #f5c6cb; color: #721c24; }
			.status-return { background: #cce5ff; color: #004085; }
			.loading-indicator {
				text-align: center;
				padding: 40px;
				color: #6c757d;
			}
			.no-data {
				text-align: center;
				padding: 40px;
				color: #6c757d;
			}
			.return-invoice-details {
				background: white;
				border-radius: 8px;
				box-shadow: 0 2px 4px rgba(0,0,0,0.1);
				margin-top: 30px;
				overflow: hidden;
			}
			.return-header {
				background: #28a745;
				color: white;
				padding: 15px 20px;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.return-header h3 {
				margin: 0;
				font-size: 18px;
			}
			.return-content {
				padding: 20px;
			}
			.return-info-card, .return-items-card {
				background: #f8f9fa;
				padding: 15px;
				border-radius: 6px;
				margin-bottom: 15px;
			}
			.return-info-card h5, .return-items-card h5 {
				color: #495057;
				margin-bottom: 15px;
				font-weight: 600;
			}
			.return-info-card table td {
				padding: 8px 12px;
				border: none;
			}
			.return-info-card table td:first-child {
				width: 40%;
			}
			.return-items-card .table th {
				background: #e9ecef;
				color: #495057;
				border: none;
				font-size: 12px;
				padding: 8px;
			}
			.return-items-card .table td {
				padding: 8px;
				font-size: 12px;
			}
			.return-actions {
				text-align: center;
				margin-top: 20px;
				padding-top: 20px;
				border-top: 1px solid #dee2e6;
			}
			.return-actions .btn {
				margin: 0 10px;
			}
			.modal-lg {
				max-width: 900px;
			}
			#edit-items-table .form-control {
				width: 100px;
				display: inline-block;
			}
			#edit-items-table td {
				vertical-align: middle;
			}
			.item-qty {
				text-align: center;
			}
			.remove-item {
				padding: 2px 6px;
			}
		</style>
	`).appendTo('head');

	// Function to load sales invoices
	function load_sales_invoices(filters = {}) {
		loading.show();
		$('#sales-invoices-tbody').empty();

		// First get all sales invoices
		frappe.call({
			method: 'frappe.client.get_list',
			args: {
				doctype: 'Sales Invoice',
				filters: {
					docstatus: 1,
					is_return: 0,
					...(filters.customer && { customer: ['like', '%' + filters.customer + '%'] }),
					...(filters.from_date && { posting_date: ['>=', filters.from_date] }),
					...(filters.to_date && { posting_date: ['<=', filters.to_date] })
				},
				fields: [
					'name', 'customer', 'customer_name', 'posting_date', 
					'due_date', 'grand_total', 'outstanding_amount', 'status'
				],
				order_by: 'posting_date desc',
				limit_page_length: 50
			},
			callback: function(r) {
				if (r.message) {
					// Now check which invoices already have returns
					check_existing_returns(r.message);
				} else {
					loading.hide();
					show_no_data();
				}
			},
			error: function(err) {
				loading.hide();
				frappe.msgprint('Error loading sales invoices: ' + err.message);
			}
		});
	}

	// Function to check existing returns and filter out invoices that already have returns
	function check_existing_returns(invoices) {
		if (invoices.length === 0) {
			loading.hide();
			show_no_data();
			return;
		}

		// Get list of invoices that already have returns
		var invoice_names = invoices.map(inv => inv.name);
		
		frappe.call({
			method: 'frappe.client.get_list',
			args: {
				doctype: 'Sales Invoice',
				filters: {
					docstatus: ['!=', 0], // Submitted or cancelled returns
					is_return: 1,
					return_against: ['in', invoice_names]
				},
				fields: ['return_against'],
				limit_page_length: 0
			},
			callback: function(r) {
				loading.hide();
				
				// Get list of invoices that already have returns
				var invoices_with_returns = [];
				if (r.message) {
					invoices_with_returns = r.message.map(ret => ret.return_against);
				}
				
				// Filter out invoices that already have returns
				var filtered_invoices = invoices.filter(invoice => 
					!invoices_with_returns.includes(invoice.name)
				);
				
				if (filtered_invoices.length > 0) {
					display_sales_invoices(filtered_invoices);
				} else {
					show_no_data();
				}
			},
			error: function(err) {
				loading.hide();
				frappe.msgprint('Error checking existing returns: ' + err.message);
				// Fallback: show all invoices if error occurs
				display_sales_invoices(invoices);
			}
		});
	}

	// Function to display sales invoices
	function display_sales_invoices(invoices) {
		var tbody = $('#sales-invoices-tbody');
		
		if (invoices.length === 0) {
			show_no_data();
			return;
		}

		invoices.forEach(function(invoice) {
			var row = $(`
				<tr>
					<td><strong>${invoice.name}</strong></td>
					<td>${invoice.customer_name || invoice.customer}</td>
					<td>${frappe.datetime.str_to_user(invoice.posting_date)}</td>
					<td>${frappe.datetime.str_to_user(invoice.due_date)}</td>
					<td>${format_currency(invoice.grand_total)}</td>
					<td>${format_currency(invoice.outstanding_amount)}</td>
					<td><span class="status-badge status-${invoice.status.toLowerCase().replace(' ', '-')}">${invoice.status}</span></td>
					<td>
						<button class="btn btn-create-return" data-invoice="${invoice.name}">
							<i class="fa fa-undo"></i> Create Return
						</button>
					</td>
				</tr>
			`);
			tbody.append(row);
		});
	}

	// Function to show no data message
	function show_no_data() {
		$('#sales-invoices-tbody').html(`
			<tr>
				<td colspan="8" class="no-data">
					<i class="fa fa-info-circle fa-2x"></i>
					<p>No sales invoices found</p>
				</td>
			</tr>
		`);
	}

	// Function to format currency
	function format_currency(amount) {
		return frappe.format(amount, { fieldtype: 'Currency' });
	}

	// Function to create sales return
	function create_sales_return(invoice_name) {
		frappe.confirm(
			'Create a return invoice for this sales invoice?',
			function() {
				// Get the original sales invoice details
				frappe.call({
					method: 'frappe.client.get',
					args: {
						doctype: 'Sales Invoice',
						name: invoice_name
					},
					callback: function(r) {
						if (r.message) {
							// Create a new sales invoice with is_return = 1 and negative quantities
							var return_invoice = {
								doctype: 'Sales Invoice',
								is_return: 1,
								return_against: invoice_name,
								customer: r.message.customer,
								customer_name: r.message.customer_name,
								company: r.message.company,
								posting_date: frappe.datetime.get_today(),
								due_date: frappe.datetime.get_today(),
								currency: r.message.currency,
								conversion_rate: r.message.conversion_rate,
								selling_price_list: r.message.selling_price_list,
								price_list_currency: r.message.price_list_currency,
								plc_conversion_rate: r.message.plc_conversion_rate,
								items: []
							};

							// Copy items from original invoice with negative quantities
							if (r.message.items) {
								r.message.items.forEach(function(item) {
									return_invoice.items.push({
										item_code: item.item_code,
										item_name: item.item_name,
										qty: -Math.abs(item.qty), // Make quantity negative
										rate: item.rate,
										amount: -Math.abs(item.amount), // Make amount negative
										warehouse: item.warehouse,
										uom: item.uom,
										conversion_factor: item.conversion_factor,
										description: item.description,
										base_rate: item.base_rate,
										base_amount: -Math.abs(item.base_amount), // Make base amount negative
										against_sales_invoice: invoice_name, // Link to original invoice
										against_sales_invoice_item: item.name // Link to original item row
									});
								});
							}

							// Create the return invoice
							frappe.call({
								method: 'frappe.client.insert',
								args: {
									doc: return_invoice
								},
								callback: function(response) {
									if (response.message) {
										// Show return invoice details on the page
										show_return_invoice_details(response.message, invoice_name);
										
										frappe.msgprint({
											title: 'Return Invoice Created',
											message: 'Return invoice has been created successfully.',
											indicator: 'green'
										});
										
										// Refresh the list to hide the invoice that now has a return
										load_sales_invoices();
									}
								},
								error: function(err) {
									frappe.msgprint({
										title: 'Error',
										message: 'Error creating return invoice: ' + (err.message || 'Unknown error'),
										indicator: 'red'
									});
								}
							});
						}
					},
					error: function(err) {
						frappe.msgprint({
							title: 'Error',
							message: 'Error fetching invoice details: ' + (err.message || 'Unknown error'),
							indicator: 'red'
						});
					}
				});
			}
		);
	}

	// Function to show return invoice details on the page
	function show_return_invoice_details(return_invoice, original_invoice_name) {
		// Remove existing return details if any
		$('.return-invoice-details').remove();
		
		var return_details_html = $(`
			<div class="return-invoice-details">
				<div class="return-header">
					<h3><i class="fa fa-undo"></i> Return Invoice Created</h3>
					<button class="btn btn-sm btn-secondary" id="close-return-details">
						<i class="fa fa-times"></i> Close
					</button>
				</div>
				<div class="return-content">
					<div class="row">
						<div class="col-md-6">
							<div class="return-info-card">
								<h5>Return Invoice Details</h5>
								<table class="table table-sm">
									<tr>
										<td><strong>Return Invoice No:</strong></td>
										<td>${return_invoice.name}</td>
									</tr>
									<tr>
										<td><strong>Original Invoice:</strong></td>
										<td>${original_invoice_name}</td>
									</tr>
									<tr>
										<td><strong>Customer:</strong></td>
										<td>${return_invoice.customer_name || return_invoice.customer}</td>
									</tr>
									<tr>
										<td><strong>Company:</strong></td>
										<td>${return_invoice.company}</td>
									</tr>
									<tr>
										<td><strong>Posting Date:</strong></td>
										<td>${frappe.datetime.str_to_user(return_invoice.posting_date)}</td>
									</tr>
									<tr>
										<td><strong>Currency:</strong></td>
										<td>${return_invoice.currency}</td>
									</tr>
									<tr>
										<td><strong>Grand Total:</strong></td>
										<td class="text-danger">${format_currency(return_invoice.grand_total)}</td>
									</tr>
								</table>
							</div>
						</div>
						<div class="col-md-6">
							<div class="return-items-card">
								<h5>Return Items</h5>
								<div class="table-responsive">
									<table class="table table-sm table-striped">
										<thead>
											<tr>
												<th>Item Code</th>
												<th>Item Name</th>
												<th>Qty</th>
												<th>Rate</th>
												<th>Amount</th>
											</tr>
										</thead>
										<tbody>
											${return_invoice.items.map(item => `
												<tr>
													<td>${item.item_code}</td>
													<td>${item.item_name}</td>
													<td class="text-danger">${item.qty}</td>
													<td>${format_currency(item.rate)}</td>
													<td class="text-danger">${format_currency(item.amount)}</td>
												</tr>
											`).join('')}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<div class="return-actions">
						<button class="btn btn-primary edit-items-btn" data-invoice="${return_invoice.name}">
							<i class="fa fa-edit"></i> Edit Items
						</button>
						<button class="btn btn-info" onclick="frappe.set_route('Form', 'Sales Invoice', '${return_invoice.name}')">
							<i class="fa fa-external-link"></i> Open in Form
						</button>
						<button class="btn btn-success submit-return-btn" data-invoice="${return_invoice.name}">
							<i class="fa fa-check"></i> Submit Return Invoice
						</button>
					</div>
				</div>
			</div>
		`);

		// Insert after the table container
		table_container.after(return_details_html);
		
		// Scroll to the return details
		$('html, body').animate({
			scrollTop: $('.return-invoice-details').offset().top - 100
		}, 500);
	}

	// Function to edit return invoice items inline
	function edit_return_invoice_items(invoice_name) {
		// Get current return invoice data
		frappe.call({
			method: 'frappe.client.get',
			args: {
				doctype: 'Sales Invoice',
				name: invoice_name
			},
			callback: function(r) {
				if (r.message) {
					show_edit_items_modal(r.message);
				}
			},
			error: function(err) {
				frappe.msgprint({
					title: 'Error',
					message: 'Error fetching return invoice: ' + (err.message || 'Unknown error'),
					indicator: 'red'
				});
			}
		});
	}

	// Function to show edit items modal
	function show_edit_items_modal(return_invoice) {
		var modal_html = $(`
			<div class="modal fade" id="edit-items-modal" tabindex="-1" role="dialog">
				<div class="modal-dialog modal-lg" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title">Edit Return Items - ${return_invoice.name}</h5>
							<button type="button" class="close" data-dismiss="modal">
								<span>&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<div class="table-responsive">
								<table class="table table-striped" id="edit-items-table">
									<thead>
										<tr>
											<th>Item Code</th>
											<th>Item Name</th>
											<th>Qty</th>
											<th>Rate</th>
											<th>Amount</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										${return_invoice.items.map((item, index) => `
											<tr data-item-index="${index}">
												<td>${item.item_code}</td>
												<td>${item.item_name}</td>
												<td>
													<input type="number" class="form-control item-qty" 
														   value="${item.qty}" data-original-qty="${item.qty}" 
														   min="-999999" max="0" step="0.01">
												</td>
												<td>${format_currency(item.rate)}</td>
												<td class="item-amount">${format_currency(item.amount)}</td>
												<td>
													<button class="btn btn-sm btn-danger remove-item" data-index="${index}">
														<i class="fa fa-trash"></i>
													</button>
												</td>
											</tr>
										`).join('')}
									</tbody>
								</table>
							</div>
							<div class="mt-3">
								<button class="btn btn-success" id="add-item-btn">
									<i class="fa fa-plus"></i> Add Item
								</button>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
							<button type="button" class="btn btn-primary" id="save-items-btn">Save Changes</button>
						</div>
					</div>
				</div>
			</div>
		`);

		// Remove existing modal if any
		$('#edit-items-modal').remove();
		$('body').append(modal_html);
		$('#edit-items-modal').modal('show');

		// Event handlers for the modal
		setup_edit_items_handlers(return_invoice);
	}

	// Function to setup edit items handlers
	function setup_edit_items_handlers(return_invoice) {
		// Update amount when quantity changes
		$(document).on('input', '.item-qty', function() {
			var row = $(this).closest('tr');
			var qty = parseFloat($(this).val()) || 0;
			var rate = parseFloat(row.find('td:nth-child(4)').text().replace(/[^\d.-]/g, '')) || 0;
			var amount = qty * rate;
			row.find('.item-amount').text(format_currency(amount));
		});

		// Remove item
		$(document).on('click', '.remove-item', function() {
			var row = $(this).closest('tr');
			var row_index = row.index();
			
			// If it's an existing item (not newly added), delete it from the database
			if (row_index < return_invoice.items.length) {
				var item_name = return_invoice.items[row_index].name;
				
				frappe.confirm(
					'Are you sure you want to remove this item?',
					function() {
						frappe.call({
							method: 'frappe.client.delete',
							args: {
								doctype: 'Sales Invoice Item',
								name: item_name
							},
							callback: function(r) {
								if (r.message) {
									row.remove();
									frappe.msgprint({
										title: 'Success',
										message: 'Item removed successfully.',
										indicator: 'green'
									});
								}
							},
							error: function(err) {
								frappe.msgprint({
									title: 'Error',
									message: 'Error removing item: ' + (err.message || 'Unknown error'),
									indicator: 'red'
								});
							}
						});
					}
				);
			} else {
				// Just remove from table if it's a newly added item
				row.remove();
			}
		});

		// Add new item
		$('#add-item-btn').on('click', function() {
			show_add_item_modal(return_invoice);
		});

		// Save changes
		$('#save-items-btn').on('click', function() {
			save_return_items_changes(return_invoice);
		});
	}

	// Function to show add item modal
	function show_add_item_modal(return_invoice) {
		var add_item_html = $(`
			<div class="modal fade" id="add-item-modal" tabindex="-1" role="dialog">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title">Add Return Item</h5>
							<button type="button" class="close" data-dismiss="modal">
								<span>&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<div class="form-group">
								<label>Item Code</label>
								<input type="text" class="form-control" id="new-item-code" placeholder="Enter item code">
							</div>
							<div class="form-group">
								<label>Quantity (negative)</label>
								<input type="number" class="form-control" id="new-item-qty" 
									   placeholder="Enter quantity" min="-999999" max="0" step="0.01">
							</div>
							<div class="form-group">
								<label>Rate</label>
								<input type="number" class="form-control" id="new-item-rate" 
									   placeholder="Enter rate" min="0" step="0.01">
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
							<button type="button" class="btn btn-primary" id="add-item-confirm">Add Item</button>
						</div>
					</div>
				</div>
			</div>
		`);

		$('#add-item-modal').remove();
		$('body').append(add_item_html);
		$('#add-item-modal').modal('show');

		$('#add-item-confirm').on('click', function() {
			var item_code = $('#new-item-code').val();
			var qty = parseFloat($('#new-item-qty').val()) || 0;
			var rate = parseFloat($('#new-item-rate').val()) || 0;

			if (!item_code || qty >= 0 || rate <= 0) {
				frappe.msgprint('Please enter valid item code, negative quantity, and positive rate.');
				return;
			}

			// Add new item to the return invoice
			frappe.call({
				method: 'frappe.client.insert',
				args: {
					doc: {
						doctype: 'Sales Invoice Item',
						parent: return_invoice.name,
						parenttype: 'Sales Invoice',
						parentfield: 'items',
						item_code: item_code,
						item_name: item_code,
						qty: qty,
						rate: rate,
						amount: qty * rate,
						base_rate: rate,
						base_amount: qty * rate,
						warehouse: return_invoice.items[0] ? return_invoice.items[0].warehouse : '',
						uom: return_invoice.items[0] ? return_invoice.items[0].uom : '',
						conversion_factor: return_invoice.items[0] ? return_invoice.items[0].conversion_factor : 1
					}
				},
				callback: function(r) {
					if (r.message) {
						// Add row to table
						var new_row = $(`
							<tr>
								<td>${item_code}</td>
								<td>${item_code}</td>
								<td>
									<input type="number" class="form-control item-qty" 
										   value="${qty}" min="-999999" max="0" step="0.01">
								</td>
								<td>${format_currency(rate)}</td>
								<td class="item-amount">${format_currency(qty * rate)}</td>
								<td>
									<button class="btn btn-sm btn-danger remove-item">
										<i class="fa fa-trash"></i>
									</button>
								</td>
							</tr>
						`);
						$('#edit-items-table tbody').append(new_row);
						$('#add-item-modal').modal('hide');
						
						frappe.msgprint({
							title: 'Success',
							message: 'Item added successfully.',
							indicator: 'green'
						});
					}
				},
				error: function(err) {
					frappe.msgprint({
						title: 'Error',
						message: 'Error adding item: ' + (err.message || 'Unknown error'),
						indicator: 'red'
					});
				}
			});
		});
	}

	// Function to save return items changes
	function save_return_items_changes(return_invoice) {
		var updated_items = [];
		var has_changes = false;

		$('#edit-items-table tbody tr').each(function() {
			var row = $(this);
			var qty = parseFloat(row.find('.item-qty').val()) || 0;
			var rate = parseFloat(row.find('td:nth-child(4)').text().replace(/[^\d.-]/g, '')) || 0;
			var amount = qty * rate;

			updated_items.push({
				item_code: row.find('td:nth-child(1)').text(),
				item_name: row.find('td:nth-child(2)').text(),
				qty: qty,
				rate: rate,
				amount: amount,
				base_rate: rate,
				base_amount: amount,
				warehouse: return_invoice.items[0] ? return_invoice.items[0].warehouse : '',
				uom: return_invoice.items[0] ? return_invoice.items[0].uom : '',
				conversion_factor: return_invoice.items[0] ? return_invoice.items[0].conversion_factor : 1
			});

			// Check if quantity changed
			var original_qty = parseFloat(row.find('.item-qty').data('original-qty')) || 0;
			if (qty !== original_qty) {
				has_changes = true;
			}
		});

		if (!has_changes && updated_items.length === return_invoice.items.length) {
			frappe.msgprint('No changes detected.');
			$('#edit-items-modal').modal('hide');
			return;
		}

		// Update each item individually
		var update_promises = [];
		
		$('#edit-items-table tbody tr').each(function(index) {
			var row = $(this);
			var qty = parseFloat(row.find('.item-qty').val()) || 0;
			var original_qty = parseFloat(row.find('.item-qty').data('original-qty')) || 0;
			
			if (qty !== original_qty && index < return_invoice.items.length) {
				// Update existing item
				var item_name = return_invoice.items[index].name;
				var rate = parseFloat(row.find('td:nth-child(4)').text().replace(/[^\d.-]/g, '')) || 0;
				var amount = qty * rate;
				
				update_promises.push(
					frappe.call({
						method: 'frappe.client.set_value',
						args: {
							doctype: 'Sales Invoice Item',
							name: item_name,
							fieldname: 'qty',
							value: qty
						}
					})
				);
				
				update_promises.push(
					frappe.call({
						method: 'frappe.client.set_value',
						args: {
							doctype: 'Sales Invoice Item',
							name: item_name,
							fieldname: 'amount',
							value: amount
						}
					})
				);
			}
		});
		
		if (update_promises.length === 0) {
			frappe.msgprint('No changes detected.');
			$('#edit-items-modal').modal('hide');
			return;
		}
		
		// Wait for all updates to complete
		Promise.all(update_promises).then(function() {
			frappe.msgprint({
				title: 'Success',
				message: 'Return items updated successfully.',
				indicator: 'green'
			});
			$('#edit-items-modal').modal('hide');
			
			// Refresh the return invoice data and display
			frappe.call({
				method: 'frappe.client.get',
				args: {
					doctype: 'Sales Invoice',
					name: return_invoice.name
				},
				callback: function(r) {
					if (r.message) {
						show_return_invoice_details(r.message, return_invoice.return_against);
					}
				}
			});
		}).catch(function(err) {
			frappe.msgprint({
				title: 'Error',
				message: 'Error updating return items: ' + (err.message || 'Unknown error'),
				indicator: 'red'
			});
		});
	}

	// Function to submit return invoice
	function submit_return_invoice(invoice_name) {
		frappe.confirm(
			'Are you sure you want to submit this return invoice?',
			function() {
				// First get the document
				frappe.call({
					method: 'frappe.client.get',
					args: {
						doctype: 'Sales Invoice',
						name: invoice_name
					},
					callback: function(r) {
						if (r.message) {
							// Then submit the document
							frappe.call({
								method: 'frappe.client.submit',
								args: {
									doc: r.message
								},
								callback: function(response) {
									if (response.message) {
										frappe.msgprint({
											title: 'Success',
											message: 'Return invoice has been submitted successfully.',
											indicator: 'green'
										});
										// Remove the return details section
										$('.return-invoice-details').remove();
										// Refresh the list to hide invoices that now have returns
										load_sales_invoices();
									}
								},
								error: function(err) {
									frappe.msgprint({
										title: 'Error',
										message: 'Error submitting return invoice: ' + (err.message || 'Unknown error'),
										indicator: 'red'
									});
								}
							});
						}
					},
					error: function(err) {
						frappe.msgprint({
							title: 'Error',
							message: 'Error fetching return invoice: ' + (err.message || 'Unknown error'),
							indicator: 'red'
						});
					}
				});
			}
		);
	}

	// Event handlers
	$('#filter-btn').on('click', function() {
		var filters = {
			customer: $('#customer-filter').val(),
			from_date: $('#from-date').val(),
			to_date: $('#to-date').val()
		};
		load_sales_invoices(filters);
	});

	$(document).on('click', '.btn-create-return', function() {
		var invoice_name = $(this).data('invoice');
		create_sales_return(invoice_name);
	});

	$(document).on('click', '#close-return-details', function() {
		$('.return-invoice-details').remove();
	});

	$(document).on('click', '.edit-items-btn', function() {
		var invoice_name = $(this).data('invoice');
		edit_return_invoice_items(invoice_name);
	});

	$(document).on('click', '.submit-return-btn', function() {
		var invoice_name = $(this).data('invoice');
		submit_return_invoice(invoice_name);
	});

	// Load initial data
	load_sales_invoices();
}