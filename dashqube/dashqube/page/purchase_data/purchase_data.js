frappe.pages['purchase-data'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Purchase Transactions',
		single_column: true
	});

	setup_purchase_data_page(page);
}

function setup_purchase_data_page(page) {
	page.clear_menu();
	page.set_primary_action(__('Refresh'), () => {
		refresh_active_tab(page);
	});

	const tabs = make_tabs(page);

	// Neutral, minimal styles
	const style = $('<style>\
		.purchase-data-tabs .nav-tabs { margin-bottom: 8px; border-bottom: 1px solid #e5e7eb; }\
		.purchase-data-tabs .nav-link { color: #374151; font-weight: 500; border: none; padding: 8px 12px; margin-right: 4px; border-radius: 6px 6px 0 0; }\
		.purchase-data-tabs .nav-link:hover { background: #f3f4f6; }\
		.purchase-data-tabs .nav-link.active { background: #2563eb; color: #fff; }\
		.pd-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; }\
		.pd-header { display: flex; gap: 8px; align-items: center; justify-content: space-between; }\
		.pd-header .pd-search { flex: 1 1 auto; max-width: 560px; }\
		.pd-list { margin-top: 8px; }\
		.pd-row { display: flex; justify-content: space-between; gap: 16px; padding: 10px 4px; border-bottom: 1px solid #e5e7eb; cursor: pointer; }\
		.pd-row:last-child { border-bottom: 0; }\
		.pd-title { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\
		.pd-sub { color: #6b7280; font-size: 12px; white-space: nowrap; }\
		.pd-right { text-align: right; min-width: 160px; }\
		.pd-badge { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 11px; background: #f3f4f6; color: #374151; }\
		.btn-primary { background: #2563eb; border: 1px solid #1d4ed8; color: #fff; }\
		.btn-default { background: #f9fafb; border: 1px solid #e5e7eb; }\
		.btn-danger { background: #dc2626; border: 1px solid #b91c1c; color: #fff; }\
		.table thead th { background: #f3f4f6; }\
		.pd-badge[data-status="Submitted"] { background: #d1fae5; color: #065f46; }\
		.pd-badge[data-status="Draft"] { background: #e5e7eb; color: #4b5563; }\
		.pd-badge[data-status="Unpaid"] { background: #fee2e2; color: #991b1b; }\
		.pd-badge[data-status="Open"] { background: #dbeafe; color: #1e40af; }\
		.pd-badge[data-status="To Receive"] { background: #fef3c7; color: #92400e; }\
		.pd-badge[data-status="To Receive and Bill"] { background: #fed7aa; color: #9a3412; }\
		.pd-badge[data-status="To Bill"] { background: #fef3c7; color: #92400e; }\
		.pd-badge[data-status="Completed"] { background: #d1fae5; color: #065f46; }\
		.pd-badge[data-status="Cancelled"] { background: #fee2e2; color: #991b1b; }\
		.pd-badge[data-status="Closed"] { background: #e5e7eb; color: #4b5563; }\
		.pd-badge[data-status="Paid"] { background: #d1fae5; color: #065f46; }\
		.pd-badge[data-status="Partly Paid"] { background: #fef3c7; color: #92400e; }\
		.pd-badge[data-status="Overdue"] { background: #fee2e2; color: #991b1b; }\
	</style>');
	$(page.body).prepend(style);

	// Add per-tab solid active colors (no gradients)
	const style2 = $('<style>\
		.purchase-data-tabs .nav-link.active[data-target="#pd-rfq"] { background: #059669; color: #fff; }\
		.purchase-data-tabs .nav-link.active[data-target="#pd-sq"] { background: #7c3aed; color: #fff; }\
		.purchase-data-tabs .nav-link.active[data-target="#pd-po"] { background: #2563eb; color: #fff; }\
		.purchase-data-tabs .nav-link.active[data-target="#pd-pr"] { background: #1f2937; color: #fff; }\
		.purchase-data-tabs .nav-link.active[data-target="#pd-pi"] { background: #b91c1c; color: #fff; }\
	</style>');
	$(page.body).prepend(style2);

	render_tab_body(page, tabs, 'Request for Quotation');

	// refresh when page is shown again
	page.wrapper.on('show', () => refresh_active_tab(page));
}

function make_tabs(page) {
	const tab_html = $(
		'<div class="purchase-data-tabs">\
			<ul class="nav nav-tabs" role="tablist">\
				<li class="nav-item">\
					<button type="button" class="nav-link active" data-target="#pd-rfq" role="tab" aria-selected="true">' + __('Request for Quotation') + '</button>\
				</li>\
				<li class="nav-item">\
					<button type="button" class="nav-link" data-target="#pd-sq" role="tab" aria-selected="false">' + __('Supplier Quotation') + '</button>\
				</li>\
				<li class="nav-item">\
					<button type="button" class="nav-link" data-target="#pd-po" role="tab" aria-selected="false">' + __('Purchase Order') + '</button>\
				</li>\
				<li class="nav-item">\
					<button type="button" class="nav-link" data-target="#pd-pr" role="tab" aria-selected="false">' + __('Purchase Receipt') + '</button>\
				</li>\
				<li class="nav-item">\
					<button type="button" class="nav-link" data-target="#pd-pi" role="tab" aria-selected="false">' + __('Purchase Invoice') + '</button>\
				</li>\
			</ul>\
			<div class="tab-content" style="padding-top: 12px;">\
				<div class="tab-pane active" id="pd-rfq" role="tabpanel"></div>\
				<div class="tab-pane" id="pd-sq" role="tabpanel"></div>\
				<div class="tab-pane" id="pd-po" role="tabpanel"></div>\
				<div class="tab-pane" id="pd-pr" role="tabpanel"></div>\
				<div class="tab-pane" id="pd-pi" role="tabpanel"></div>\
			</div>\
		</div>'
	);

	$(page.body).empty().append(tab_html);

	// bind tab change via buttons (no hashes to avoid router)
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
		'Purchase Order': 'Purchase Order',
		'Purchase Receipt': 'Purchase Receipt',
		'Purchase Invoice': 'Purchase Invoice',
		'Request for Quotation': 'Request for Quotation',
		'Supplier Quotation': 'Supplier Quotation'
	};

	const pane_id = label === 'Request for Quotation' ? '#pd-rfq' : (label === 'Supplier Quotation' ? '#pd-sq' : (label === 'Purchase Order' ? '#pd-po' : (label === 'Purchase Receipt' ? '#pd-pr' : '#pd-pi')));
	const $pane = tabs_wrapper.find(pane_id);
	$pane.empty();

	const header = $(
		'<div class="pd-card pd-header">\
			<div class="pd-search" style="min-width:260px"></div>\
			<button class="btn btn-primary">' + __('New') + ' ' + __(label) + '</button>\
		</div>'
	);
	const item_selector = $('<div class="pd-card" style="margin-top:12px"><div class="pd-items-header d-flex" style="gap:12px; align-items:center; flex-wrap:wrap; background: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 16px;">\
		<div class="h6 mb-0" style="margin-right:auto; color: #111827; font-weight: 600;">' + __('All Items') + '</div>\
		<input type="text" class="form-control pd-item-search" placeholder="' + __('Search by item code, serial number or barcode') + '" style="max-width:360px; border-radius: 6px;">\
		<select class="form-control pd-item-group" style="max-width:240px; border-radius: 6px;"><option value="">' + __('Select item group') + '</option></select>\
	</div>\
	<div class="pd-item-grid" style="margin-top:10px"></div></div>');

	const list = $('<div class="pd-card pd-list result-list"></div>');
	$pane.append(header).append(list);
	$pane.prepend(item_selector);

	// Build header filters based on tab
	const new_btn = header.find('button');
	let supplier_control = null;
	if (label === 'Request for Quotation') {
		// RFQ: Company + Supplier filters
		const wrap = $('<div class="d-flex" style="gap:8px; width:100%"></div>');
		header.find('.pd-search').append(wrap);
		const company_placeholder = $('<div style="min-width:200px"></div>').appendTo(wrap);
		const supplier_placeholder = $('<div style="min-width:220px"></div>').appendTo(wrap);
		const company_control = frappe.ui.form.make_control({
			parent: company_placeholder.get(0),
			df: { label: __('Company'), fieldname: 'company_filter', fieldtype: 'Link', options: 'Company', placeholder: __('Select Company') },
			only_input: false
		});
		company_control.refresh();
		supplier_control = frappe.ui.form.make_control({
			parent: supplier_placeholder.get(0),
			df: { label: __('Supplier'), fieldname: 'supplier_filter', fieldtype: 'Link', options: 'Supplier', placeholder: __('Select Supplier') },
			only_input: false
		});
		supplier_control.refresh();
		// remove default New button for RFQ (we use Create RFQ)
		new_btn.remove();
		const apply_filters = () => {
			list.data('rfq_company', company_control.get_value ? company_control.get_value() : '');
			trigger_search();
		};
		$(company_control.$input).on('change', apply_filters);
	} else {
		// Supplier Link control for other tabs
		const supplier_placeholder = header.find('.pd-search');
		supplier_control = frappe.ui.form.make_control({
			parent: supplier_placeholder.get(0),
			df: { label: __('Supplier'), fieldname: 'supplier_filter', fieldtype: 'Link', options: 'Supplier', placeholder: __('Select Supplier') },
			only_input: false
		});
		supplier_control.refresh();
	}

	new_btn.on('click', () => create_doc_inline(doctype_map[label], () => trigger_search()));

	let search_timer = null;
	const trigger_search = () => {
		const supplier = supplier_control && supplier_control.get_value ? supplier_control.get_value() : '';
		load_docs_into(list, doctype_map[label], supplier, label);
	};

	// trigger on change of supplier link
	if (supplier_control && supplier_control.$input) {
		$(supplier_control.$input).on('change', () => { if (search_timer) clearTimeout(search_timer); search_timer = setTimeout(trigger_search, 50); });
	}

	// initial load
	trigger_search();

	// Selected Items box for RFQ and SQ
	let $selectedBox = null;
	if (label === 'Request for Quotation' || label === 'Supplier Quotation') {
		$selectedBox = $('<div class="pd-card" style="margin-top:8px"><div class="h6" style="margin-bottom:8px">' + __('Selected Items') + '</div><div class="table-responsive"><table class="table table-bordered table-sm"><thead><tr><th>' + __('Item') + '</th><th class="text-right">' + __('Qty') + '</th><th class="text-right">' + __('Warehouse') + '</th><th></th></tr></thead><tbody class="pd-sel-body"><tr class="pd-empty"><td colspan="4" class="text-center text-muted">' + __('No items selected') + '</td></tr></tbody></table></div></div>');
		$pane.append($selectedBox);
	}

	// Selected Suppliers box for RFQ
	let $suppliersBox = null;
	if (label === 'Request for Quotation') {
		$suppliersBox = $('<div class="pd-card" style="margin-top:8px"><div class="h6" style="margin-bottom:8px">' + __('Selected Suppliers') + '</div><div class="table-responsive"><table class="table table-bordered table-sm"><thead><tr><th>' + __('Supplier') + '</th><th></th></tr></thead><tbody class="pd-sup-body"><tr class="pd-empty"><td colspan="2" class="text-center text-muted">' + __('No suppliers selected') + '</td></tr></tbody></table></div></div>');
		$pane.append($suppliersBox);
		const addSupplier = (name) => {
			const tbody = $suppliersBox.find('.pd-sup-body');
			if (!name) return;
			if (tbody.find('tr[data-supplier="' + frappe.utils.escape_html(name) + '"]').length) return;
			$suppliersBox.find('.pd-empty').remove();
			const appendRow = (label) => {
				const tr = $('<tr data-supplier="' + frappe.utils.escape_html(name) + '"><td>' + frappe.utils.escape_html(label || name) + '</td><td class="text-right"><button class="btn btn-xs btn-danger">' + __('Remove') + '</button></td></tr>');
				tr.find('button').on('click', () => { tr.remove(); if (!tbody.find('tr').length) tbody.append('<tr class="pd-empty"><td colspan="2" class="text-center text-muted">' + __('No suppliers selected') + '</td></tr>'); });
				tbody.append(tr);
			};
			// fetch supplier_name and display
			frappe.call({ method: 'frappe.client.get_value', args: { doctype: 'Supplier', filters: { name }, fieldname: 'supplier_name' }, callback: (r) => {
				const label = (r && r.message && (r.message.supplier_name || r.message[0] && r.message[0].supplier_name)) || name;
				appendRow(label);
			}});
		};
		// when supplier control changes, add to table (do not trigger search)
		$(supplier_control.$input).on('awesomplete-selectcomplete change', () => { addSupplier(supplier_control.get_value && supplier_control.get_value()); });
	}

	const add_to_selected = (item) => {
		if (!$selectedBox) return;
		const tbody = $selectedBox.find('.pd-sel-body');
		const existing = tbody.find('tr[data-code="' + frappe.utils.escape_html(item.name) + '"]');
		if (existing.length) {
			const qtyInput = existing.find('input');
			qtyInput.val(parseFloat(qtyInput.val() || '0') + 1).trigger('input');
			return;
		}
		$selectedBox.find('.pd-empty').remove();
		const row = $('<tr data-code="' + frappe.utils.escape_html(item.name) + '"><td>' + frappe.utils.escape_html(item.item_name || item.name) + '</td><td class="text-right"><input type="number" step="1" min="1" value="1" class="form-control input-sm" style="max-width:100px; margin-left:auto"></td><td class="text-right" style="min-width:220px"><div class="pd-warehouse"></div></td><td class="text-right"><button class="btn btn-xs btn-danger">' + __('Remove') + '</button></td></tr>');
		// attach default UOM on row for RFQ items
		row.attr('data-uom', (item.stock_uom || item.uom || 'Nos'));
		// create Warehouse Link control
		const whParent = row.find('.pd-warehouse').get(0);
		let whCtrl = null;
		if (whParent) {
			whCtrl = frappe.ui.form.make_control({ parent: whParent, df: { label: __('Warehouse'), fieldname: 'warehouse', fieldtype: 'Link', options: 'Warehouse', placeholder: __('Select Warehouse') }, only_input: false });
			whCtrl.refresh();
			// set default warehouse if available
			const get_default = (key) => (frappe.defaults && frappe.defaults.get_default) ? frappe.defaults.get_default(key) : null;
			const default_warehouse = get_default('default_warehouse');
			if (default_warehouse && whCtrl.set_value) {
				whCtrl.set_value(default_warehouse);
			}
		}
		row.data('warehouse_ctrl', whCtrl);
		row.find('button').on('click', () => { row.remove(); if (!tbody.find('tr').length) tbody.append('<tr class="pd-empty"><td colspan="4" class="text-center text-muted">' + __('No items selected') + '</td></tr>'); });
		tbody.append(row);
	};

	// initialize item selector
	initialize_item_selector(item_selector, (it) => {
		if (doctype_map[label] === 'Purchase Order') {
			let $create = $pane.find('.pd-create');
			if (!$create.length) {
				$create = $('<div class="pd-card pd-create" style="margin-top:8px;"></div>').appendTo($pane);
			}
			show_purchase_create_box($create, doctype_map[label]);
			purchase_add_item($create, it);
		} else {
			add_to_selected(it);
		}
	});

	// RFQ Create button
	if (label === 'Request for Quotation') {
		const createRfqBtn = $('<button class="btn btn-primary" style="margin-left:8px">' + __('Create Request for Quotation') + '</button>');
		header.append(createRfqBtn);
		createRfqBtn.on('click', () => {
			const suppliers = ($suppliersBox && $suppliersBox.find('.pd-sup-body tr[data-supplier]')).map((i, el) => ({ supplier: $(el).attr('data-supplier') })).get();
			const items = ($selectedBox && $selectedBox.find('.pd-sel-body tr[data-code]')).map((i, el) => {
				const warehouse = (($(el).data('warehouse_ctrl') && $(el).data('warehouse_ctrl').get_value) ? $(el).data('warehouse_ctrl').get_value() : '') || '';
				return {
					item_code: $(el).attr('data-code'),
					qty: parseFloat($(el).find('input').val() || '1') || 1,
					warehouse: warehouse || undefined
				};
			}).get();
			if (!suppliers.length) { frappe.msgprint(__('Please select at least one Supplier')); return; }
			if (!items.length) { frappe.msgprint(__('Please select at least one Item')); return; }
			const company = list.data('rfq_company') || null;
			const get_default = (key) => (frappe.defaults && frappe.defaults.get_default) ? frappe.defaults.get_default(key) : null;
			const default_warehouse_global = get_default('default_warehouse') || undefined;
			const rfq_doc = {
				doctype: 'Request for Quotation',
				company: company || undefined,
				suppliers: suppliers.map((s, idx) => ({ supplier: s.supplier, idx: idx + 1 })),
				message_for_supplier: __('Please quote as per the list below.'),
				items: items.map(it => ({ 
					item_code: it.item_code, 
					qty: it.qty, 
					rate: 0, // Default rate for RFQ
					amount: 0, // Will be calculated as rate * qty
					schedule_date: frappe.datetime.get_today(), 
					warehouse: it.warehouse || default_warehouse_global, 
					conversion_factor: 1, 
					uom: ($selectedBox.find('tr[data-code="' + it.item_code.replace(/["\\]/g, '\\$&') + '"]').attr('data-uom') || 'Nos') 
				}))
			};
			frappe.call({
				method: 'frappe.client.insert',
				args: { doc: rfq_doc },
				freeze: true,
				callback: (r) => {
					if (r && r.message) {
						const created_rfq = r.message;
						// Ask if user wants to submit the RFQ
						const d = new frappe.ui.Dialog({
							title: __('RFQ Created'),
							size: 'small'
						});
						d.$body.append($('<div class="text-center" style="padding: 20px;">\
							<div class="mb-3">' + __('Request for Quotation {0} has been created.', [created_rfq.name]) + '</div>\
							<div class="mb-3">' + __('Would you like to submit it?') + '</div>\
						</div>'));
						d.set_primary_action(__('Submit RFQ'), () => {
							frappe.call({
								method: 'frappe.client.submit',
								args: { doc: created_rfq },
								freeze: true,
								callback: (s) => {
									const submitted_rfq = (s && s.message) ? s.message : created_rfq;
									frappe.show_alert({ message: __('RFQ {0} submitted', [submitted_rfq.name]), indicator: 'green' });
									d.hide();
									// Show Create Supplier Quotation option
									show_create_sq_option(submitted_rfq);
								},
								error: (err) => {
									frappe.msgprint({ title: __('Error'), message: __('Error submitting RFQ: {0}', [err.message || 'Unknown error']), indicator: 'red' });
								}
							});
						});
						d.set_secondary_action(__('Cancel'), () => {
							frappe.show_alert({ message: __('RFQ {0} created (not submitted)', [created_rfq.name]), indicator: 'orange' });
							d.hide();
						});
						d.show();
						// clear selections
						if ($selectedBox) $selectedBox.find('.pd-sel-body').empty().append('<tr class="pd-empty"><td colspan="4" class="text-center text-muted">' + __('No items selected') + '</td></tr>');
						if ($suppliersBox) $suppliersBox.find('.pd-sup-body').empty().append('<tr class="pd-empty"><td colspan="2" class="text-center text-muted">' + __('No suppliers selected') + '</td></tr>');
						refresh_active_tab(cur_page.page);
					}
				}
			});
		});
	}

	// Supplier Quotation Create button
	if (label === 'Supplier Quotation') {
		const createSqBtn = $('<button class="btn btn-primary" style="margin-left:8px">' + __('Create Supplier Quotation') + '</button>');
		header.append(createSqBtn);
		createSqBtn.on('click', () => {
			// Show dialog to create Supplier Quotation manually
			const d = new frappe.ui.Dialog({
				title: __('Create Supplier Quotation'),
				size: 'large'
			});
			
			// Supplier selection
			const supplier_group = $('<div class="form-group"></div>');
			supplier_group.append('<label>' + __('Supplier') + ' <span class="text-danger">*</span></label>');
			const supplier_sel = $('<select class="form-control" required></select>');
			supplier_group.append(supplier_sel);
			d.$body.append(supplier_group);
			
			// Load suppliers
			frappe.call({
				method: 'frappe.client.get_list',
				args: { doctype: 'Supplier', fields: ['name', 'supplier_name'], limit_page_length: 100 },
				callback: (r) => {
					const suppliers = (r && r.message) || [];
					suppliers.forEach(s => {
						supplier_sel.append('<option value="' + frappe.utils.escape_html(s.name) + '">' + frappe.utils.escape_html(s.supplier_name || s.name) + '</option>');
					});
				}
			});
			
			// Items table
			const items_table = $('<div class="table-responsive" style="margin-top:16px"><table class="table table-bordered table-sm"><thead><tr><th>' + __('Item') + '</th><th class="text-right">' + __('Qty') + '</th><th class="text-right">' + __('UOM') + '</th><th class="text-right">' + __('Rate') + '</th><th class="text-right">' + __('Amount') + '</th><th></th></tr></thead><tbody class="sq-create-items-tbody"></tbody></table></div>');
			d.$body.append(items_table);
			
			// Add item button
			const add_item_btn = $('<button type="button" class="btn btn-sm btn-default">' + __('Add Item') + '</button>');
			d.$body.append($('<div style="margin-top:8px"></div>').append(add_item_btn));
			
			const tbody = items_table.find('.sq-create-items-tbody');
			let item_count = 0;
			
			// Add item functionality
			const add_item_row = () => {
				const row = $('<tr data-item-id="' + item_count + '">\
					<td><select class="form-control input-sm sq-item-select"></select></td>\
					<td class="text-right"><input type="number" step="1" min="1" class="form-control input-sm sq-qty" value="1" style="max-width:100px; margin-left:auto"></td>\
					<td class="text-right"><input type="text" class="form-control input-sm sq-uom" value="Nos" style="max-width:80px; margin-left:auto"></td>\
					<td class="text-right"><input type="number" step="0.01" min="0" class="form-control input-sm sq-rate" value="0" style="max-width:120px; margin-left:auto"></td>\
					<td class="text-right sq-amount">0.00</td>\
					<td class="text-right"><button type="button" class="btn btn-xs btn-danger sq-remove">' + __('Remove') + '</button></td>\
				</tr>');
				
				// Load items for dropdown
				frappe.call({
					method: 'frappe.client.get_list',
					args: { doctype: 'Item', fields: ['name', 'item_name', 'stock_uom'], filters: { disabled: 0 }, limit_page_length: 100 },
					callback: (r) => {
						const items = (r && r.message) || [];
						const select = row.find('.sq-item-select');
						select.append('<option value="">' + __('Select Item') + '</option>');
						items.forEach(item => {
							select.append('<option value="' + frappe.utils.escape_html(item.name) + '" data-uom="' + frappe.utils.escape_html(item.stock_uom || 'Nos') + '">' + frappe.utils.escape_html(item.item_name || item.name) + '</option>');
						});
					}
				});
				
				// Item selection change
				row.find('.sq-item-select').on('change', function() {
					const option = $(this).find('option:selected');
					const uom = option.data('uom') || 'Nos';
					row.find('.sq-uom').val(uom);
				});
				
				// Calculate amount when rate or qty changes
				row.find('.sq-rate, .sq-qty').on('input', function() {
					const rate = parseFloat(row.find('.sq-rate').val()) || 0;
					const qty = parseFloat(row.find('.sq-qty').val()) || 1;
					const amount = rate * qty;
					row.find('.sq-amount').text(amount.toFixed(2));
				});
				
				// Remove button
				row.find('.sq-remove').on('click', () => row.remove());
				
				tbody.append(row);
				item_count++;
			};
			
			add_item_btn.on('click', add_item_row);
			
			// Add one initial row
			add_item_row();
			
			d.set_primary_action(__('Create'), () => {
				const supplier = supplier_sel.val();
				if (!supplier) { frappe.msgprint(__('Please select a Supplier')); return; }
				
				const sq_items = [];
				tbody.find('tr').each(function() {
					const $row = $(this);
					const item_code = $row.find('.sq-item-select').val();
					if (!item_code) return;
					
					const qty = parseFloat($row.find('.sq-qty').val()) || 1;
					const rate = parseFloat($row.find('.sq-rate').val()) || 0;
					const uom = $row.find('.sq-uom').val() || 'Nos';
					
					sq_items.push({
						item_code: item_code,
						qty: qty,
						rate: rate,
						amount: rate * qty,
						uom: uom
					});
				});
				
				if (!sq_items.length) { frappe.msgprint(__('Please add at least one item')); return; }
				
				const sq_doc = {
					doctype: 'Supplier Quotation',
					supplier: supplier,
					company: frappe.defaults.get_default('company'),
					transaction_date: frappe.datetime.get_today(),
					items: sq_items
				};
				
				frappe.call({
					method: 'frappe.client.insert',
					args: { doc: sq_doc },
					freeze: true,
					callback: (r) => {
						if (r && r.message) {
							frappe.show_alert({ message: __('Supplier Quotation {0} created', [r.message.name]), indicator: 'green' });
							d.hide();
							refresh_active_tab(cur_page.page);
						}
					}
				});
			});
			
			d.show();
		});
	}
}

function load_docs_into(container, doctype, supplier_name, label_for_logic) {
	container.empty().append($('<div class="text-muted">' + __('Loading...') + '</div>'));

	const filters = [];
	// Only apply supplier filter to PO/PR/PI and Supplier Quotation
	const apply_supplier = (label_for_logic !== 'Request for Quotation') && supplier_name;
	if (apply_supplier) {
		filters.push([doctype, 'supplier', '=', supplier_name]);
	}

	// RFQ additional filters from header
	if (label_for_logic === 'Request for Quotation') {
		const rfq_company = container.data('rfq_company') || '';
		if (rfq_company) filters.push(['Request for Quotation', 'company', '=', rfq_company]);
	}

	// fields per doctype
	let fields = ['name', 'status', 'modified'];
	if (doctype === 'Purchase Order' || doctype === 'Purchase Receipt' || doctype === 'Purchase Invoice') {
		fields = ['name', 'supplier', 'posting_date', 'status', 'grand_total', 'currency'];
	} else if (doctype === 'Supplier Quotation') {
		fields = ['name', 'supplier', 'transaction_date', 'status', 'grand_total', 'currency'];
	} else if (doctype === 'Request for Quotation') {
		fields = ['name', 'transaction_date', 'status'];
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
		const party = row.supplier || '';
		const date = row.posting_date || '';
		const status = row.status || '';
		const total = (row.grand_total != null ? format_currency(row.grand_total, row.currency) : '');

		const $card = $(
			'<div class="pd-row">\
				<div class="pd-left">\
					<div class="pd-title">' + frappe.utils.escape_html(title) + '</div>\
					<div class="pd-sub">' + frappe.utils.escape_html(party) + (date ? (' • ' + frappe.datetime.str_to_user(date)) : '') + '</div>\
				</div>\
				<div class="pd-right">\
					<div>' + (total || '') + '</div>\
					<div class="pd-badge" data-status="' + frappe.utils.escape_html(status) + '">' + frappe.utils.escape_html(status) + '</div>\
				</div>\
			</div>'
		);

		$card.on('click', () => open_doc_preview_dialog(doctype, row.name));
		container.append($card);
	});
}

function refresh_active_tab(page) {
	const active_link = $(page.body).find('.nav-link.active');
	const label = active_link.length ? active_link.text().trim() : 'Request for Quotation';
	const doctype_map = {
		'Purchase Order': 'Purchase Order',
		'Purchase Receipt': 'Purchase Receipt',
		'Purchase Invoice': 'Purchase Invoice',
		'Request for Quotation': 'Request for Quotation',
		'Supplier Quotation': 'Supplier Quotation'
	};

	const pane_id = label === 'Request for Quotation' ? '#pd-rfq' : (label === 'Supplier Quotation' ? '#pd-sq' : (label === 'Purchase Order' ? '#pd-po' : (label === 'Purchase Receipt' ? '#pd-pr' : '#pd-pi')));
	const $pane = $(page.body).find(pane_id);
	const list = $pane.find('.result-list');
	if (list.length) {
		const doctype = label;
		load_docs_into(list, doctype, ($pane.find('input').val() || '').trim(), label);
	}
}

function initialize_item_selector(wrapper, on_select) {
	// Enhanced styles for item grid with modern colors
	if (!$(document).data('pd-item-grid-styles')) {
		const s = $('<style>\
		.pd-item-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; padding: 16px 0; }\
		.pd-item-card { border: 2px solid #e0e0e0; border-radius: 12px; padding: 16px; background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }\
		.pd-item-card:hover { border-color: #1976d2; background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); transform: translateY(-4px) scale(1.02); box-shadow: 0 8px 25px rgba(25, 118, 210, 0.15); }\
		.pd-item-img { width: 100%; height: 120px; border-radius: 8px; background: linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%); display:flex; align-items:center; justify-content:center; overflow:hidden; border: 1px solid #e0e0e0; }\
		.pd-item-img img { max-width: 100%; max-height: 100%; object-fit: contain; }\
		.pd-item-img span { font-size: 48px; font-weight: bold; color: #1976d2; text-shadow: 0 2px 4px rgba(0,0,0,0.1); }\
		.pd-item-title { margin-top: 12px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #2c3e50; font-size: 14px; }\
		.pd-item-sub { color: #7f8c8d; font-size: 12px; margin-top: 4px; }\
		.pd-item-selected { background: linear-gradient(135deg, #c8e6c9 0%, #e8f5e8 100%); color: #2e7d32; padding: 8px 12px; border-radius: 8px; font-weight: 500; border: 1px solid #a5d6a7; }\
		</style>');
		$('head').append(s);
		$(document).data('pd-item-grid-styles', true);
	}

	const $grid = wrapper.find('.pd-item-grid');
	// selected item indicator (shown below grid)
	let $selected = wrapper.find('.pd-item-selected');
	if (!$selected.length) {
		$selected = $('<div class="pd-item-selected text-muted" style="margin-top:6px; display:none"></div>');
		$grid.after($selected);
	}
	const $search = wrapper.find('.pd-item-search');
	const $group = wrapper.find('.pd-item-group');

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
	const filters = { disabled: 0, is_stock_item: 1 };
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
			limit_page_length: search_text ? 40 : 10
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
			'<div class="pd-item-card">\
				<div class="pd-item-img">' + (it.image ? ('<img src="' + encodeURI(it.image) + '">') : '<span>' + (it.item_name ? it.item_name.charAt(0) : '_') + '</span>') + '</div>\
				<div class="pd-item-title">' + frappe.utils.escape_html(it.item_name || it.name) + '</div>\
				<div class="pd-item-sub">' + (price ? price : '0') + ' / ' + frappe.utils.escape_html(it.stock_uom || '') + '</div>\
			</div>'
		);
		$card.attr('tabindex', '0');
		$card.on('click keypress', (e) => {
			if (e.type === 'keypress' && e.which !== 13 && e.which !== 32) return; // enter/space
			frappe.show_alert({ message: __('Selected {0}', [it.item_name || it.name]), indicator: 'green' });
			// show inline selected indicator below the grid
			const $sel = $(grid).closest('.pd-card').find('.pd-item-selected');
			$sel.text(__('Selected: {0}', [it.item_name || it.name])).show();
			if (on_select) on_select(it);
		});
		grid.append($card);
	});
}

// ===== Purchase Order Inline Creator =====
function show_purchase_create_box($box, doctype) {
	if ($box.data('initialized')) { $box.show(); return; }
	$box.data('initialized', true);

	$box.append('<div class="h6" style="margin-bottom:16px; color: #1976d2; font-weight: 600; padding: 12px; background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); border-radius: 8px; border-left: 4px solid #1976d2;">' + __('New') + ' ' + __(doctype) + '</div>');

	const controls_row = $('<div class="d-flex" style="gap:12px; flex-wrap:wrap; align-items:center; margin-bottom:16px; padding: 16px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 8px; border: 1px solid #dee2e6;"></div>');
	$box.append(controls_row);

	// Supplier Link control
	const supplier_wrapper = $('<div></div>');
	controls_row.append(supplier_wrapper);
	const supplier_control = frappe.ui.form.make_control({
		parent: supplier_wrapper.get(0),
		df: {
			label: __('Supplier'),
			fieldname: 'supplier',
			fieldtype: 'Link',
			options: 'Supplier',
			reqd: 1,
			placeholder: __('Search Supplier'),
			get_query: () => {
				return {
					filters: {}
				};
			}
		}
	});
	supplier_control.refresh();

	// Company Link control
	const company_wrapper = $('<div></div>');
	controls_row.append(company_wrapper);
	const company_control = frappe.ui.form.make_control({
		parent: company_wrapper.get(0),
		df: {
			label: __('Company'),
			fieldname: 'company',
			fieldtype: 'Link',
			options: 'Company',
			reqd: 1
		}
	});
	company_control.refresh();
	// set default company
	const _def_company = (frappe.defaults && frappe.defaults.get_default) ? frappe.defaults.get_default('company') : null;
	if (_def_company && company_control.set_value) company_control.set_value(_def_company);

	// Schedule Date control
	const sched_wrapper = $('<div></div>');
	controls_row.append(sched_wrapper);
	const schedule_control = new frappe.ui.form.ControlDate({
		parent: sched_wrapper.get(0),
		df: { label: __('Schedule Date'), fieldname: 'schedule_date', reqd: 1, default: frappe.datetime.get_today() },
		only_input: false
	});
	schedule_control.make();
	schedule_control.set_value(frappe.datetime.get_today());

	// Taxes and Charges Template (Purchase)
	const taxes_wrapper = $('<div></div>');
	controls_row.append(taxes_wrapper);
	const taxes_control = frappe.ui.form.make_control({
		parent: taxes_wrapper.get(0),
		df: {
			label: __('Purchase Taxes and Charges'),
			fieldname: 'taxes_and_charges',
			fieldtype: 'Link',
			options: 'Purchase Taxes and Charges Template',
			placeholder: __('Select Taxes Template'),
			onchange: () => {
				const raw_value = taxes_control.get_value && taxes_control.get_value();
				if (!raw_value) { $box.data('state').taxes = []; $box.data('state').taxes_template_name = ''; render_po_taxes_table($box); return; }
				resolve_taxes_template_name(raw_value, (resolved) => {
					$box.data('state').taxes_template_name = resolved || raw_value;
					if (!resolved) { $box.data('state').taxes = []; render_po_taxes_table($box); return; }
					fetch_purchase_taxes(resolved, (taxes) => {
						$box.data('state').taxes = taxes || [];
						render_po_taxes_table($box);
					});
				});
			},
			get_query: () => {
				const cmp = company_control && company_control.get_value ? company_control.get_value() : null;
				return { filters: cmp ? { company: cmp } : {} };
			}
		}
	});
	taxes_control.refresh();

	// Items table
	const table = $('<div class="table-responsive"><table class="table table-bordered table-sm"><thead><tr>\
		<th>' + __('Item') + '</th>\
		<th class="text-right">' + __('Rate') + '</th>\
		<th class="text-right">' + __('Qty') + '</th>\
		<th class="text-right">' + __('Amount') + '</th>\
		<th></th>\
	</tr></thead><tbody></tbody><tfoot><tr><td colspan="3" class="text-right"><b>' + __('Total') + '</b></td><td class="text-right pd-po-total">0</td><td></td></tr></tfoot></table></div>');
	$box.append(table);

	// Taxes table (preview of selected template)
	const taxes_table = $('<div class="table-responsive" style="margin-top:10px"><table class="table table-bordered table-sm"><thead><tr>\
		<th style="width:40px">#</th>\
		<th>' + __('Type') + '</th>\
		<th>' + __('Account Head') + '</th>\
		<th class="text-right">' + __('Rate') + '</th>\
		<th class="text-right">' + __('Amount') + '</th>\
	</tr></thead><tbody class="pd-po-taxes-body"><tr><td colspan="5" class="text-center text-muted">' + __('No Data') + '</td></tr></tbody><tfoot><tr><td colspan="4" class="text-right"><b>' + __('Total Taxes and Charges') + '</b></td><td class="text-right pd-po-taxes-total">0</td></tr></tfoot></table></div>');
	$box.append(taxes_table);

	// Actions
	const actions = $('<div class="d-flex" style="gap:12px; justify-content:flex-end; margin-top:16px; padding: 16px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 8px; border: 1px solid #dee2e6;"></div>');
	const create_btn = $('<button class="btn btn-primary">' + __('Create') + ' ' + __(doctype) + '</button>');
	const clear_btn = $('<button class="btn btn-default">' + __('Clear') + '</button>');
	actions.append(clear_btn).append(create_btn);
	$box.append(actions);

	$box.data('state', { doctype, items: [], supplier_control, company_control, schedule_control, taxes_control, taxes: [], tbody: table.find('tbody'), taxes_tbody: taxes_table.find('.pd-po-taxes-body'), taxes_total_el: taxes_table.find('.pd-po-taxes-total') });

	clear_btn.on('click', () => {
		$box.data('state').items = [];
		render_po_table($box);
	});

	create_btn.on('click', () => create_purchase_document($box));

	// when taxes template changes, fetch its taxes and store in state
	// Also listen to Awesomplete selection event to be safe
	$(taxes_control.$input).on('awesomplete-selectcomplete', () => {
		const raw_value = taxes_control.get_value && taxes_control.get_value();
		if (!raw_value) { $box.data('state').taxes = []; $box.data('state').taxes_template_name = ''; render_po_taxes_table($box); return; }
		resolve_taxes_template_name(raw_value, (resolved) => {
			$box.data('state').taxes_template_name = resolved || raw_value;
			if (!resolved) { $box.data('state').taxes = []; render_po_taxes_table($box); return; }
			fetch_purchase_taxes(resolved, (taxes) => {
				$box.data('state').taxes = taxes || [];
				render_po_taxes_table($box);
			});
		});
	});

	// when company changes, refresh taxes link query and maybe rates will use this
	$(company_control.$input).on('change', () => {
		// clear taxes selection if company changed
		if (taxes_control && taxes_control.set_value) taxes_control.set_value('');
	});

	$box.show();
}
function render_po_taxes_table($box) {
	const state = $box.data('state');
	const tbody = state.taxes_tbody;
	if (!tbody) return;
	const taxes = state.taxes || [];
	// compute net total from items
	let net_total = 0;
	(state.items || []).forEach(r => { net_total += ((r.rate || 0) * (r.qty || 0)); });
	tbody.empty();
	if (!taxes.length) {
		tbody.append('<tr><td colspan="5" class="text-center text-muted">' + __('No Data') + '</td></tr>');
		if (state.taxes_total_el) state.taxes_total_el.text('0');
		return;
	}
	let total = 0;
	taxes.forEach((tx, idx) => {
		let amount = 0;
		const charge_type = tx.charge_type || '';
		if (charge_type === 'On Net Total') {
			amount = net_total * ((tx.rate || 0) / 100.0);
		} else if (charge_type === 'Actual') {
			amount = tx.tax_amount != null ? tx.tax_amount : (tx.base_tax_amount != null ? tx.base_tax_amount : 0);
		} else {
			amount = tx.tax_amount != null ? tx.tax_amount : (tx.base_tax_amount != null ? tx.base_tax_amount : 0);
		}
		total += (parseFloat(amount) || 0);
		const row = $('<tr>\
			<td>' + (idx + 1) + '</td>\
			<td>' + frappe.utils.escape_html(tx.charge_type || '') + '</td>\
			<td>' + frappe.utils.escape_html(tx.account_head || '') + '</td>\
			<td class="text-right">' + (tx.rate != null ? tx.rate : '') + '</td>\
			<td class="text-right">' + (amount != null ? format_currency(amount) : '') + '</td>\
		</tr>');
		tbody.append(row);
	});
	if (state.taxes_total_el) state.taxes_total_el.text(format_currency(total));
}
// Fetch taxes from a Purchase Taxes and Charges Template using ERPNext controller
function fetch_purchase_taxes(template_name, callback) {
	frappe.call({
		method: 'erpnext.controllers.accounts_controller.get_taxes_and_charges',
		args: {
			master_doctype: 'Purchase Taxes and Charges Template',
			master_name: template_name
		},
		callback: (r) => {
			const taxes = (r && r.message && r.message.taxes) ? r.message.taxes : (r && r.message ? r.message : []);
			if (callback) callback(taxes || []);
		}
	});
}

// Resolve a Taxes Template input that might be a title instead of name
function resolve_taxes_template_name(input_value, callback) {
	if (!input_value) { if (callback) callback(null); return; }
	frappe.call({
		method: 'frappe.client.get_list',
		args: {
			doctype: 'Purchase Taxes and Charges Template',
			fields: ['name'],
			filters: [
				['Purchase Taxes and Charges Template', 'name', '=', input_value]
			],
			limit_page_length: 1
		},
		callback: (r) => {
			const exists = r && r.message && r.message.length ? r.message[0].name : null;
			if (exists) { if (callback) callback(exists); return; }
			// fallback by title
			frappe.call({
				method: 'frappe.client.get_list',
				args: {
					doctype: 'Purchase Taxes and Charges Template',
					fields: ['name'],
					filters: [
						['Purchase Taxes and Charges Template', 'title', '=', input_value]
					],
					limit_page_length: 1
				},
				callback: (r2) => {
					const found = r2 && r2.message && r2.message.length ? r2.message[0].name : null;
					if (callback) callback(found);
				}
			});
		}
	});
}

// Helper to fetch buying rate using ERPNext's standard item details logic
function fetch_item_buying_rate(item_code, supplier, callback, companyOverride) {
	const get_default = (key) => (frappe.defaults && frappe.defaults.get_default) ? frappe.defaults.get_default(key) : null;
	const company = companyOverride || get_default('company');
	const price_list = get_default('buying_price_list');
	const posting_date = frappe.datetime.get_today();
	// ensure currencies are never None to avoid exchange rate validation errors
	const sys_currency = (frappe.boot && frappe.boot.sysdefaults && (frappe.boot.sysdefaults.currency || frappe.boot.sysdefaults.default_currency)) || 'SAR';

	frappe.call({
		method: 'erpnext.stock.get_item_details.get_item_details',
		args: {
			args: {
				doctype: 'Purchase Order',
				item_code: item_code,
				company: company,
				price_list: price_list,
				currency: sys_currency,
				price_list_currency: sys_currency,
				conversion_rate: 1,
				plc_conversion_rate: 1,
				transaction_date: posting_date,
				qty: 1,
				supplier: supplier
			}
		},
		callback: (r) => {
			const d = r && r.message;
			if (callback) {
				const rate = d && (d.rate != null ? d.rate : d.price_list_rate);
				callback(rate != null ? rate : null, d && d.currency ? d.currency : null, d || {});
			}
		}
	});
}

function purchase_add_item($box, item) {
	const state = $box.data('state');
	if (!state) return;
	// ensure conversion rate defaults to 1 on first item selection
	state.conversion_rate = 1;
	const existing = state.items.find(it => it.item_code === item.name);
	if (existing) {
		existing.qty += 1;
	} else {
		const new_row = {
			item_code: item.name,
			item_name: item.item_name || item.name,
			rate: item.standard_rate || 0,
			uom: item.stock_uom || '',
			qty: 1
		};
		state.items.push(new_row);
		// try to fetch buying rate using standard ERPNext logic
		const supplier = state.supplier_control && state.supplier_control.get_value ? state.supplier_control.get_value() : null;
		const company = state.company_control && state.company_control.get_value ? state.company_control.get_value() : null;
		fetch_item_buying_rate(item.name, supplier, (rate) => {
			if (rate != null) {
				new_row.rate = rate;
				render_po_table($box);
			}
		}, company);
	}
	render_po_table($box);
}

function render_po_table($box) {
	const state = $box.data('state');
	const tbody = state.tbody;
	tbody.empty();
	let total = 0;
	state.items.forEach((row, idx) => {
		const amount = (row.rate || 0) * (row.qty || 0);
		total += amount;
		const $tr = $('<tr>\
			<td>' + frappe.utils.escape_html(row.item_name) + '</td>\
			<td class="text-right"><input type="number" step="0.01" class="form-control input-sm pd-rate" style="max-width:120px; margin-left:auto" value="' + (row.rate || 0) + '"></td>\
			<td class="text-right"><input type="number" step="1" class="form-control input-sm pd-qty" style="max-width:100px; margin-left:auto" value="' + (row.qty || 1) + '"></td>\
			<td class="text-right">' + format_currency(amount) + '</td>\
			<td class="text-right"><button class="btn btn-xs btn-danger pd-remove">' + __('Remove') + '</button></td>\
		</tr>');
		$tr.find('.pd-rate').on('input', (e) => { row.rate = parseFloat(e.target.value || '0'); render_po_table($box); });
		$tr.find('.pd-qty').on('input', (e) => { row.qty = parseFloat(e.target.value || '0'); render_po_table($box); });
		$tr.find('.pd-remove').on('click', () => { state.items.splice(idx, 1); render_po_table($box); });
		tbody.append($tr);
	});
	$box.find('.pd-po-total').text(format_currency(total));
	// refresh taxes preview when item totals change
	render_po_taxes_table($box);
}

function create_purchase_document($box) {
	const state = $box.data('state');
	if (!state) return;
	const supplier = state.supplier_control.get_value();
	const schedule_date = state.schedule_control.get_value() || frappe.datetime.get_today();
	if (!supplier) {
		frappe.msgprint(__('Please select a Supplier'));
		return;
	}
	if (!state.items.length) {
		frappe.msgprint(__('Please add at least one item'));
		return;
	}

	const get_default = (key) => (frappe.defaults && frappe.defaults.get_default) ? frappe.defaults.get_default(key) : null;
	const company = state.company_control && state.company_control.get_value ? state.company_control.get_value() : get_default('company');
	const buying_price_list = get_default('buying_price_list');
	const sys_currency = (frappe.boot && frappe.boot.sysdefaults && (frappe.boot.sysdefaults.currency || frappe.boot.sysdefaults.default_currency)) || 'SAR';

	const doc = {
		doctype: state.doctype || 'Purchase Order',
		supplier: supplier,
		company: company || undefined,
		buying_price_list: buying_price_list || undefined,
		currency: sys_currency,
		price_list_currency: sys_currency,
		conversion_rate: (state && state.conversion_rate) ? state.conversion_rate : 1,
		plc_conversion_rate: 1,
		transaction_date: frappe.datetime.get_today(),
		items: state.items.map(r => ({ item_code: r.item_code, qty: r.qty || 1, rate: r.rate || 0, schedule_date: schedule_date, uom: r.uom })),
		taxes_and_charges: (state.taxes_template_name ? state.taxes_template_name : (state.taxes_control && state.taxes_control.get_value ? state.taxes_control.get_value() : undefined)),
		taxes: (state.taxes && state.taxes.length) ? state.taxes : undefined
	};

	frappe.call({
		method: 'frappe.client.insert',
		args: { doc },
		freeze: true,
		callback: (r) => {
			if (r && r.message) {
				const created = r.message;
				// Try to submit the document immediately
				frappe.call({
					method: 'frappe.client.submit',
					args: { doc: created },
					freeze: true,
					callback: (s) => {
						const submitted = (s && s.message) ? s.message : created;
						frappe.show_alert({ message: __(state.doctype + ' {0} submitted', [submitted.name]), indicator: 'green' });
						state.items = [];
						render_po_table($box);
						refresh_active_tab(cur_page.page);
					}
				}).fail(() => {
					// Fallback: created but not submitted
					frappe.show_alert({ message: __(state.doctype + ' {0} created (not submitted)', [created.name]), indicator: 'orange' });
					state.items = [];
					render_po_table($box);
					refresh_active_tab(cur_page.page);
				});
			}
		}
	});
}

function create_doc_inline(doctype, on_created) {
	// Try quick entry first to avoid leaving the page
	if (frappe.ui.form && frappe.ui.form.make_quick_entry) {
		frappe.ui.form.make_quick_entry(doctype, null, null, null, {
			after_insert: (doc) => {
				frappe.show_alert({ message: __('Created {0}', [doc.name]), indicator: 'green' });
				if (on_created) on_created(doc);
			}
		});
		return;
	}

	// Fallback: show message and avoid navigation
	frappe.msgprint({
		message: __('Quick Entry not available. Please enable Quick Entry for {0} or open the full form from the list item.', [doctype]),
		indicator: 'orange'
	});
}

function open_doc_preview_dialog(doctype, name) {
	const d = new frappe.ui.Dialog({
		title: __(doctype) + ' ' + name,
		size: 'large'
	});

	d.$body.append($('<div class="text-muted">' + __('Loading...') + '</div>'));
	frappe.call({
		method: 'frappe.client.get',
		args: { doctype: doctype, name: name },
		callback: (r) => {
			const doc = r && r.message;
			if (!doc) {
				d.$body.empty().append($('<div class="text-danger">' + __('Failed to load document') + '</div>'));
				return;
			}
			render_doc_preview(d, doctype, doc);
		}
	});

	d.show();
}

function render_doc_preview(dialog, doctype, doc) {
	const meta = frappe.get_meta(doctype);
	const rows = [];
	['supplier', 'posting_date', 'status', 'grand_total', 'currency'].forEach(key => {
		if (doc[key] != null) {
			rows.push({ label: frappe.meta.get_label(doctype, key), value: doc[key] });
		}
	});

	let items_html = '';
	const items_child = (doc.items || []).slice(0, 10);
	if (items_child.length) {
		// Different table headers for RFQ vs other documents
		const is_rfq = doctype === 'Request for Quotation';
		const headers = is_rfq ? 
			'<thead><tr><th>' + __('Item') + '</th><th class="text-right">' + __('Qty') + '</th><th class="text-right">' + __('UOM') + '</th></tr></thead>' :
			'<thead><tr><th>' + __('Item') + '</th><th class="text-right">' + __('Qty') + '</th><th class="text-right">' + __('Rate') + '</th><th class="text-right">' + __('Amount') + '</th></tr></thead>';
		
		items_html += '<div style="margin-top:12px">\
			<div class="font-weight-bold">' + __('Items') + '</div>\
			<div class="table-responsive">\
				<table class="table table-bordered table-sm" style="margin-top:6px">\
					' + headers + '\
					<tbody>' + items_child.map(it => {
						if (is_rfq) {
							return '<tr>\
								<td>' + frappe.utils.escape_html(it.item_name || it.item_code || '') + '</td>\
								<td class="text-right">' + (it.qty != null ? it.qty : '') + '</td>\
								<td class="text-right">' + (it.uom || '') + '</td>\
							</tr>';
						} else {
							const amount = (it.amount != null) ? it.amount : (it.base_amount != null ? it.base_amount : '');
							return '<tr>\
								<td>' + frappe.utils.escape_html(it.item_name || it.item_code || '') + '</td>\
								<td class="text-right">' + (it.qty != null ? it.qty : '') + '</td>\
								<td class="text-right">' + (it.rate != null ? it.rate : '') + '</td>\
								<td class="text-right">' + (amount != null ? amount : '') + '</td>\
							</tr>';
						}
					}).join('') + '</tbody>\
				</table>\
			</div>\
		</div>';
	}

	const details_html = '<div class="frappe-control">' + rows.map(r => (
		'<div class="row" style="margin-bottom:6px">\
			<div class="col-sm-4 text-muted">' + frappe.utils.escape_html(r.label || '') + '</div>\
			<div class="col-sm-8">' + frappe.utils.escape_html(r.value != null ? ('' + r.value) : '') + '</div>\
		</div>'
	)).join('') + '</div>';

	const $body = dialog.$body.empty();
	$body.append(details_html).append(items_html);

	// Actions for submitted Purchase Order
	if (doctype === 'Purchase Order' && (doc.docstatus === 1 || doc.status === 'To Receive and Bill' || doc.status === 'To Receive')) {
		const actions = $('<div class="d-flex" style="gap:8px; justify-content:flex-end; margin-top:8px"></div>');
		const pr_btn = $('<button class="btn btn-primary">' + __('Create Purchase Receipt') + '</button>');
		pr_btn.on('click', () => create_pr_from_po(doc.name, dialog));
		actions.append(pr_btn);
		$body.append(actions);
	}

	// Actions for submitted Purchase Receipt
	if (doctype === 'Purchase Receipt' && (doc.docstatus === 1 || doc.status === 'To Bill')) {
		const actions = $('<div class="d-flex" style="gap:8px; justify-content:flex-end; margin-top:8px"></div>');
		const pi_btn = $('<button class="btn btn-primary">' + __('Create Purchase Invoice') + '</button>');
		pi_btn.on('click', () => create_pi_from_pr(doc.name, dialog));
		actions.append(pi_btn);
		$body.append(actions);
	}

	// Actions for RFQ
	if (doctype === 'Request for Quotation') {
		const actions = $('<div class="d-flex" style="gap:8px; justify-content:flex-end; margin-top:8px"></div>');
		
		// Submit button for Draft RFQ
		if (doc.docstatus === 0 && doc.status === 'Draft') {
			const submit_btn = $('<button class="btn btn-primary">' + __('Submit') + '</button>');
			submit_btn.on('click', () => {
				frappe.call({
					method: 'frappe.client.submit',
					args: { doc: doc },
					freeze: true,
					callback: (r) => {
						if (r && r.message) {
							frappe.show_alert({ message: __('RFQ {0} submitted', [r.message.name]), indicator: 'green' });
							dialog.hide();
							refresh_active_tab(cur_page.page);
						}
					},
					error: (err) => {
						frappe.msgprint({ title: __('Error'), message: __('Error submitting RFQ: {0}', [err.message || 'Unknown error']), indicator: 'red' });
					}
				});
			});
			actions.append(submit_btn);
		}
		
		// Create Supplier Quotation button for submitted RFQ
		if (doc.docstatus === 1 || doc.status === 'Open') {
			const sq_btn = $('<button class="btn btn-primary">' + __('Create Supplier Quotation') + '</button>');
			sq_btn.on('click', () => create_sq_from_rfq(doc, dialog));
			actions.append(sq_btn);
		}
		
		if (actions.children().length > 0) {
			$body.append(actions);
		}
	}

	// Actions for Supplier Quotation
	if (doctype === 'Supplier Quotation') {
		const actions = $('<div class="d-flex" style="gap:8px; justify-content:flex-end; margin-top:8px"></div>');
		
		// Submit button for Draft Supplier Quotation
		if (doc.docstatus === 0 && doc.status === 'Draft') {
			const submit_btn = $('<button class="btn btn-primary">' + __('Submit') + '</button>');
			submit_btn.on('click', () => {
				frappe.call({
					method: 'frappe.client.submit',
					args: { doc: doc },
					freeze: true,
					callback: (r) => {
						if (r && r.message) {
							frappe.show_alert({ message: __('Supplier Quotation {0} submitted', [r.message.name]), indicator: 'green' });
							dialog.hide();
							refresh_active_tab(cur_page.page);
						}
					},
					error: (err) => {
						frappe.msgprint({ title: __('Error'), message: __('Error submitting Supplier Quotation: {0}', [err.message || 'Unknown error']), indicator: 'red' });
					}
				});
			});
			actions.append(submit_btn);
		}
		
		// Create Purchase Order button for submitted Supplier Quotation
		if (doc.docstatus === 1 || doc.status === 'Submitted') {
			const po_btn = $('<button class="btn btn-primary">' + __('Create Purchase Order') + '</button>');
			po_btn.on('click', () => create_po_from_sq(doc, dialog));
			actions.append(po_btn);
		}
		
		if (actions.children().length > 0) {
			$body.append(actions);
		}
	}
}

function create_pr_from_po(po_name, dialog) {
	if (!po_name) return;
	
	// First get the Purchase Order details
	frappe.call({
		method: 'frappe.client.get',
		args: { doctype: 'Purchase Order', name: po_name },
		freeze: true,
		callback: (po_res) => {
			const po = po_res && po_res.message;
			if (!po || !(po.items && po.items.length)) { 
				frappe.msgprint(__('No items found on Purchase Order')); 
				return; 
			}
			
			// Create Purchase Receipt document manually
			const pr_doc = {
				doctype: 'Purchase Receipt',
				supplier: po.supplier,
				company: po.company,
				posting_date: frappe.datetime.get_today(),
				posting_time: frappe.datetime.get_time(),
				currency: po.currency || 'SAR',
				conversion_rate: po.conversion_rate || 1,
				buying_price_list: po.buying_price_list,
				price_list_currency: po.price_list_currency,
				plc_conversion_rate: po.plc_conversion_rate || 1,
				items: (po.items || []).map(it => ({
					item_code: it.item_code,
					item_name: it.item_name,
					qty: it.qty || 1,
					received_qty: it.qty || 1,
					rate: it.rate || 0,
					amount: (it.qty || 1) * (it.rate || 0),
					uom: it.uom,
					warehouse: it.warehouse,
					base_rate: it.base_rate || it.rate || 0,
					base_amount: (it.qty || 1) * (it.base_rate || it.rate || 0),
					conversion_factor: it.conversion_factor || 1,
					description: it.description,
					against_purchase_order: po_name,
					against_purchase_order_item: it.name
				}))
			};
			
			// Insert the Purchase Receipt
			frappe.call({
				method: 'frappe.client.insert',
				args: { doc: pr_doc },
				freeze: true,
				callback: (ins) => {
					const inserted = ins && ins.message;
					if (!inserted) { 
						frappe.msgprint(__('Failed to insert Purchase Receipt')); 
						return; 
					}
					
					// Submit the Purchase Receipt
					frappe.call({
						method: 'frappe.client.submit',
						args: { doc: inserted },
						freeze: true,
						callback: (sub) => {
							const submitted = sub && sub.message ? sub.message : inserted;
							frappe.show_alert({ 
								message: __('Purchase Receipt {0} submitted', [submitted.name]), 
								indicator: 'green' 
							});
							if (dialog) dialog.hide();
							refresh_active_tab(cur_page.page);
						},
						error: (err) => {
							frappe.msgprint({
								title: __('Error'),
								message: __('Error submitting Purchase Receipt: {0}', [err.message || 'Unknown error']),
								indicator: 'red'
							});
						}
					});
				},
				error: (err) => {
					frappe.msgprint({
						title: __('Error'),
						message: __('Error creating Purchase Receipt: {0}', [err.message || 'Unknown error']),
						indicator: 'red'
					});
				}
			});
		},
		error: (err) => {
			frappe.msgprint({
				title: __('Error'),
				message: __('Error fetching Purchase Order: {0}', [err.message || 'Unknown error']),
				indicator: 'red'
			});
		}
	});
}

function create_pi_from_pr(pr_name, dialog) {
	if (!pr_name) return;
	
	// First get the Purchase Receipt details
	frappe.call({
		method: 'frappe.client.get',
		args: { doctype: 'Purchase Receipt', name: pr_name },
		freeze: true,
		callback: (pr_res) => {
			const pr = pr_res && pr_res.message;
			if (!pr || !(pr.items && pr.items.length)) { 
				frappe.msgprint(__('No items found on Purchase Receipt')); 
				return; 
			}
			
			// Create Purchase Invoice document manually
			const pi_doc = {
				doctype: 'Purchase Invoice',
				supplier: pr.supplier,
				company: pr.company,
				posting_date: frappe.datetime.get_today(),
				due_date: frappe.datetime.get_today(),
				currency: pr.currency || 'SAR',
				conversion_rate: pr.conversion_rate || 1,
				buying_price_list: pr.buying_price_list,
				price_list_currency: pr.price_list_currency,
				plc_conversion_rate: pr.plc_conversion_rate || 1,
				items: (pr.items || []).map(it => ({
					item_code: it.item_code,
					item_name: it.item_name,
					qty: it.qty || it.received_qty || 1,
					rate: it.rate || it.valuation_rate || 0,
					amount: (it.qty || it.received_qty || 1) * (it.rate || it.valuation_rate || 0),
					uom: it.uom || it.stock_uom,
					warehouse: it.warehouse,
					base_rate: it.base_rate || it.rate || it.valuation_rate || 0,
					base_amount: (it.qty || it.received_qty || 1) * (it.base_rate || it.rate || it.valuation_rate || 0),
					conversion_factor: it.conversion_factor || 1,
					description: it.description
				}))
			};
			
			// Insert the Purchase Invoice
			frappe.call({
				method: 'frappe.client.insert',
				args: { doc: pi_doc },
				freeze: true,
				callback: (ins) => {
					const inserted = ins && ins.message;
					if (!inserted) { 
						frappe.msgprint(__('Failed to insert Purchase Invoice')); 
						return; 
					}
					
					// Submit the Purchase Invoice
					frappe.call({
						method: 'frappe.client.submit',
						args: { doc: inserted },
						freeze: true,
						callback: (sub) => {
							const submitted = sub && sub.message ? sub.message : inserted;
							frappe.show_alert({ 
								message: __('Purchase Invoice {0} submitted', [submitted.name]), 
								indicator: 'green' 
							});
							if (dialog) dialog.hide();
							refresh_active_tab(cur_page.page);
						},
						error: (err) => {
							frappe.msgprint({
								title: __('Error'),
								message: __('Error submitting Purchase Invoice: {0}', [err.message || 'Unknown error']),
								indicator: 'red'
							});
						}
					});
				},
				error: (err) => {
					frappe.msgprint({
						title: __('Error'),
						message: __('Error creating Purchase Invoice: {0}', [err.message || 'Unknown error']),
						indicator: 'red'
					});
				}
			});
		},
		error: (err) => {
			frappe.msgprint({
				title: __('Error'),
				message: __('Error fetching Purchase Receipt: {0}', [err.message || 'Unknown error']),
				indicator: 'red'
			});
		}
	});
}

function show_create_sq_option(submitted_rfq) {
	const d = new frappe.ui.Dialog({
		title: __('RFQ Submitted Successfully'),
		size: 'small'
	});
	d.$body.append($('<div class="text-center" style="padding: 20px;">\
		<div class="mb-3">' + __('RFQ {0} has been submitted.', [submitted_rfq.name]) + '</div>\
		<div class="mb-3">' + __('Would you like to create Supplier Quotations for the suppliers?') + '</div>\
	</div>'));
	d.set_primary_action(__('Create Supplier Quotations'), () => {
		d.hide();
		create_sq_from_rfq(submitted_rfq, null);
	});
	d.set_secondary_action(__('Later'), () => {
		d.hide();
	});
	d.show();
}

function create_sq_from_rfq(rfq_doc, dialog) {
	if (!rfq_doc) return;
	const suppliers = (rfq_doc.suppliers || []).map(s => s.supplier).filter(Boolean);
	if (!suppliers.length) { frappe.msgprint(__('No suppliers on RFQ')); return; }
	const d = new frappe.ui.Dialog({ title: __('Create Supplier Quotation'), size: 'large' });
	
	// Supplier selection
	const supplier_group = $('<div class="form-group"></div>');
	supplier_group.append('<label>' + __('Supplier') + '</label>');
	const sel = $('<select class="form-control"></select>');
	suppliers.forEach(s => sel.append('<option value="' + frappe.utils.escape_html(s) + '">' + frappe.utils.escape_html(s) + '</option>'));
	supplier_group.append(sel);
	d.$body.append(supplier_group);
	
	// Items table with rate inputs
	const items_table = $('<div class="table-responsive" style="margin-top:16px"><table class="table table-bordered table-sm"><thead><tr><th>' + __('Item') + '</th><th class="text-right">' + __('Qty') + '</th><th class="text-right">' + __('UOM') + '</th><th class="text-right">' + __('Rate') + '</th><th class="text-right">' + __('Amount') + '</th></tr></thead><tbody class="sq-items-tbody"></tbody></table></div>');
	d.$body.append(items_table);
	
	// Populate items with rate inputs
	const tbody = items_table.find('.sq-items-tbody');
	const items = rfq_doc.items || [];
	items.forEach((item, idx) => {
		const row = $('<tr data-item-code="' + frappe.utils.escape_html(item.item_code) + '">\
			<td>' + frappe.utils.escape_html(item.item_name || item.item_code) + '</td>\
			<td class="text-right">' + (item.qty || 1) + '</td>\
			<td class="text-right">' + (item.uom || 'Nos') + '</td>\
			<td class="text-right"><input type="number" step="0.01" min="0" class="form-control input-sm sq-rate" style="max-width:120px; margin-left:auto" value="0" data-qty="' + (item.qty || 1) + '"></td>\
			<td class="text-right sq-amount">0.00</td>\
		</tr>');
		tbody.append(row);
	});
	
	// Calculate amount when rate changes
	tbody.on('input', '.sq-rate', function() {
		const $row = $(this).closest('tr');
		const rate = parseFloat($(this).val()) || 0;
		const qty = parseFloat($(this).data('qty')) || 1;
		const amount = rate * qty;
		$row.find('.sq-amount').text(amount.toFixed(2));
	});
	
	d.set_primary_action(__('Create'), () => {
		const supplier = sel.val();
		if (!supplier) return;
		
		// Collect items with rates
		const sq_items = [];
		tbody.find('tr').each(function() {
			const $row = $(this);
			const rate = parseFloat($row.find('.sq-rate').val()) || 0;
			const qty = parseFloat($row.find('.sq-rate').data('qty')) || 1;
			const item_code = $row.attr('data-item-code');
			sq_items.push({
				item_code: item_code,
				qty: qty,
				rate: rate,
				amount: rate * qty,
				uom: $row.find('td:nth-child(3)').text()
			});
		});
		
		const sq_doc = {
			doctype: 'Supplier Quotation',
			supplier: supplier,
			company: rfq_doc.company,
			transaction_date: frappe.datetime.get_today(),
			items: sq_items
		};
		
		frappe.call({ 
			method: 'frappe.client.insert', 
			args: { doc: sq_doc }, 
			freeze: true, 
			callback: (r) => {
				if (r && r.message) {
					frappe.show_alert({ message: __('Supplier Quotation {0} created', [r.message.name]), indicator: 'green' });
					if (dialog) dialog.hide();
					d.hide();
					refresh_active_tab(cur_page.page);
				}
			}
		});
	});
	d.show();
}

function create_po_from_sq(sq_doc, dialog) {
	if (!sq_doc) return;
	
	// First get the Supplier Quotation details
	frappe.call({
		method: 'frappe.client.get',
		args: { doctype: 'Supplier Quotation', name: sq_doc.name },
		freeze: true,
		callback: (sq_res) => {
			const sq = sq_res && sq_res.message;
			if (!sq || !(sq.items && sq.items.length)) { 
				frappe.msgprint(__('No items found on Supplier Quotation')); 
				return; 
			}
			
			// Create Purchase Order document manually
			const po_doc = {
				doctype: 'Purchase Order',
				supplier: sq.supplier,
				company: sq.company,
				transaction_date: frappe.datetime.get_today(),
				schedule_date: frappe.datetime.get_today(),
				currency: sq.currency || 'SAR',
				conversion_rate: sq.conversion_rate || 1,
				buying_price_list: sq.buying_price_list,
				price_list_currency: sq.price_list_currency,
				plc_conversion_rate: sq.plc_conversion_rate || 1,
				items: (sq.items || []).map(it => ({
					item_code: it.item_code,
					item_name: it.item_name,
					qty: it.qty || 1,
					rate: it.rate || 0,
					amount: (it.qty || 1) * (it.rate || 0),
					uom: it.uom,
					warehouse: it.warehouse,
					base_rate: it.base_rate || it.rate || 0,
					base_amount: (it.qty || 1) * (it.base_rate || it.rate || 0),
					conversion_factor: it.conversion_factor || 1,
					description: it.description,
					against_supplier_quotation: sq.name,
					against_supplier_quotation_item: it.name
				}))
			};
			
			// Insert the Purchase Order
			frappe.call({
				method: 'frappe.client.insert',
				args: { doc: po_doc },
				freeze: true,
				callback: (ins) => {
					const inserted = ins && ins.message;
					if (!inserted) { 
						frappe.msgprint(__('Failed to insert Purchase Order')); 
						return; 
					}
					
					// Submit the Purchase Order
					frappe.call({
						method: 'frappe.client.submit',
						args: { doc: inserted },
						freeze: true,
						callback: (sub) => {
							const submitted = sub && sub.message ? sub.message : inserted;
							frappe.show_alert({ 
								message: __('Purchase Order {0} submitted', [submitted.name]), 
								indicator: 'green' 
							});
							if (dialog) dialog.hide();
							refresh_active_tab(cur_page.page);
						},
						error: (err) => {
							frappe.msgprint({
								title: __('Error'),
								message: __('Error submitting Purchase Order: {0}', [err.message || 'Unknown error']),
								indicator: 'red'
							});
						}
					});
				},
				error: (err) => {
					frappe.msgprint({
						title: __('Error'),
						message: __('Error creating Purchase Order: {0}', [err.message || 'Unknown error']),
						indicator: 'red'
					});
				}
			});
		},
		error: (err) => {
			frappe.msgprint({
				title: __('Error'),
				message: __('Error fetching Supplier Quotation: {0}', [err.message || 'Unknown error']),
				indicator: 'red'
			});
		}
	});
}