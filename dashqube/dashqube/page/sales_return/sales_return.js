frappe.pages['sales-return'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Sales Transactions',
		single_column: true
	});

	setup_sales_transactions_page(page);
}

function setup_sales_transactions_page(page) {
	page.clear_menu();
	page.set_primary_action(__('Refresh'), () => {
		refresh_active_tab(page);
	});

	const tabs = make_tabs(page);

	// Styles for tabs
	const style = $('<style>\
		.sales-tabs .nav-tabs { margin-bottom: 8px; border-bottom: 1px solid #e5e7eb; }\
		.sales-tabs .nav-link { color: #374151; font-weight: 500; border: none; padding: 8px 12px; margin-right: 4px; border-radius: 6px 6px 0 0; }\
		.sales-tabs .nav-link:hover { background: #f3f4f6; }\
		.sales-tabs .nav-link.active { background: #2563eb; color: #fff; }\
		.card-container { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; margin-bottom: 12px; }\
		.filters-row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-bottom: 12px; }\
		.result-list { min-height: 200px; }\
		.doc-row { display: flex; justify-content: space-between; gap: 16px; padding: 10px 4px; border-bottom: 1px solid #e5e7eb; cursor: pointer; }\
		.doc-row:last-child { border-bottom: 0; }\
		.doc-title { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\
		.doc-sub { color: #6b7280; font-size: 12px; white-space: nowrap; }\
		.doc-right { text-align: right; min-width: 160px; }\
		.status-badge { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 11px; background: #f3f4f6; color: #374151; }\
		.status-badge[data-status="Submitted"] { background: #d1fae5; color: #065f46; }\
		.status-badge[data-status="Draft"] { background: #e5e7eb; color: #4b5563; }\
		.status-badge[data-status="Unpaid"] { background: #fee2e2; color: #991b1b; }\
		.status-badge[data-status="Open"] { background: #dbeafe; color: #1e40af; }\
		.status-badge[data-status="To Deliver"] { background: #fef3c7; color: #92400e; }\
		.status-badge[data-status="To Deliver and Bill"] { background: #fed7aa; color: #9a3412; }\
		.status-badge[data-status="To Bill"] { background: #fef3c7; color: #92400e; }\
		.status-badge[data-status="Completed"] { background: #d1fae5; color: #065f46; }\
		.status-badge[data-status="Cancelled"] { background: #fee2e2; color: #991b1b; }\
		.status-badge[data-status="Closed"] { background: #e5e7eb; color: #4b5563; }\
		.status-badge[data-status="Paid"] { background: #d1fae5; color: #065f46; }\
		.status-badge[data-status="Partly Paid"] { background: #fef3c7; color: #92400e; }\
		.status-badge[data-status="Overdue"] { background: #fee2e2; color: #991b1b; }\
		.item-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; padding: 16px 0; }\
		.item-card { border: 2px solid #e0e0e0; border-radius: 12px; padding: 16px; background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }\
		.item-card:hover { border-color: #1976d2; background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); transform: translateY(-4px) scale(1.02); box-shadow: 0 8px 25px rgba(25, 118, 210, 0.15); }\
		.item-img { width: 100%; height: 120px; border-radius: 8px; background: linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%); display:flex; align-items:center; justify-content:center; overflow:hidden; border: 1px solid #e0e0e0; }\
		.item-img img { max-width: 100%; max-height: 100%; object-fit: contain; }\
		.item-img span { font-size: 48px; font-weight: bold; color: #1976d2; text-shadow: 0 2px 4px rgba(0,0,0,0.1); }\
		.item-title { margin-top: 12px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #2c3e50; font-size: 14px; }\
		.item-sub { color: #7f8c8d; font-size: 12px; margin-top: 4px; }\
		.item-selected { background: linear-gradient(135deg, #c8e6c9 0%, #e8f5e8 100%); color: #2e7d32; padding: 8px 12px; border-radius: 8px; font-weight: 500; border: 1px solid #a5d6a7; }\
		.sales-tabs .nav-link.active[data-target="#st-quo"] { background: #059669; color: #fff; }\
		.sales-tabs .nav-link.active[data-target="#st-so"] { background: #2563eb; color: #fff; }\
		.sales-tabs .nav-link.active[data-target="#st-dn"] { background: #7c3aed; color: #fff; }\
		.sales-tabs .nav-link.active[data-target="#st-si"] { background: #dc2626; color: #fff; }\
	</style>');
	$(page.body).prepend(style);

	render_tab_body(page, tabs, 'Sales Invoice');

	page.wrapper.on('show', () => refresh_active_tab(page));
}

function make_tabs(page) {
	const tab_html = $(
		'<div class="sales-tabs">\
			<ul class="nav nav-tabs" role="tablist">\
				<li class="nav-item">\
					<button type="button" class="nav-link" data-target="#st-quo" role="tab" aria-selected="false">' + __('Quotation') + '</button>\
				</li>\
				<li class="nav-item">\
					<button type="button" class="nav-link" data-target="#st-so" role="tab" aria-selected="false">' + __('Sales Order') + '</button>\
				</li>\
				<li class="nav-item">\
					<button type="button" class="nav-link" data-target="#st-dn" role="tab" aria-selected="false">' + __('Delivery Note') + '</button>\
				</li>\
				<li class="nav-item">\
					<button type="button" class="nav-link active" data-target="#st-si" role="tab" aria-selected="true">' + __('Sales Invoice') + '</button>\
				</li>\
			</ul>\
			<div class="tab-content" style="padding-top: 12px;">\
				<div class="tab-pane" id="st-quo" role="tabpanel"></div>\
				<div class="tab-pane" id="st-so" role="tabpanel"></div>\
				<div class="tab-pane" id="st-dn" role="tabpanel"></div>\
				<div class="tab-pane active" id="st-si" role="tabpanel"></div>\
			</div>\
		</div>'
	);

	$(page.body).empty().append(tab_html);

	tab_html.find('.nav-link').on('click', function(e) {
		e.preventDefault();
		const $btn = $(this);
		const target = $btn.attr('data-target');
		$btn.closest('.nav').find('.nav-link').removeClass('active').attr('aria-selected', 'false');
		$btn.addClass('active').attr('aria-selected', 'true');
		const $content = tab_html.find('.tab-content');
		$content.find('.tab-pane').removeClass('active');
		$content.find(target).addClass('active');
		const label = $btn.text().trim();
		render_tab_body(page, tab_html, label);
	});

	return tab_html;
}

function render_tab_body(page, tabs_wrapper, label) {
	const doctype_map = {
		'Quotation': 'Quotation',
		'Sales Order': 'Sales Order',
		'Delivery Note': 'Delivery Note',
		'Sales Invoice': 'Sales Invoice'
	};

	const pane_id = label === 'Quotation' ? '#st-quo' : (label === 'Sales Order' ? '#st-so' : (label === 'Delivery Note' ? '#st-dn' : '#st-si'));
	const $pane = tabs_wrapper.find(pane_id);
	$pane.empty();

	// Item selector (for all tabs) - matching purchase_data.js structure exactly
	const item_selector = $('<div class="card-container" style="margin-top:12px"><div class="d-flex" style="gap:12px; align-items:center; flex-wrap:wrap; background: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 16px;">\
		<div class="h6 mb-0" style="margin-right:auto; color: #111827; font-weight: 600;">' + __('All Items') + '</div>\
		<input type="text" class="form-control item-search" placeholder="' + __('Search by item code, serial number or barcode') + '" style="max-width:360px; border-radius: 6px;">\
		<select class="form-control item-group" style="max-width:240px; border-radius: 6px;"><option value="">' + __('Select item group') + '</option></select>\
	</div>\
	<div class="item-grid" style="margin-top:10px"></div></div>');
	$pane.prepend(item_selector);
	
	// Selected items section
	const selected_items_section = $('<div class="card-container" style="margin-top:12px"><div class="h6 mb-2" style="color: #111827; font-weight: 600;">' + __('Selected Items') + '</div><div class="selected-items-table" style="background: #fff; border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;"><div class="table-header" style="background: #f9fafb; padding: 12px; border-bottom: 1px solid #e5e7eb; display: grid; grid-template-columns: 1fr 100px 120px 120px 120px 200px 80px; gap: 12px; font-weight: 600; color: #374151;"><div>Item</div><div>Qty</div><div>Rate</div><div>Amount</div><div>UOM</div><div>Warehouse</div><div>Action</div></div><div class="selected-items-list"></div></div></div>');
	$pane.append(selected_items_section);
	
	// Quotation creation section (initially hidden)
	const quotation_section = $('<div class="card-container quotation-create-section" style="margin-top:12px; display:none;"><div class="h6 mb-2" style="color: #111827; font-weight: 600;">' + __('Create Quotation') + '</div><div class="quotation-form" style="background: #fff; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px;"><div class="row mb-3"><div class="col-md-6"><label class="form-label">' + __('Customer') + '</label><div class="customer-field"></div></div><div class="col-md-6"><label class="form-label">' + __('Valid Until') + '</label><input type="date" class="form-control valid-until" value="' + frappe.datetime.add_days(frappe.datetime.get_today(), 30) + '"></div></div><div class="row mb-3"><div class="col-md-6"><label class="form-label">' + __('Currency') + '</label><select class="form-control currency-select"><option value="SAR">SAR</option><option value="USD">USD</option><option value="EUR">EUR</option></select></div><div class="col-md-6"><label class="form-label">' + __('Price List') + '</label><div class="price-list-field"></div></div></div><div class="d-flex justify-content-between align-items-center"><div class="total-summary"><strong>' + __('Total Amount: ') + '</strong><span class="total-amount">0.00</span></div><div><button class="btn btn-success create-quotation-btn"><i class="fa fa-file-text"></i> ' + __('Create & Submit Quotation') + '</button></div></div></div></div>');
	$pane.append(quotation_section);
	
	initialize_item_selector(item_selector, (item) => {
		add_item_to_selected(item, selected_items_section, quotation_section);
	});
	
	// Initialize quotation form fields
	initialize_quotation_form(quotation_section, selected_items_section);

	const header = $('<div class="card-container"></div>');
	const filters_row = $('<div class="filters-row"></div>');
	
	let customer_control = null;
	const customer_placeholder = $('<div style="min-width:220px"></div>').appendTo(filters_row);
	customer_control = frappe.ui.form.make_control({
		parent: customer_placeholder.get(0),
		df: { label: __('Customer'), fieldname: 'customer_filter', fieldtype: 'Link', options: 'Customer', placeholder: __('Select Customer') },
		only_input: false
	});
	customer_control.refresh();

	header.append(filters_row);
	
	const list = $('<div class="result-list"></div>');
	header.append(list);
	$pane.append(header);

	let search_timer = null;
	const trigger_search = () => {
		const customer = customer_control && customer_control.get_value ? customer_control.get_value() : '';
		load_docs_into(list, doctype_map[label], customer, label);
	};

	if (customer_control && customer_control.$input) {
		$(customer_control.$input).on('change', () => { if (search_timer) clearTimeout(search_timer); search_timer = setTimeout(trigger_search, 50); });
	}

	trigger_search();
}

function initialize_item_selector(wrapper, on_select) {
	const $grid = wrapper.find('.item-grid');
	const $search = wrapper.find('.item-search');
	const $group = wrapper.find('.item-group');

	let timer = null;
	const reload = () => {
		const txt = ($search.val() || '').trim();
		const group = ($group.val() || '').trim();
		load_items_into_grid($grid, txt, group, on_select);
	};

	$search.on('input', () => { if (timer) clearTimeout(timer); timer = setTimeout(reload, 300); });
	$group.on('change', reload);

	// load groups then items
	frappe.call({
		method: 'frappe.client.get_list',
		args: { doctype: 'Item Group', fields: ['name'], filters: { is_group: 0 }, limit_page_length: 100, order_by: 'name asc' },
		callback: r => {
			const groups = (r && r.message) || [];
			groups.forEach(g => $group.append('<option value="' + frappe.utils.escape_html(g.name) + '">' + frappe.utils.escape_html(g.name) + '</option>'));
			reload();
		}
	});
}

function load_items_into_grid(grid, search_text, item_group, on_select) {
	grid.empty().append($('<div class="text-muted">' + __('Loading items...') + '</div>'));
	const filters = { disabled: 0 };
	if (item_group) filters['item_group'] = item_group;

	frappe.call({
		method: 'frappe.client.get_list',
		args: {
			doctype: 'Item',
			fields: ['name', 'item_name', 'image', 'stock_uom', 'standard_rate', 'item_code'],
			filters: filters,
			or_filters: search_text ? [
				['Item', 'name', 'like', '%' + search_text + '%'],
				['Item', 'item_name', 'like', '%' + search_text + '%'],
				['Item', 'item_code', 'like', '%' + search_text + '%']
			] : undefined,
			limit_page_length: 10
		},
		callback: (r) => {
			const items = (r && r.message) || [];
			render_item_cards(grid, items, on_select);
		}
	});
}

function render_item_cards(grid, items, on_select) {
	grid.empty();
	if (!items.length) {
		grid.append($('<div class="text-muted">' + __('No items found') + '</div>'));
		return;
	}
	items.forEach(it => {
		const price = (it.standard_rate != null) ? format_currency(it.standard_rate) : '';
		const $card = $(
			'<div class="item-card">\
				<div class="item-img">' + (it.image ? ('<img src="' + encodeURI(it.image) + '">') : '<span>' + (it.item_name ? it.item_name.charAt(0) : '_') + '</span>') + '</div>\
				<div class="item-title">' + frappe.utils.escape_html(it.item_name || it.name) + '</div>\
				<div class="item-sub">' + (price ? price : '0') + ' / ' + frappe.utils.escape_html(it.stock_uom || '') + '</div>\
			</div>'
		);
		$card.attr('tabindex', '0');
		$card.on('click keypress', (e) => {
			if (e.type === 'keypress' && e.which !== 13 && e.which !== 32) return; // enter/space
			if (on_select) on_select(it);
		});
		grid.append($card);
	});
}

function load_docs_into(container, doctype, customer_name, label_for_logic) {
	container.empty().append($('<div class="text-muted">' + __('Loading...') + '</div>'));

	const filters = [];
	if (customer_name) {
		// Quotation uses 'party_name' field, others use 'customer'
		if (doctype === 'Quotation') {
			filters.push([doctype, 'party_name', '=', customer_name]);
		} else {
			filters.push([doctype, 'customer', '=', customer_name]);
		}
	}

	// Special filter for Sales Invoice - exclude returns and only show submitted
	if (doctype === 'Sales Invoice') {
		filters.push([doctype, 'is_return', '=', 0]);
		filters.push([doctype, 'docstatus', '=', 1]);
	}

	let fields = ['name', 'status', 'modified'];
	if (doctype === 'Quotation') {
		fields = ['name', 'party_name', 'customer_name', 'transaction_date', 'status', 'grand_total', 'currency'];
	} else if (doctype === 'Sales Order') {
		fields = ['name', 'customer', 'customer_name', 'transaction_date', 'status', 'grand_total', 'currency'];
	} else if (doctype === 'Delivery Note') {
		fields = ['name', 'customer', 'customer_name', 'posting_date', 'status', 'grand_total', 'currency'];
	} else if (doctype === 'Sales Invoice') {
		fields = ['name', 'customer', 'customer_name', 'posting_date', 'due_date', 'status', 'grand_total', 'outstanding_amount', 'currency'];
	}

	frappe.call({
		method: 'frappe.client.get_list',
		args: {
			doctype: doctype,
			fields: fields,
			filters: filters,
			order_by: 'modified desc',
			limit_page_length: 20
		},
		callback: (r) => {
			const data = (r && r.message) || [];
			render_doc_list(container, doctype, data);
		}
	});
}

function render_doc_list(container, doctype, rows) {
	container.empty();
	if (!rows.length) {
		container.append($('<div class="text-muted">' + __('No records found') + '</div>'));
		return;
	}

	rows.forEach(row => {
		const title = row.name;
		const customer = row.customer_name || row.party_name || row.customer || '';
		const date = row.posting_date || row.transaction_date || '';
		const status = row.status || '';
		const total = (row.grand_total != null ? format_currency(row.grand_total, row.currency) : '');

		const $card = $(
			'<div class="doc-row">\
				<div>\
					<div class="doc-title">' + frappe.utils.escape_html(title) + '</div>\
					<div class="doc-sub">' + frappe.utils.escape_html(customer) + (date ? (' • ' + frappe.datetime.str_to_user(date)) : '') + '</div>\
				</div>\
				<div class="doc-right">\
					<div>' + (total || '') + '</div>\
					<div class="status-badge" data-status="' + frappe.utils.escape_html(status) + '">' + frappe.utils.escape_html(status) + '</div>\
					' + (doctype === 'Sales Invoice' ? '<button class="btn btn-primary btn-sm create-return-btn" data-invoice="' + frappe.utils.escape_html(title) + '" style="margin-top:4px; padding: 4px 12px; font-size: 11px;"><i class="fa fa-undo"></i> Return</button>' : '') + '\
					' + (doctype === 'Sales Order' ? '<button class="btn btn-success btn-sm create-delivery-note-btn" data-order="' + frappe.utils.escape_html(title) + '" style="margin-top:4px; padding: 4px 12px; font-size: 11px;"><i class="fa fa-truck"></i> Delivery Note</button>' : '') + '\
					' + (doctype === 'Quotation' ? '<button class="btn btn-info btn-sm create-sales-order-btn" data-quotation="' + frappe.utils.escape_html(title) + '" style="margin-top:4px; padding: 4px 12px; font-size: 11px;"><i class="fa fa-shopping-cart"></i> ' + (status === 'Submitted' ? 'Sales Order' : 'Sales Order') + '</button>' : '') + '\
				</div>\
			</div>'
		);

		$card.on('click', () => open_doc_preview(doctype, row.name));
		
		// Separate click handlers for action buttons
		if (doctype === 'Sales Invoice') {
			$card.find('.create-return-btn').on('click', function(e) {
				e.stopPropagation();
				create_sales_return(row.name);
			});
		}
		
		if (doctype === 'Sales Order') {
			$card.find('.create-delivery-note-btn').on('click', function(e) {
				e.stopPropagation();
				create_delivery_note_from_order(row.name);
			});
		}
		
		if (doctype === 'Quotation') {
			$card.find('.create-sales-order-btn').on('click', function(e) {
				e.stopPropagation();
				create_sales_order_from_quotation(row.name);
			});
		}
		
		container.append($card);
	});
}

function refresh_active_tab(page) {
	const active_link = $(page.body).find('.nav-link.active');
	const label = active_link.length ? active_link.text().trim() : 'Sales Invoice';
	const doctype_map = {
		'Quotation': 'Quotation',
		'Sales Order': 'Sales Order',
		'Delivery Note': 'Delivery Note',
		'Sales Invoice': 'Sales Invoice'
	};

	const pane_id = label === 'Quotation' ? '#st-quo' : (label === 'Sales Order' ? '#st-so' : (label === 'Delivery Note' ? '#st-dn' : '#st-si'));
	const $pane = $(page.body).find(pane_id);
	const list = $pane.find('.result-list');
	if (list.length) {
		const doctype = doctype_map[label];
		load_docs_into(list, doctype, '', label);
	}
}

function open_doc_preview(doctype, name) {
	frappe.set_route('Form', doctype, name);
}

function format_currency(amount, currency) {
	if (amount == null || amount === '') return '';
	const currency_code = currency || 'SAR';
	return frappe.format(amount, { fieldtype: 'Float', precision: 2 }) + ' ' + currency_code;
}

function add_item_to_selected(item, selected_section, quotation_section) {
	const $list = selected_section.find('.selected-items-list');
	
	// Check if item already exists
	const existing_item = $list.find(`[data-item-code="${item.item_code || item.name}"]`);
	if (existing_item.length) {
		frappe.show_alert({ message: __('Item {0} already selected', [item.item_name || item.name]), indicator: 'orange' });
		return;
	}
	
	// Create warehouse dropdown
	const warehouse_options = $('<select class="form-control warehouse-select" style="border-radius: 4px; font-size: 12px;"><option value="">Select Warehouse</option></select>');
	
	// Load warehouses
	frappe.call({
		method: 'frappe.client.get_list',
		args: { doctype: 'Warehouse', fields: ['name'], filters: { disabled: 0 }, limit_page_length: 50 },
		callback: r => {
			const warehouses = (r && r.message) || [];
			warehouses.forEach(w => {
				warehouse_options.append('<option value="' + frappe.utils.escape_html(w.name) + '">' + frappe.utils.escape_html(w.name) + '</option>');
			});
		}
	});
	
	const $row = $(
		'<div class="selected-item-row" data-item-code="' + frappe.utils.escape_html(item.item_code || item.name) + '" style="padding: 12px; border-bottom: 1px solid #e5e7eb; display: grid; grid-template-columns: 1fr 100px 120px 120px 120px 200px 80px; gap: 12px; align-items: center;">\
			<div style="font-weight: 500; color: #374151;">' + frappe.utils.escape_html(item.item_name || item.name) + '</div>\
			<div><input type="number" class="form-control qty-input" value="1" min="1" style="border-radius: 4px; font-size: 12px; text-align: center;"></div>\
			<div><input type="number" class="form-control rate-input" value="' + (item.standard_rate || 0) + '" min="0" step="0.01" style="border-radius: 4px; font-size: 12px; text-align: right;"></div>\
			<div><input type="number" class="form-control amount-input" readonly style="border-radius: 4px; font-size: 12px; text-align: right; background: #f9fafb;"></div>\
			<div style="font-size: 12px; color: #6b7280; text-align: center;">' + frappe.utils.escape_html(item.stock_uom || '') + '</div>\
			<div class="warehouse-container"></div>\
			<div><button class="btn btn-danger btn-sm remove-item-btn" style="padding: 4px 8px; font-size: 11px;"><i class="fa fa-trash"></i> Remove</button></div>\
		</div>'
	);
	
	$row.find('.warehouse-container').append(warehouse_options);
	
	// Calculate amount function
	const calculate_amount = () => {
		const qty = parseFloat($row.find('.qty-input').val()) || 0;
		const rate = parseFloat($row.find('.rate-input').val()) || 0;
		const amount = qty * rate;
		$row.find('.amount-input').val(amount.toFixed(2));
	};
	
	// Event handlers for qty and rate changes
	$row.find('.qty-input, .rate-input').on('input', function() {
		calculate_amount();
		if (quotation_section) {
			update_quotation_total(selected_section, quotation_section);
		}
	});
	
	// Initial calculation
	calculate_amount();
	
	// Remove button handler
	$row.find('.remove-item-btn').on('click', function() {
		$row.remove();
		
		// Update quotation section
		if (quotation_section) {
			const remaining_items = selected_section.find('.selected-items-list .selected-item-row').length;
			if (remaining_items === 0) {
				quotation_section.hide();
			} else {
				update_quotation_total(selected_section, quotation_section);
			}
		}
		
		frappe.show_alert({ message: __('Item {0} removed', [item.item_name || item.name]), indicator: 'red' });
	});
	
	$list.append($row);
	
	// Show quotation section when items are selected
	if (quotation_section) {
		quotation_section.show();
		update_quotation_total(selected_section, quotation_section);
	}
	
	frappe.show_alert({ message: __('Item {0} selected', [item.item_name || item.name]), indicator: 'green' });
}

function show_item_selection_modal(target_doctype, source_doc_name, source_doc_data, source_type) {
	const modal = new frappe.ui.Dialog({
		title: __('Create {0} from {1}', [target_doctype, source_doc_name]),
		size: 'extra-large',
		fields: [
			{
				label: __('Items'),
				fieldtype: 'HTML',
				fieldname: 'items_html'
			},
			{
				label: __('Sales Taxes and Charges'),
				fieldtype: 'HTML',
				fieldname: 'taxes_html'
			},
			{
				label: __('Document Options'),
				fieldtype: 'HTML',
				fieldname: 'options_html'
			}
		],
		primary_action_label: __('Create {0}', [target_doctype]),
		primary_action: function(values) {
			create_document_from_selection(target_doctype, source_doc_name, source_doc_data, source_type, modal);
		}
	});
	
	// Build items HTML
	let items_html = '<div class="item-selection-table" style="max-height: 400px; overflow-y: auto;">';
	items_html += '<table class="table table-bordered">';
	items_html += '<thead><tr><th><input type="checkbox" class="select-all-items"> Select All</th><th>Item</th><th>Qty</th><th>Rate</th><th>Amount</th><th>Warehouse</th></tr></thead>';
	items_html += '<tbody>';
	
	if (source_doc_data.items) {
		source_doc_data.items.forEach(function(item, index) {
			const qty = source_type === 'sales_order' ? (item.qty - (item.delivered_qty || 0)) : item.qty;
			const amount = qty * item.rate;
			
			items_html += '<tr data-item-index="' + index + '">';
			items_html += '<td><input type="checkbox" class="item-checkbox" checked></td>';
			items_html += '<td>' + frappe.utils.escape_html(item.item_name || item.item_code) + '</td>';
			items_html += '<td><input type="number" class="form-control item-qty" value="' + qty + '" min="0" step="0.01"></td>';
			items_html += '<td><input type="number" class="form-control item-rate" value="' + item.rate + '" min="0" step="0.01"></td>';
			items_html += '<td><input type="number" class="form-control item-amount" value="' + amount.toFixed(2) + '" readonly style="background: #f9fafb;"></td>';
			items_html += '<td><select class="form-control item-warehouse"><option value="' + (item.warehouse || '') + '">' + (item.warehouse || 'Select Warehouse') + '</option></select></td>';
			items_html += '</tr>';
		});
	}
	
	items_html += '</tbody></table></div>';
	
	// Build taxes HTML
	let taxes_html = '<div class="taxes-section">';
	if (source_doc_data.taxes && source_doc_data.taxes.length > 0) {
		taxes_html += '<div class="alert alert-info">Existing taxes and charges will be copied from source document.</div>';
		taxes_html += '<table class="table table-bordered">';
		taxes_html += '<thead><tr><th>Charge Type</th><th>Account Head</th><th>Rate</th><th>Amount</th></tr></thead>';
		taxes_html += '<tbody>';
		
		source_doc_data.taxes.forEach(function(tax) {
			taxes_html += '<tr>';
			taxes_html += '<td>' + frappe.utils.escape_html(tax.charge_type || '') + '</td>';
			taxes_html += '<td>' + frappe.utils.escape_html(tax.account_head || '') + '</td>';
			taxes_html += '<td>' + frappe.utils.escape_html(tax.rate || '') + '%</td>';
			taxes_html += '<td>' + frappe.utils.escape_html(tax.tax_amount || '') + '</td>';
			taxes_html += '</tr>';
		});
		
		taxes_html += '</tbody></table>';
	} else {
		taxes_html += '<div class="alert alert-warning">No taxes and charges found in source document. You can add them manually after creation.</div>';
	}
	taxes_html += '</div>';
	
	// Build options HTML
	let options_html = '<div class="document-options" style="background: #f8f9fa; padding: 16px; border-radius: 6px; border: 1px solid #e5e7eb;">';
	options_html += '<div class="form-check">';
	options_html += '<input class="form-check-input" type="checkbox" id="submit-document" checked>';
	options_html += '<label class="form-check-label" for="submit-document">';
	options_html += '<strong>Submit document after creation</strong><br>';
	options_html += '<small class="text-muted">Check this to automatically submit the ' + target_doctype + ' after it is created</small>';
	options_html += '</label>';
	options_html += '</div>';
	options_html += '</div>';
	
	modal.fields_dict.items_html.$wrapper.html(items_html);
	modal.fields_dict.taxes_html.$wrapper.html(taxes_html);
	modal.fields_dict.options_html.$wrapper.html(options_html);
	
	// Load warehouses for each item
	load_warehouses_for_modal(modal);
	
	// Add event handlers
	setup_modal_event_handlers(modal);
	
	modal.show();
}

function load_warehouses_for_modal(modal) {
	frappe.call({
		method: 'frappe.client.get_list',
		args: { doctype: 'Warehouse', fields: ['name'], filters: { disabled: 0 }, limit_page_length: 50 },
		callback: r => {
			const warehouses = (r && r.message) || [];
			modal.$wrapper.find('.item-warehouse').each(function() {
				const $select = $(this);
				const current_value = $select.val();
				$select.empty();
				$select.append('<option value="">Select Warehouse</option>');
				warehouses.forEach(w => {
					$select.append('<option value="' + frappe.utils.escape_html(w.name) + '">' + frappe.utils.escape_html(w.name) + '</option>');
				});
				if (current_value) {
					$select.val(current_value);
				}
			});
		}
	});
}

function setup_modal_event_handlers(modal) {
	// Select all checkbox
	modal.$wrapper.find('.select-all-items').on('change', function() {
		const checked = $(this).is(':checked');
		modal.$wrapper.find('.item-checkbox').prop('checked', checked);
	});
	
	// Individual item checkboxes
	modal.$wrapper.find('.item-checkbox').on('change', function() {
		const total_checkboxes = modal.$wrapper.find('.item-checkbox').length;
		const checked_checkboxes = modal.$wrapper.find('.item-checkbox:checked').length;
		modal.$wrapper.find('.select-all-items').prop('checked', total_checkboxes === checked_checkboxes);
	});
	
	// Qty and rate change handlers
	modal.$wrapper.find('.item-qty, .item-rate').on('input', function() {
		const $row = $(this).closest('tr');
		const qty = parseFloat($row.find('.item-qty').val()) || 0;
		const rate = parseFloat($row.find('.item-rate').val()) || 0;
		const amount = qty * rate;
		$row.find('.item-amount').val(amount.toFixed(2));
	});
}

function create_document_from_selection(target_doctype, source_doc_name, source_doc_data, source_type, modal) {
	const selected_items = [];
	
	modal.$wrapper.find('tbody tr').each(function() {
		const $row = $(this);
		if ($row.find('.item-checkbox').is(':checked')) {
			const qty = parseFloat($row.find('.item-qty').val()) || 0;
			const rate = parseFloat($row.find('.item-rate').val()) || 0;
			const warehouse = $row.find('.item-warehouse').val();
			const item_index = $row.attr('data-item-index');
			const source_item = source_doc_data.items[item_index];
			
			if (qty > 0 && rate > 0) {
					const item_payload = {
						item_code: source_item.item_code,
						item_name: source_item.item_name,
						qty: qty,
						rate: rate,
						amount: qty * rate,
						warehouse: warehouse || source_item.warehouse,
						uom: source_item.uom,
						conversion_factor: source_item.conversion_factor,
						description: source_item.description,
						base_rate: source_item.base_rate,
						base_amount: qty * rate
					};

					// Link back to source docs using correct ERPNext field names
					if (source_type === 'quotation' && target_doctype === 'Sales Order') {
						item_payload.against_quotation = source_doc_name;
						// Sales Order Item expects prevdoc references; optional for creation, so we skip strict fields
					}
					if (source_type === 'sales_order' && target_doctype === 'Delivery Note') {
						item_payload.against_sales_order = source_doc_name;
						item_payload.so_detail = source_item.name; // required: link to Sales Order Item
					}

					selected_items.push(item_payload);
			}
		}
	});
	
	if (selected_items.length === 0) {
		frappe.msgprint({
			title: 'Validation Error',
			message: 'Please select at least one item with valid quantity and rate.',
			indicator: 'red'
		});
		return;
	}
	
	// Create document based on target type
	let new_doc = {};
	
	if (target_doctype === 'Sales Order') {
		new_doc = {
			doctype: 'Sales Order',
			customer: source_doc_data.party_name || source_doc_data.customer,
			customer_name: source_doc_data.customer_name,
			company: source_doc_data.company,
			transaction_date: frappe.datetime.get_today(),
			delivery_date: frappe.datetime.add_days(frappe.datetime.get_today(), 7),
			currency: source_doc_data.currency,
			conversion_rate: source_doc_data.conversion_rate,
			selling_price_list: source_doc_data.selling_price_list,
			price_list_currency: source_doc_data.price_list_currency,
			plc_conversion_rate: source_doc_data.plc_conversion_rate,
			items: selected_items
		};
	} else if (target_doctype === 'Delivery Note') {
		new_doc = {
			doctype: 'Delivery Note',
			customer: source_doc_data.customer,
			customer_name: source_doc_data.customer_name,
			company: source_doc_data.company,
			posting_date: frappe.datetime.get_today(),
			currency: source_doc_data.currency,
			conversion_rate: source_doc_data.conversion_rate,
			selling_price_list: source_doc_data.selling_price_list,
			price_list_currency: source_doc_data.price_list_currency,
			plc_conversion_rate: source_doc_data.plc_conversion_rate,
			items: selected_items
		};
	}
	
	// Copy taxes and charges if they exist
	if (source_doc_data.taxes && source_doc_data.taxes.length > 0) {
		new_doc.taxes = source_doc_data.taxes.map(tax => ({
			charge_type: tax.charge_type,
			account_head: tax.account_head,
			description: tax.description,
			rate: tax.rate,
			tax_amount: tax.tax_amount,
			total: tax.total
		}));
	}
	
	const should_submit = modal.$wrapper.find('#submit-document').is(':checked');
	
	frappe.call({
		method: 'frappe.client.insert',
		args: {
			doc: new_doc
		},
		callback: function(response) {
			if (response.message) {
				if (should_submit) {
					// Submit the document after creation
					frappe.call({
						method: 'frappe.client.submit',
						args: {
							doc: response.message
						},
						callback: function(submit_response) {
							frappe.msgprint({
								title: target_doctype + ' Created & Submitted',
								message: target_doctype + ' ' + response.message.name + ' has been created and submitted successfully.',
								indicator: 'green'
							});
							modal.hide();
							refresh_active_tab(cur_page.page);
						},
						error: function(submit_err) {
							frappe.msgprint({
								title: target_doctype + ' Created (Not Submitted)',
								message: target_doctype + ' ' + response.message.name + ' has been created but could not be submitted: ' + (submit_err.message || 'Unknown error'),
								indicator: 'orange'
							});
							modal.hide();
							refresh_active_tab(cur_page.page);
						}
					});
				} else {
					frappe.msgprint({
						title: target_doctype + ' Created',
						message: target_doctype + ' ' + response.message.name + ' has been created successfully.',
						indicator: 'green'
					});
					modal.hide();
					refresh_active_tab(cur_page.page);
				}
			}
		},
		error: function(err) {
			frappe.msgprint({
				title: 'Error',
				message: 'Error creating ' + target_doctype + ': ' + (err.message || 'Unknown error'),
				indicator: 'red'
			});
		}
	});
}

function initialize_quotation_form(quotation_section, selected_section) {
	// Initialize customer field
	const customer_field = quotation_section.find('.customer-field');
	const customer_control = frappe.ui.form.make_control({
		parent: customer_field.get(0),
		df: { label: '', fieldname: 'quotation_customer', fieldtype: 'Link', options: 'Customer', placeholder: __('Select Customer') },
		only_input: true
	});
	customer_control.refresh();
	
	// Initialize price list field
	const price_list_field = quotation_section.find('.price-list-field');
	const price_list_control = frappe.ui.form.make_control({
		parent: price_list_field.get(0),
		df: { label: '', fieldname: 'quotation_price_list', fieldtype: 'Link', options: 'Price List', placeholder: __('Select Price List') },
		only_input: true
	});
	price_list_control.refresh();
	
	// Create quotation button handler
	quotation_section.find('.create-quotation-btn').on('click', function() {
		create_quotation_from_selected_items(quotation_section, selected_section);
	});
}

function update_quotation_total(selected_section, quotation_section) {
	const $rows = selected_section.find('.selected-item-row');
	let total = 0;
	
	$rows.each(function() {
		const amount = parseFloat($(this).find('.amount-input').val()) || 0;
		total += amount;
	});
	
	quotation_section.find('.total-amount').text(total.toFixed(2));
}

function create_quotation_from_selected_items(quotation_section, selected_section) {
	const customer = quotation_section.find('.customer-field input').val();
	const valid_until = quotation_section.find('.valid-until').val();
	const currency = quotation_section.find('.currency-select').val();
	const price_list = quotation_section.find('.price-list-field input').val();
	
	if (!customer) {
		frappe.msgprint({
			title: 'Validation Error',
			message: 'Please select a customer before creating quotation.',
			indicator: 'red'
		});
		return;
	}
	
	const $rows = selected_section.find('.selected-item-row');
	if ($rows.length === 0) {
		frappe.msgprint({
			title: 'Validation Error',
			message: 'Please select at least one item before creating quotation.',
			indicator: 'red'
		});
		return;
	}
	
	frappe.confirm(
		'Create quotation with ' + $rows.length + ' items?',
		function() {
			const quotation = {
				doctype: 'Quotation',
				party_name: customer,
				valid_till: valid_until,
				currency: currency,
				selling_price_list: price_list || 'Standard Selling',
				items: []
			};
			
			$rows.each(function() {
				const $row = $(this);
				const item_code = $row.attr('data-item-code');
				const qty = parseFloat($row.find('.qty-input').val()) || 0;
				const rate = parseFloat($row.find('.rate-input').val()) || 0;
				const warehouse = $row.find('.warehouse-select').val();
				
				if (qty > 0 && rate > 0) {
					quotation.items.push({
						item_code: item_code,
						qty: qty,
						rate: rate,
						amount: qty * rate,
						warehouse: warehouse
					});
				}
			});
			
			if (quotation.items.length === 0) {
				frappe.msgprint({
					title: 'Validation Error',
					message: 'No valid items found. Please check quantity and rate values.',
					indicator: 'red'
				});
				return;
			}
			
			frappe.call({
				method: 'frappe.client.insert',
				args: {
					doc: quotation
				},
				callback: function(response) {
					if (response.message) {
						// Submit the quotation after creation
						frappe.call({
							method: 'frappe.client.submit',
						args: {
							doc: response.message
						},
							callback: function(submit_response) {
								frappe.msgprint({
									title: 'Quotation Created & Submitted',
									message: 'Quotation ' + response.message.name + ' has been created and submitted successfully.',
									indicator: 'green'
								});
								
								// Clear selected items and hide quotation section
								selected_section.find('.selected-items-list').empty();
								quotation_section.hide();
								refresh_active_tab(cur_page.page);
							},
							error: function(submit_err) {
								frappe.msgprint({
									title: 'Quotation Created (Not Submitted)',
									message: 'Quotation ' + response.message.name + ' has been created but could not be submitted: ' + (submit_err.message || 'Unknown error'),
									indicator: 'orange'
								});
								
								// Clear selected items and hide quotation section
								selected_section.find('.selected-items-list').empty();
								quotation_section.hide();
								refresh_active_tab(cur_page.page);
							}
						});
					}
				},
				error: function(err) {
					frappe.msgprint({
						title: 'Error',
						message: 'Error creating quotation: ' + (err.message || 'Unknown error'),
						indicator: 'red'
					});
				}
			});
		}
	);
}

function create_delivery_note_from_order(order_name) {
	frappe.call({
		method: 'frappe.client.get',
		args: {
			doctype: 'Sales Order',
			name: order_name
		},
		callback: function(r) {
			if (r.message) {
				show_item_selection_modal('Delivery Note', order_name, r.message, 'sales_order');
			}
		},
		error: function(err) {
			frappe.msgprint({
				title: 'Error',
				message: 'Error fetching sales order details: ' + (err.message || 'Unknown error'),
				indicator: 'red'
			});
		}
	});
}

function create_sales_order_from_quotation(quotation_name) {
	frappe.call({
		method: 'frappe.client.get',
		args: {
			doctype: 'Quotation',
			name: quotation_name
		},
		callback: function(r) {
			if (r.message) {
				show_item_selection_modal('Sales Order', quotation_name, r.message, 'quotation');
			}
		},
		error: function(err) {
			frappe.msgprint({
				title: 'Error',
				message: 'Error fetching quotation details: ' + (err.message || 'Unknown error'),
				indicator: 'red'
			});
		}
	});
}

function create_sales_return(invoice_name) {
	const dialog = new frappe.ui.Dialog({
		title: __('Create Return Invoice'),
		fields: [
			{
				label: __('Confirm'),
				fieldtype: 'HTML',
				fieldname: 'confirm_html'
			},
			{
				label: __('Options'),
				fieldtype: 'HTML',
				fieldname: 'options_html'
			}
		],
		primary_action_label: __('Create Return Invoice'),
		primary_action: function(values) {
			const should_submit = dialog.$wrapper.find('#submit-return').is(':checked');
			create_return_invoice(invoice_name, should_submit);
			dialog.hide();
		}
	});
	
	// Build confirm HTML
	let confirm_html = '<div class="alert alert-info">';
	confirm_html += '<strong>Create Return Invoice</strong><br>';
	confirm_html += 'This will create a return invoice for ' + invoice_name + ' with negative quantities.';
	confirm_html += '</div>';
	
	// Build options HTML
	let options_html = '<div class="document-options" style="background: #f8f9fa; padding: 16px; border-radius: 6px; border: 1px solid #e5e7eb;">';
	options_html += '<div class="form-check">';
	options_html += '<input class="form-check-input" type="checkbox" id="submit-return" checked>';
	options_html += '<label class="form-check-label" for="submit-return">';
	options_html += '<strong>Submit return invoice after creation</strong><br>';
	options_html += '<small class="text-muted">Check this to automatically submit the return invoice after it is created</small>';
	options_html += '</label>';
	options_html += '</div>';
	options_html += '</div>';
	
	dialog.fields_dict.confirm_html.$wrapper.html(confirm_html);
	dialog.fields_dict.options_html.$wrapper.html(options_html);
	
	dialog.show();
}

function create_return_invoice(invoice_name, should_submit) {
	frappe.call({
		method: 'frappe.client.get',
		args: {
			doctype: 'Sales Invoice',
			name: invoice_name
		},
		callback: function(r) {
			if (r.message) {
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

				if (r.message.items) {
					r.message.items.forEach(function(item) {
						return_invoice.items.push({
							item_code: item.item_code,
							item_name: item.item_name,
							qty: -Math.abs(item.qty),
							rate: item.rate,
							amount: -Math.abs(item.amount),
							warehouse: item.warehouse,
							uom: item.uom,
							conversion_factor: item.conversion_factor,
							description: item.description,
							base_rate: item.base_rate,
							base_amount: -Math.abs(item.base_amount),
							against_sales_invoice: invoice_name,
							against_sales_invoice_item: item.name
						});
					});
				}

				frappe.call({
					method: 'frappe.client.insert',
					args: {
						doc: return_invoice
					},
					callback: function(response) {
						if (response.message) {
							if (should_submit) {
								// Submit the return invoice after creation
								frappe.call({
									method: 'frappe.client.submit',
									args: {
										doc: response.message
									},
									callback: function(submit_response) {
										frappe.msgprint({
											title: 'Return Invoice Created & Submitted',
											message: 'Return invoice ' + response.message.name + ' has been created and submitted successfully.',
											indicator: 'green'
										});
										refresh_active_tab(cur_page.page);
									},
									error: function(submit_err) {
										frappe.msgprint({
											title: 'Return Invoice Created (Not Submitted)',
											message: 'Return invoice ' + response.message.name + ' has been created but could not be submitted: ' + (submit_err.message || 'Unknown error'),
											indicator: 'orange'
										});
										refresh_active_tab(cur_page.page);
									}
								});
							} else {
								frappe.msgprint({
									title: 'Return Invoice Created',
									message: 'Return invoice ' + response.message.name + ' has been created successfully.',
									indicator: 'green'
								});
								refresh_active_tab(cur_page.page);
							}
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
