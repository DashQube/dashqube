frappe.pages['purchase-data'].on_page_load = function (wrapper) {
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

	// All hardcoded hex colors replaced with Frappe CSS variables for full light/dark theme support
	const style = $('<style>\
		.purchase-data-tabs .nav-tabs { margin-bottom: 8px; border-bottom: 1px solid var(--border-color); }\
		.purchase-data-tabs .nav-link { color: var(--text-color); font-weight: 500; border: none; padding: 8px 12px; margin-right: 4px; border-radius: 6px 6px 0 0; background: transparent; }\
		.purchase-data-tabs .nav-link:hover { background: var(--control-bg); }\
		.purchase-data-tabs .nav-link.active { background: var(--primary); color: var(--primary-fg); }\
		.pd-card { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px; overflow: visible !important; }\
		.pd-header { display: flex; gap: 8px; align-items: center; justify-content: space-between; }\
		.pd-header .pd-search { flex: 1 1 auto; max-width: 560px; }\
		.pd-list { margin-top: 8px; }\
		.pd-row { display: flex; justify-content: space-between; gap: 16px; padding: 10px 4px; border-bottom: 1px solid var(--border-color); cursor: pointer; }\
		.pd-row:last-child { border-bottom: 0; }\
		.pd-row:hover { background: var(--control-bg); border-radius: 4px; }\
		.pd-title { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--text-color); }\
		.pd-sub { color: var(--text-muted); font-size: 12px; white-space: nowrap; }\
		.pd-right { text-align: right; min-width: 160px; color: var(--text-color); }\
		.pd-badge { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 11px; background: var(--control-bg); color: var(--text-color); }\
		.table { color: var(--text-color); background: var(--card-bg); }\
		.table thead th { background: var(--control-bg); color: var(--text-muted); border-color: var(--border-color); }\
		.table td, .table th { border-color: var(--border-color) !important; }\
		.pd-badge[data-status="Submitted"] { background: var(--green-highlight-color); color: var(--green-avatar-color); }\
		.pd-badge[data-status="Draft"] { background: var(--control-bg); color: var(--text-muted); }\
		.pd-badge[data-status="Unpaid"] { background: var(--red-highlight-color); color: var(--red-avatar-color); }\
		.pd-badge[data-status="Open"] { background: var(--blue-highlight-color); color: var(--blue-avatar-color); }\
		.pd-badge[data-status="To Receive"] { background: var(--yellow-highlight-color); color: var(--yellow-avatar-color); }\
		.pd-badge[data-status="To Receive and Bill"] { background: var(--orange-highlight-color); color: var(--orange-avatar-color); }\
		.pd-badge[data-status="To Bill"] { background: var(--yellow-highlight-color); color: var(--yellow-avatar-color); }\
		.pd-badge[data-status="Completed"] { background: var(--green-highlight-color); color: var(--green-avatar-color); }\
		.pd-badge[data-status="Cancelled"] { background: var(--red-highlight-color); color: var(--red-avatar-color); }\
		.pd-badge[data-status="Closed"] { background: var(--control-bg); color: var(--text-muted); }\
		.pd-badge[data-status="Paid"] { background: var(--green-highlight-color); color: var(--green-avatar-color); }\
		.pd-badge[data-status="Partly Paid"] { background: var(--yellow-highlight-color); color: var(--yellow-avatar-color); }\
		.pd-badge[data-status="Overdue"] { background: var(--red-highlight-color); color: var(--red-avatar-color); }\
		.form-control { background: var(--control-bg) !important; color: var(--text-color) !important; border-color: var(--border-color) !important; }\
		.form-control::placeholder { color: var(--text-muted) !important; }\
		select.form-control option { background: var(--card-bg); color: var(--text-color); }\
		.pd-item-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; padding: 16px 0; }\
		.pd-item-card { border: 2px solid var(--border-color); border-radius: 12px; padding: 16px; background: var(--card-bg); cursor: pointer; transition: all 0.2s ease; }\
		.pd-item-card:hover { border-color: var(--primary); background: var(--control-bg); transform: translateY(-3px); }\
		.pd-item-img { width: 100%; height: 120px; border-radius: 8px; background: var(--control-bg); display:flex; align-items:center; justify-content:center; overflow:hidden; border: 1px solid var(--border-color); }\
		.pd-item-img img { max-width: 100%; max-height: 100%; object-fit: contain; }\
		.pd-item-img span { font-size: 48px; font-weight: bold; color: var(--primary); }\
		.pd-item-title { margin-top: 12px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--text-color); font-size: 14px; }\
		.pd-item-sub { color: var(--text-muted); font-size: 12px; margin-top: 4px; }\
		.pd-item-selected { background: var(--green-highlight-color); color: var(--green-avatar-color); padding: 8px 12px; border-radius: 8px; font-weight: 500; border: 1px solid var(--green-avatar-color); }\
		.pd-items-header { background: var(--control-bg) !important; }\
		.pd-items-header .h6 { color: var(--text-color) !important; }\
		.pd-preview-section { margin-top: 16px; border-top: 1px solid var(--border-color); padding-top: 12px; }\
		.pd-preview-section-title { font-weight: 600; color: var(--text-color); margin-bottom: 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); }\
		.pd-draft-notice { background: var(--yellow-highlight-color); color: var(--yellow-avatar-color); border: 1px solid var(--yellow-avatar-color); border-radius: 6px; padding: 8px 12px; margin-bottom: 12px; font-size: 13px; }\
		.pd-sel-body tr td { vertical-align: middle !important; padding: 8px !important; }\
		.pd-sel-body .form-control { margin: 0 !important; }\
		.pd-sel-body .frappe-control { margin: 0 !important; }\
		.pd-sel-body [data-fieldname="warehouse"] { margin: 0 !important; }\
		.pd-rfq-terms-template .frappe-control { margin-bottom: 0 !important; }\
	</style>');
	$(page.body).prepend(style);

	// Per-tab active colors
	const style2 = $('<style>\
		.purchase-data-tabs .nav-link.active[data-target="#pd-rfq"],\
		.purchase-data-tabs .nav-link.active[data-target="#pd-sq"],\
		.purchase-data-tabs .nav-link.active[data-target="#pd-po"],\
		.purchase-data-tabs .nav-link.active[data-target="#pd-pr"],\
		.purchase-data-tabs .nav-link.active[data-target="#pd-pi"] {\
			background: var(--primary);\
			color: var(--primary-fg);\
			border-color: var(--primary);\
		}\
	</style>');
	$(page.body).prepend(style2);

	render_tab_body(page, tabs, 'Request for Quotation');

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

	tab_html.find('.nav-link').on('click', function (e) {
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

	const item_selector = $('<div class="pd-card" style="margin-top:12px">\
		<div class="pd-items-header d-flex" style="gap:12px; align-items:center; flex-wrap:wrap; padding: 16px; border-radius: 8px; margin-bottom: 16px;">\
			<div class="h6 mb-0" style="margin-right:auto; font-weight: 600;">' + __('All Items') + '</div>\
			<input type="text" class="form-control pd-item-search" placeholder="' + __('Search by item code, serial number or barcode') + '" style="max-width:360px; border-radius: 6px;">\
			<select class="form-control pd-item-group" style="max-width:240px; border-radius: 6px;"><option value="">' + __('Select item group') + '</option></select>\
		</div>\
		<div class="pd-item-grid" style="margin-top:10px"></div>\
	</div>');

	const list = $('<div class="pd-card pd-list result-list"></div>');
	$pane.append(header).append(list);
	$pane.prepend(item_selector);

	const new_btn = header.find('button');
	let supplier_control = null;
	let company_control = null;
	
	if (label === 'Request for Quotation' || label === 'Supplier Quotation') {
		const wrap = $('<div class="d-flex" style="gap:8px; width:100%; flex-wrap:wrap"></div>');
		header.find('.pd-search').append(wrap);
		const company_placeholder = $('<div style="min-width:220px"></div>').appendTo(wrap);
		const supplier_placeholder = $('<div style="min-width:220px"></div>').appendTo(wrap);
		company_control = frappe.ui.form.make_control({
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
		new_btn.remove();
		
		const apply_filters = () => {
			const company = company_control.get_value ? company_control.get_value() : '';
			list.data('rfq_company', company);
			$pane.find('tr[data-code]').each(function () {
				const whCtrl = $(this).data('warehouse_ctrl');
				if (whCtrl) {
					whCtrl.set_value('');
					whCtrl.df.get_query = () => {
						let selected_company = company;
						return {
							filters: {
								company: selected_company,
								is_group: 0
							}
						};
					};
					whCtrl.refresh();
				}
			});
			trigger_search();
		};
		$(company_control.$input).on('change', apply_filters);
	} else {
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

	list.data('auto_refresh', trigger_search);

	if (supplier_control && supplier_control.$input) {
		$(supplier_control.$input).on('change', () => { if (search_timer) clearTimeout(search_timer); search_timer = setTimeout(trigger_search, 50); });
	}

	trigger_search();

	let $selectedBox = null;
	if (label === 'Request for Quotation' || label === 'Supplier Quotation') {
		$selectedBox = $('<div class="pd-card" style="margin-top:8px;"><div class="h6" style="margin-bottom:8px">' + __('Selected Items') + '</div><div class="table-responsive"><table class="table table-bordered table-sm"><thead>' +
			'<tr><th>' + __('Item') + '</th><th class="text-right">' + __('Qty') + '</th><th class="text-right">' + __('Warehouse') + '</th><th></th></tr>' +
			'</thead><tbody class="pd-sel-body"><tr class="pd-empty"><td colspan="4" class="text-center text-muted">' + __('No items selected') + '</td></tr></tbody>' +
			'</table></div></div>');
		$pane.append($selectedBox);
	}

	let $suppliersBox = null;
	let tcCtrl = null;
	let $termsBox = null;
	if (label === 'Request for Quotation') {
		$suppliersBox = $('<div class="pd-card" style="margin-top:8px;"><div class="h6" style="margin-bottom:8px">' + __('Selected Suppliers') + '</div><div class="table-responsive"><table class="table table-bordered table-sm"><thead>' +
			'<tr><th>' + __('Supplier') + '</th><th></th></tr>' +
			'</thead><tbody class="pd-sup-body"><tr class="pd-empty"><td colspan="2" class="text-center text-muted">' + __('No suppliers selected') + '</td></tr></tbody>' +
			'</table></div></div>');
		$pane.append($suppliersBox);
		$termsBox = $(
			'<div class="pd-card" style="margin-top:8px;">' +
			'<div class="h6" style="margin-bottom:12px">' +
			__('Terms & Conditions') +
			'</div>' +
			'<div class="pd-rfq-terms-template" style="max-width:400px;margin-bottom:12px"></div>' +
			'<textarea class="form-control pd-rfq-terms" rows="5" placeholder="' + __('Enter terms and conditions') + '"></textarea>' +
			'</div>'
		);
		$pane.append($termsBox);

		tcCtrl = frappe.ui.form.make_control({
			parent: $termsBox.find('.pd-rfq-terms-template').get(0),
			df: {
				label: __('Terms and Conditions Template'),
				fieldname: 'tc_name',
				fieldtype: 'Link',
				options: 'Terms and Conditions',
				get_query: () => ({
					filters: {
						buying: 1
					}
				})
			},
			only_input: false
		});
		tcCtrl.refresh();

		$(tcCtrl.$input).on('awesomplete-selectcomplete change', function () {
			const val = tcCtrl.get_value();
			if (!val) return;
			frappe.db.get_doc('Terms and Conditions', val).then(tcDoc => {
				$termsBox.find('.pd-rfq-terms').val(tcDoc.terms || '');
			});
		});
		
		const addSupplier = (name) => {
			const tbody = $suppliersBox.find('.pd-sup-body');
			if (!name) return;
			if (tbody.find('tr[data-supplier="' + frappe.utils.escape_html(name) + '"]').length) return;
			$suppliersBox.find('.pd-empty').remove();
			const appendRow = (lbl) => {
				const tr = $('<tr data-supplier="' + frappe.utils.escape_html(name) + '"><td>' + frappe.utils.escape_html(lbl || name) + '</td><td class="text-right"><button class="btn btn-xs btn-danger">' + __('Remove') + '</button></td>');
				tr.find('button').on('click', () => { tr.remove(); if (!tbody.find('tr').length) tbody.append('<tr class="pd-empty"><td colspan="2" class="text-center text-muted">' + __('No suppliers selected') + '</td></tr>'); });
				tbody.append(tr);
			};
			frappe.call({
				method: 'frappe.client.get_value', args: { doctype: 'Supplier', filters: { name }, fieldname: 'supplier_name' }, callback: (r) => {
					const lbl = (r && r.message && (r.message.supplier_name || r.message[0] && r.message[0].supplier_name)) || name;
					appendRow(lbl);
				}
			});
		};
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
		const row = $('<tr data-code="' + frappe.utils.escape_html(item.name) + '">' +
			'<td>' + frappe.utils.escape_html(item.item_name || item.name) + '</td>' +
			'<td class="text-right" style="vertical-align: middle;"><input type="number" step="1" min="1" value="1" class="form-control input-sm" style="max-width:100px; margin-left:auto"></td>' +
			'<td class="text-right" style="min-width:220px; vertical-align: middle;"><div class="pd-warehouse" style="margin:0; padding:0;"></div></td>' +
			'<td class="text-right" style="vertical-align: middle;"><button class="btn btn-xs btn-danger">' + __('Remove') + '</button></td>' +
			'</tr>');
		row.attr('data-uom', (item.stock_uom || item.uom || 'Nos'));
		const whParent = row.find('.pd-warehouse').get(0);
		let whCtrl = null;
		if (whParent) {
			whCtrl = frappe.ui.form.make_control({
				parent: whParent,
				df: {
					label: __('Warehouse'),
					fieldname: 'warehouse',
					fieldtype: 'Link',
					options: 'Warehouse',
					placeholder: __('Select Warehouse'),
					get_query: () => {
						const selected_company = company_control && company_control.get_value ? company_control.get_value() : '';
						return {
							filters: {
								company: selected_company,
								is_group: 0
							}
						};
					}
				},
				only_input: true,
				render_input: true
			});
			whCtrl.refresh();
			
			if (whCtrl.$input) {
				whCtrl.$input.css({
					'height': '32px',
					'width': '100%',
					'margin': '0'
				});
			}
			
			const get_default = (key) => (frappe.defaults && frappe.defaults.get_default) ? frappe.defaults.get_default(key) : null;
			const default_warehouse = get_default('default_warehouse');
			if (default_warehouse && whCtrl.set_value) whCtrl.set_value(default_warehouse);
		}
		row.data('warehouse_ctrl', whCtrl);
		row.find('button').on('click', () => { 
			row.remove(); 
			if (!tbody.find('tr').length) {
				tbody.append('<tr class="pd-empty"><td colspan="4" class="text-center text-muted">' + __('No items selected') + '</td></tr>');
			}
		});
		tbody.append(row);
	};

	if (label === 'Request for Quotation' || label === 'Supplier Quotation') {
		const updateWarehouseQueries = () => {
			const company = company_control && company_control.get_value ? company_control.get_value() : '';
			$pane.find('tr[data-code]').each(function () {
				const whCtrl = $(this).data('warehouse_ctrl');
				if (whCtrl && whCtrl.df) {
					whCtrl.df.get_query = () => {
						let selected_company = company;
						return {
							filters: {
								company: selected_company,
								is_group: 0
							}
						};
					};
					whCtrl.refresh();
					if (whCtrl.get_value && whCtrl.get_value()) {
						whCtrl.set_value('');
					}
				}
			});
		};
		
		if (company_control) {
			$(company_control.$input).on('change', function() {
				const newCompany = company_control.get_value() || '';
				list.data('rfq_company', newCompany);
				updateWarehouseQueries();
				trigger_search();
			});
		}
	}

	initialize_item_selector(item_selector, (it) => {
		if (doctype_map[label] === 'Purchase Order' || doctype_map[label] === 'Purchase Receipt' || doctype_map[label] === 'Purchase Invoice') {
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
			
			const company = company_control && company_control.get_value ? company_control.get_value() : '';
			if (!company) { frappe.msgprint(__('Please select a Company')); return; }
			
			const get_default = (key) => (frappe.defaults && frappe.defaults.get_default) ? frappe.defaults.get_default(key) : null;
			const default_warehouse_global = get_default('default_warehouse') || undefined;
			const rfq_doc = {
				doctype: 'Request for Quotation',
				company: company,
				suppliers: suppliers.map((s, idx) => ({ supplier: s.supplier, idx: idx + 1 })),
				message_for_supplier: __('Please quote as per the list below.'),
				items: items.map(it => ({
					item_code: it.item_code,
					qty: it.qty,
					rate: 0,
					amount: 0,
					schedule_date: frappe.datetime.get_today(),
					warehouse: it.warehouse || default_warehouse_global,
					conversion_factor: 1,
					uom: ($selectedBox.find('tr[data-code="' + it.item_code.replace(/["\\]/g, '\\$&') + '"]').attr('data-uom') || 'Nos')
				})),
				tc_name: tcCtrl.get_value() || undefined,
				terms: $termsBox.find('.pd-rfq-terms').val() || undefined,
			};
			frappe.call({
				method: 'frappe.client.insert',
				args: { doc: rfq_doc },
				freeze: true,
				callback: (r) => {
					if (r && r.message) {
						const created_rfq = r.message;
						frappe.call({
							method: 'frappe.client.submit',
							args: { doc: created_rfq },
							freeze: true,
							callback: (s) => {
								const submitted_rfq = (s && s.message) ? s.message : created_rfq;
								frappe.show_alert({ message: __('RFQ {0} submitted', [submitted_rfq.name]), indicator: 'green' });
								show_create_sq_option(submitted_rfq, page);
							},
							error: (err) => {
								frappe.msgprint({ title: __('Error'), message: __('Error submitting RFQ: {0}', [err.message || 'Unknown error']), indicator: 'red' });
							}
						});
						if ($selectedBox) {
							$selectedBox.find('.pd-sel-body').html('<tr class="pd-empty"><td colspan="4" class="text-center text-muted">' + __('No items selected') + '</td></tr>');
						}
						if ($suppliersBox) {
							$suppliersBox.find('.pd-sup-body').html('<tr class="pd-empty"><td colspan="2" class="text-center text-muted">' + __('No suppliers selected') + '</td></tr>');
						}
						if (supplier_control && supplier_control.set_value) {
							supplier_control.set_value('');
						}
						if (tcCtrl && tcCtrl.set_value) {
							tcCtrl.set_value('');
						}
						if ($termsBox) {
							$termsBox.find('.pd-rfq-terms').val('');
						}
						$pane.find('tr[data-code]').remove();
						$pane.find('tr[data-supplier]').remove();
						trigger_search();
					}
				}
			});
		});
	}
}

function load_docs_into(container, doctype, supplier_name, label_for_logic) {
	container.empty().append($('<div class="text-muted">' + __('Loading...') + '</div>'));
	const filters = [];
	const apply_supplier = (label_for_logic !== 'Request for Quotation') && supplier_name;
	if (apply_supplier && supplier_name) filters.push([doctype, 'supplier', '=', supplier_name]);
	
	if (label_for_logic === 'Request for Quotation') {
		const rfq_company = container.data('rfq_company') || '';
		if (rfq_company) filters.push(['Request for Quotation', 'company', '=', rfq_company]);
	}
	
	let fields = ['name', 'status', 'modified'];
	if (doctype === 'Purchase Receipt' || doctype === 'Purchase Invoice') {
		fields = ['name', 'supplier', 'posting_date', 'status', 'grand_total', 'currency'];
	} else if (doctype === "Purchase Order") {
		fields = ['name', 'supplier', 'transaction_date', 'status', 'grand_total', 'currency'];
	} else if (doctype === 'Supplier Quotation') {
		fields = ['name', 'supplier', 'transaction_date', 'status', 'grand_total', 'currency'];
	} else if (doctype === 'Request for Quotation') {
		fields = ['name', 'transaction_date', 'status'];
	}
	
	frappe.call({
		method: 'frappe.client.get_list',
		args: { doctype, fields, filters, order_by: 'modified desc', limit_page_length: 20 },
		callback: (r) => { 
			render_doc_list(container, doctype, (r && r.message) || []); 
		}
	});
}

function render_doc_list(container, doctype, rows) {
	container.empty();
	if (!rows.length) { container.append($('<div class="text-muted">' + __('No records found') + '</div>')); return; }
	rows.forEach(row => {
		const party = row.supplier || '';
		const date = row.posting_date || row.transaction_date || '';
		const status = row.status || '';
		const total = (row.grand_total != null ? format_currency(row.grand_total, row.currency) : '');
		const $card = $(
			'<div class="pd-row">\
				<div class="pd-left">\
					<div class="pd-title">' + frappe.utils.escape_html(row.name) + '</div>\
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
	if (!page) return;
	const active_link = $(page.body).find('.nav-link.active');
	const label = active_link.length ? active_link.text().trim() : 'Request for Quotation';
	const pane_id = label === 'Request for Quotation' ? '#pd-rfq' : (label === 'Supplier Quotation' ? '#pd-sq' : (label === 'Purchase Order' ? '#pd-po' : (label === 'Purchase Receipt' ? '#pd-pr' : '#pd-pi')));
	const $pane = $(page.body).find(pane_id);
	const list = $pane.find('.result-list');
	
	if (list.length) {
		let supplier = '';
		const supplierInput = $pane.find('input[data-fieldname="supplier_filter"]');
		if (supplierInput.length) {
			supplier = supplierInput.val() || '';
		}
		
		const doctypeMap = {
			'Purchase Order': 'Purchase Order',
			'Purchase Receipt': 'Purchase Receipt',
			'Purchase Invoice': 'Purchase Invoice',
			'Request for Quotation': 'Request for Quotation',
			'Supplier Quotation': 'Supplier Quotation'
		};
		
		load_docs_into(list, doctypeMap[label], supplier, label);
	}
}

function get_page() {
	return frappe.pages['purchase-data'] && frappe.pages['purchase-data'].page;
}

function initialize_item_selector(wrapper, on_select) {
	const $grid = wrapper.find('.pd-item-grid');
	let $selected = wrapper.find('.pd-item-selected');
	if (!$selected.length) {
		$selected = $('<div class="pd-item-selected" style="margin-top:6px; display:none"></div>');
		$grid.after($selected);
	}
	const $search = wrapper.find('.pd-item-search');
	const $group = wrapper.find('.pd-item-group');
	let timer = null;
	const reload = () => load_items_into_grid($grid, ($search.val() || '').trim(), ($group.val() || '').trim(), on_select);
	$search.on('input', () => { if (timer) clearTimeout(timer); timer = setTimeout(reload, 300); });
	$group.on('change', reload);
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
			filters,
			or_filters: search_text ? [
				['Item', 'name', 'like', '%' + search_text + '%'],
				['Item', 'item_name', 'like', '%' + search_text + '%'],
				['Item', 'item_code', 'like', '%' + search_text + '%']
			] : undefined,
			limit_page_length: search_text ? 40 : 10
		},
		callback: (r) => render_item_cards(grid, (r && r.message) || [], on_select)
	});
}

function render_item_cards(grid, items, on_select) {
	grid.empty();
	if (!items.length) { grid.append($('<div class="text-muted">' + __('No items found') + '</div>')); return; }
	items.forEach(it => {
		const price = (it.standard_rate != null) ? format_currency(it.standard_rate) : '';
		const $card = $(
			'<div class="pd-item-card">\
				<div class="pd-item-img">' + (it.image ? ('<img src="' + encodeURI(it.image) + '">') : '<span>' + (it.item_name ? it.item_name.charAt(0) : '_') + '</span>') + '</div>\
				<div class="pd-item-title">' + frappe.utils.escape_html(it.item_name || it.name) + '</div>\
				<div class="pd-item-sub">' + (price || '0') + ' / ' + frappe.utils.escape_html(it.stock_uom || '') + '</div>\
			</div>'
		);
		$card.attr('tabindex', '0');
		$card.on('click keypress', (e) => {
			if (e.type === 'keypress' && e.which !== 13 && e.which !== 32) return;
			frappe.show_alert({ message: __('Selected {0}', [it.item_name || it.name]), indicator: 'green' });
			$(grid).closest('.pd-card').find('.pd-item-selected').text(__('Selected: {0}', [it.item_name || it.name])).show();
			if (on_select) on_select(it);
		});
		grid.append($card);
	});
}

function show_purchase_create_box($box, doctype) {
	if ($box.data('initialized')) { $box.show(); return; }
	$box.data('initialized', true);

	$box.append('<div class="h6" style="margin-bottom:16px; color: var(--primary); font-weight: 600; padding: 12px; background: var(--control-bg); border-radius: 8px; border-left: 4px solid var(--primary);">' + __('New') + ' ' + __(doctype) + '</div>');
	const controls_row = $('<div class="d-flex" style="gap:12px; flex-wrap:wrap; align-items:center; margin-bottom:16px; padding: 16px; background: var(--control-bg); border-radius: 8px; border: 1px solid var(--border-color);"></div>');
	$box.append(controls_row);

	const supplier_wrapper = $('<div></div>');
	controls_row.append(supplier_wrapper);
	const supplier_control = frappe.ui.form.make_control({
		parent: supplier_wrapper.get(0),
		df: { label: __('Supplier'), fieldname: 'supplier', fieldtype: 'Link', options: 'Supplier', reqd: 1, placeholder: __('Search Supplier') }
	});
	supplier_control.refresh();

	const company_wrapper = $('<div></div>');
	controls_row.append(company_wrapper);
	const company_control = frappe.ui.form.make_control({
		parent: company_wrapper.get(0),
		df: { label: __('Company'), fieldname: 'company', fieldtype: 'Link', options: 'Company', reqd: 1 }
	});
	company_control.refresh();
	const _def_company = (frappe.defaults && frappe.defaults.get_default) ? frappe.defaults.get_default('company') : null;
	if (_def_company && company_control.set_value) company_control.set_value(_def_company);

	const sched_wrapper = $('<div></div>');
	controls_row.append(sched_wrapper);
	const schedule_control = new frappe.ui.form.ControlDate({
		parent: sched_wrapper.get(0),
		df: { label: __('Schedule Date'), fieldname: 'schedule_date', reqd: 1, default: frappe.datetime.get_today() },
		only_input: false
	});
	schedule_control.make();
	schedule_control.set_value(frappe.datetime.get_today());

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
					fetch_purchase_taxes(resolved, (taxes) => { $box.data('state').taxes = taxes || []; render_po_taxes_table($box); });
				});
			},
			get_query: () => {
				const cmp = company_control && company_control.get_value ? company_control.get_value() : null;
				return { filters: cmp ? { company: cmp } : {} };
			}
		}
	});
	taxes_control.refresh();

	const supplier_addr_wrapper = $('<div></div>');
	controls_row.append(supplier_addr_wrapper);
	const supplier_address_ctrl = frappe.ui.form.make_control({
		parent: supplier_addr_wrapper.get(0),
		df: {
			label: __('Supplier Address'),
			fieldname: 'supplier_address',
			fieldtype: 'Link',
			options: 'Address',
			placeholder: __('Supplier Address'),
			get_query: () => {
				const sup = supplier_control && supplier_control.get_value ? supplier_control.get_value() : '';
				return {
					query: 'frappe.contacts.doctype.address.address.address_query',
					filters: { link_doctype: 'Supplier', link_name: sup }
				};
			}
		}
	});
	supplier_address_ctrl.refresh();

	const shipping_addr_wrapper = $('<div></div>');
	controls_row.append(shipping_addr_wrapper);
	const shipping_address_ctrl = frappe.ui.form.make_control({
		parent: shipping_addr_wrapper.get(0),
		df: {
			label: __('Shipping Address'),
			fieldname: 'shipping_address',
			fieldtype: 'Link',
			options: 'Address',
			placeholder: __('Shipping Address'),
			get_query: () => {
				const cmp = company_control && company_control.get_value ? company_control.get_value() : '';
				return {
					query: 'frappe.contacts.doctype.address.address.address_query',
					filters: { link_doctype: 'Company', link_name: cmp }
				};
			}
		}
	});
	shipping_address_ctrl.refresh();

	$(supplier_control.$input).on('change', () => {
		const sup = supplier_control.get_value && supplier_control.get_value();
		if (!sup) { supplier_address_ctrl.set_value && supplier_address_ctrl.set_value(''); return; }
		frappe.call({
			method: 'frappe.client.get_list',
			args: {
				doctype: 'Dynamic Link',
				fields: ['parent'],
				filters: { link_doctype: 'Supplier', link_name: sup, parenttype: 'Address' },
				limit_page_length: 1
			},
			callback: (r) => {
				const addr = r && r.message && r.message[0] && r.message[0].parent;
				if (addr && supplier_address_ctrl.set_value) supplier_address_ctrl.set_value(addr);
			}
		});
	});

	$(company_control.$input).on('change', () => {
		const cmp = company_control.get_value && company_control.get_value();
		if (!cmp) { shipping_address_ctrl.set_value && shipping_address_ctrl.set_value(''); return; }
		frappe.call({
			method: 'frappe.client.get_list',
			args: {
				doctype: 'Dynamic Link',
				fields: ['parent'],
				filters: { link_doctype: 'Company', link_name: cmp, parenttype: 'Address' },
				limit_page_length: 1
			},
			callback: (r) => {
				const addr = r && r.message && r.message[0] && r.message[0].parent;
				if (addr && shipping_address_ctrl.set_value) shipping_address_ctrl.set_value(addr);
			}
		});
	});

	const table = $('<div class="table-responsive"><table class="table table-bordered table-sm"><thead><tr>\
		<th>' + __('Item') + '</th><th class="text-right">' + __('Rate') + '</th>\
		<th class="text-right">' + __('Qty') + '</th><th class="text-right">' + __('Amount') + '</th><th></th>\
	</thead><tbody></tbody><tfoot><tr><td colspan="3" class="text-right"><b>' + __('Total') + '</b></td><td class="text-right pd-po-total">0</td><td></td></tr></tfoot></table></div>');
	$box.append(table);

	const taxes_table = $('<div class="table-responsive" style="margin-top:10px"><table class="table table-bordered table-sm"><thead><tr>\
		<th style="width:40px">#</th><th>' + __('Type') + '</th><th>' + __('Account Head') + '</th>\
		<th class="text-right">' + __('Rate') + '</th><th class="text-right">' + __('Amount') + '</th>\
	</thead><tbody class="pd-po-taxes-body"><tr><td colspan="5" class="text-center text-muted">' + __('No Data') + '</td></table></tbody>\
	<tfoot><tr><td colspan="4" class="text-right"><b>' + __('Total Taxes and Charges') + '</b></td><td class="text-right pd-po-taxes-total">0</td></tr></tfoot></table></div>');
	$box.append(taxes_table);

	const actions = $('<div class="d-flex" style="gap:12px; justify-content:flex-end; margin-top:16px; padding: 16px; background: var(--control-bg); border-radius: 8px; border: 1px solid var(--border-color);"></div>');
	const create_btn = $('<button class="btn btn-primary">' + __('Create') + ' ' + __(doctype) + '</button>');
	const clear_btn = $('<button class="btn btn-default">' + __('Clear') + '</button>');
	actions.append(clear_btn).append(create_btn);
	$box.append(actions);

	$box.data('state', { doctype, items: [], supplier_control, company_control, schedule_control, taxes_control, supplier_address_ctrl, shipping_address_ctrl, taxes: [], tbody: table.find('tbody'), taxes_tbody: taxes_table.find('.pd-po-taxes-body'), taxes_total_el: taxes_table.find('.pd-po-taxes-total') });
	clear_btn.on('click', () => { $box.data('state').items = []; render_po_table($box); });
	create_btn.on('click', () => create_purchase_document($box));

	$(taxes_control.$input).on('awesomplete-selectcomplete', () => {
		const raw_value = taxes_control.get_value && taxes_control.get_value();
		if (!raw_value) { $box.data('state').taxes = []; $box.data('state').taxes_template_name = ''; render_po_taxes_table($box); return; }
		resolve_taxes_template_name(raw_value, (resolved) => {
			$box.data('state').taxes_template_name = resolved || raw_value;
			if (!resolved) { $box.data('state').taxes = []; render_po_taxes_table($box); return; }
			fetch_purchase_taxes(resolved, (taxes) => { $box.data('state').taxes = taxes || []; render_po_taxes_table($box); });
		});
	});
	$(company_control.$input).on('change', () => { if (taxes_control && taxes_control.set_value) taxes_control.set_value(''); });
	$box.show();
}

function render_po_taxes_table($box) {
	const state = $box.data('state');
	const tbody = state.taxes_tbody;
	if (!tbody) return;
	const taxes = state.taxes || [];
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
		if (tx.charge_type === 'On Net Total') amount = net_total * ((tx.rate || 0) / 100.0);
		else amount = tx.tax_amount != null ? tx.tax_amount : (tx.base_tax_amount != null ? tx.base_tax_amount : 0);
		total += (parseFloat(amount) || 0);
		tbody.append($('<tr>\
							<td class="text-center">' + (idx + 1) + '</td>\
							<td class="text-left">' + frappe.utils.escape_html(tx.charge_type || '') + '</td>\
							<td class="text-left">' + frappe.utils.escape_html(tx.account_head || '') + '</td>\
							<td class="text-right">' + (tx.rate != null ? tx.rate : '') + '</td>\
							<td class="text-right">' + format_currency(amount) + '</td>\
						进化'));
	});
	if (state.taxes_total_el) state.taxes_total_el.text(format_currency(total));
}

function fetch_purchase_taxes(template_name, callback) {
	frappe.call({
		method: 'erpnext.controllers.accounts_controller.get_taxes_and_charges',
		args: { master_doctype: 'Purchase Taxes and Charges Template', master_name: template_name },
		callback: (r) => {
			const taxes = (r && r.message && r.message.taxes) ? r.message.taxes : (r && r.message ? r.message : []);
			if (callback) callback(taxes || []);
		}
	});
}

function resolve_taxes_template_name(input_value, callback) {
	if (!input_value) { if (callback) callback(null); return; }
	frappe.call({
		method: 'frappe.client.get_list',
		args: { doctype: 'Purchase Taxes and Charges Template', fields: ['name'], filters: [['Purchase Taxes and Charges Template', 'name', '=', input_value]], limit_page_length: 1 },
		callback: (r) => {
			const exists = r && r.message && r.message.length ? r.message[0].name : null;
			if (exists) { if (callback) callback(exists); return; }
			frappe.call({
				method: 'frappe.client.get_list',
				args: { doctype: 'Purchase Taxes and Charges Template', fields: ['name'], filters: [['Purchase Taxes and Charges Template', 'title', '=', input_value]], limit_page_length: 1 },
				callback: (r2) => { if (callback) callback(r2 && r2.message && r2.message.length ? r2.message[0].name : null); }
			});
		}
	});
}

function fetch_item_buying_rate(item_code, supplier, callback, companyOverride) {
	const get_default = (key) => (frappe.defaults && frappe.defaults.get_default) ? frappe.defaults.get_default(key) : null;
	const company = companyOverride || get_default('company');
	const sys_currency = (frappe.boot && frappe.boot.sysdefaults && (frappe.boot.sysdefaults.currency || frappe.boot.sysdefaults.default_currency)) || 'SAR';
	frappe.call({
		method: 'erpnext.stock.get_item_details.get_item_details',
		args: { args: { doctype: 'Purchase Order', item_code, company, price_list: get_default('buying_price_list'), currency: sys_currency, price_list_currency: sys_currency, conversion_rate: 1, plc_conversion_rate: 1, transaction_date: frappe.datetime.get_today(), qty: 1, supplier } },
		callback: (r) => {
			const d = r && r.message;
			if (callback) { const rate = d && (d.rate != null ? d.rate : d.price_list_rate); callback(rate != null ? rate : null, d && d.currency ? d.currency : null, d || {}); }
		}
	});
}

function purchase_add_item($box, item) {
	const state = $box.data('state');
	if (!state) return;
	state.conversion_rate = 1;
	const existing = state.items.find(it => it.item_code === item.name);
	if (existing) { existing.qty += 1; }
	else {
		const new_row = { item_code: item.name, item_name: item.item_name || item.name, rate: item.standard_rate || 0, uom: item.stock_uom || '', qty: 1 };
		state.items.push(new_row);
		const supplier = state.supplier_control && state.supplier_control.get_value ? state.supplier_control.get_value() : null;
		const company = state.company_control && state.company_control.get_value ? state.company_control.get_value() : null;
		fetch_item_buying_rate(item.name, supplier, (rate) => { if (rate != null) { new_row.rate = rate; render_po_table($box); } }, company);
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
							<td class="text-left">' + frappe.utils.escape_html(row.item_name) + '</td>\
							<td class="text-right"><input type="number" step="0.01" class="form-control input-sm pd-rate" style="max-width:120px; margin-left:auto" value="' + (row.rate || 0) + '"></td>\
							<td class="text-right"><input type="number" step="1" class="form-control input-sm pd-qty" style="max-width:100px; margin-left:auto" value="' + (row.qty || 1) + '"></td>\
							<td class="text-right">' + format_currency(amount) + '</td>\
							<td class="text-right"><button class="btn btn-xs btn-danger pd-remove">' + __('Remove') + '</button></td>\
						进化');
		$tr.find('.pd-rate').on('input', (e) => { row.rate = parseFloat(e.target.value || '0'); render_po_table($box); });
		$tr.find('.pd-qty').on('input', (e) => { row.qty = parseFloat(e.target.value || '0'); render_po_table($box); });
		$tr.find('.pd-remove').on('click', () => { state.items.splice(idx, 1); render_po_table($box); });
		tbody.append($tr);
	});
	$box.find('.pd-po-total').text(format_currency(total));
	render_po_taxes_table($box);
}

function create_purchase_document($box) {
	const state = $box.data('state');
	if (!state) return;
	const supplier = state.supplier_control.get_value();
	if (!supplier) { frappe.msgprint(__('Please select a Supplier')); return; }
	if (!state.items.length) { frappe.msgprint(__('Please add at least one item')); return; }
	const get_default = (key) => (frappe.defaults && frappe.defaults.get_default) ? frappe.defaults.get_default(key) : null;
	const company = state.company_control && state.company_control.get_value ? state.company_control.get_value() : get_default('company');
	const sys_currency = (frappe.boot && frappe.boot.sysdefaults && (frappe.boot.sysdefaults.currency || frappe.boot.sysdefaults.default_currency)) || 'SAR';
	const schedule_date = state.schedule_control.get_value() || frappe.datetime.get_today();
	const supplier_address = (state.supplier_address_ctrl && state.supplier_address_ctrl.get_value ? state.supplier_address_ctrl.get_value() : null) || get_default('supplier_address') || undefined;
	const shipping_address = (state.shipping_address_ctrl && state.shipping_address_ctrl.get_value ? state.shipping_address_ctrl.get_value() : null) || get_default('company_address') || undefined;
	
	const items = state.items.map(r => ({
		item_code: r.item_code, 
		qty: r.qty || 1, 
		rate: r.rate || 0,
		amount: (r.qty || 1) * (r.rate || 0),
		schedule_date, 
		uom: r.uom
	}));
	
	const doc = {
		doctype: state.doctype || 'Purchase Order',
		supplier, company: company || undefined,
		buying_price_list: get_default('buying_price_list') || undefined,
		currency: sys_currency, price_list_currency: sys_currency,
		conversion_rate: state.conversion_rate || 1, plc_conversion_rate: 1,
		transaction_date: frappe.datetime.get_today(),
		items: items,
		taxes_and_charges: state.taxes_template_name || (state.taxes_control && state.taxes_control.get_value ? state.taxes_control.get_value() : undefined),
		taxes: (state.taxes && state.taxes.length) ? state.taxes : undefined,
		supplier_address: supplier_address || undefined,
		shipping_address: shipping_address || undefined,
	};
	
	frappe.call({
		method: 'frappe.client.insert',
		args: { doc },
		freeze: true,
		callback: (r) => {
			if (r && r.message) {
				const created = r.message;
				frappe.call({
					method: 'frappe.client.submit',
					args: { doc: created },
					freeze: true,
					callback: (s) => {
						const submitted = (s && s.message) ? s.message : created;
						frappe.show_alert({ message: __(state.doctype + ' {0} submitted', [submitted.name]), indicator: 'green' });
						
						state.items = []; 
						render_po_table($box);
						
						const $activePane = $box.closest('.tab-pane');
						if ($activePane.length) {
							const listContainer = $activePane.find('.result-list');
							if (listContainer.length) {
								const label = $activePane.closest('.purchase-data-tabs').find('.nav-link.active').text().trim();
								const doctypeMap = {
									'Purchase Order': 'Purchase Order',
									'Purchase Receipt': 'Purchase Receipt',
									'Purchase Invoice': 'Purchase Invoice'
								};
								const doctypeName = doctypeMap[label];
								const supplierFilter = $activePane.find('input[data-fieldname="supplier_filter"]').val();
								if (doctypeName) {
									load_docs_into(listContainer, doctypeName, supplierFilter || '', label);
								}
							}
						}
						
						const _page = get_page(); 
						if (_page) refresh_active_tab(_page);
					}
				}).fail(() => {
					frappe.show_alert({ message: __(state.doctype + ' {0} created (not submitted)', [created.name]), indicator: 'orange' });
					state.items = []; 
					render_po_table($box);
					const _page = get_page(); 
					if (_page) refresh_active_tab(_page);
				});
			}
		}
	});
}

function create_doc_inline(doctype, on_created) {
	if (frappe.ui.form && frappe.ui.form.make_quick_entry) {
		frappe.ui.form.make_quick_entry(doctype, null, null, null, {
			after_insert: (doc) => { frappe.show_alert({ message: __('Created {0}', [doc.name]), indicator: 'green' }); if (on_created) on_created(doc); }
		});
		return;
	}
	frappe.msgprint({ message: __('Quick Entry not available. Please enable Quick Entry for {0} or open the full form from the list item.', [doctype]), indicator: 'orange' });
}

function open_doc_preview_dialog(doctype, name) {
	const d = new frappe.ui.Dialog({ title: __(doctype) + ' ' + name, size: 'large' });
	d.$body.append($('<div class="text-muted">' + __('Loading...') + '</div>'));
	frappe.call({
		method: 'frappe.client.get',
		args: { doctype, name },
		callback: (r) => {
			const doc = r && r.message;
			if (!doc) { d.$body.empty().append($('<div class="text-danger">' + __('Failed to load document') + '</div>')); return; }
			render_doc_preview(d, doctype, doc);
		}
	});
	d.show();
}

function render_doc_preview(dialog, doctype, doc) {
	const $body = dialog.$body.empty();
	const is_draft = doc.docstatus === 0;

	const edit_state = {
		tc_name: doc.tc_name || '',
		terms: doc.terms || '',
		mutable_items: (doc.items || []).map(it => Object.assign({}, it))
	};

	if (is_draft) {
		$body.append('<div class="pd-draft-notice">✏️ ' + __('This document is in Draft state. You can edit fields below and save changes.') + '</div>');
	}

	const meta_keys = ['supplier', 'posting_date', 'transaction_date', 'due_date', 'schedule_date', 'status', 'grand_total', 'currency', 'company'];
	const meta_rows = [];
	meta_keys.forEach(key => {
		if (doc[key] != null) {
			const label = frappe.meta.get_label ? (frappe.meta.get_label(doctype, key) || key) : key;
			meta_rows.push({ key, label, value: doc[key] });
		}
	});
	const details_html = '<div class="frappe-control">' +
		meta_rows.map(r =>
			'<div class="row" style="margin-bottom:6px">' +
			'<div class="col-sm-4 text-muted">' + frappe.utils.escape_html(r.label) + '</div>' +
			'<div class="col-sm-8" style="color:var(--text-color)">' + frappe.utils.escape_html(r.value != null ? ('' + r.value) : '') + '</div>' +
			'</div>'
		).join('') + '</div>';
	$body.append(details_html);

	if (doc.terms) {
		doc.terms = strip_html_tags(doc.terms);
	}

	const has_address = ['Purchase Order', 'Purchase Receipt', 'Purchase Invoice', 'Supplier Quotation', 'Request for Quotation'].includes(doctype);

	if (has_address) {
		const $address_section = $('<div class="pd-preview-section"></div>');
		$address_section.append('<div class="pd-preview-section-title">' + __('Addresses') + '</div>');
		const $addr_row = $('<div class="row"></div>');

		const $sup_addr_col = $('<div class="col-md-6"></div>');
		const $sup_addr_card = $('<div class="pd-card" style="color: var(--text-color); background: var(--card-bg); border: 1px solid var(--border-color);"></div>');
		$sup_addr_card.append('<div style="font-weight:600; margin-bottom:8px; color: var(--text-color);">' + __('Supplier Address') + '</div>');

		if (is_draft) {
			const $sup_addr_ctrl_wrap = $('<div></div>');
			$sup_addr_card.append($sup_addr_ctrl_wrap);
			const sup_addr_ctrl = frappe.ui.form.make_control({
				parent: $sup_addr_ctrl_wrap.get(0),
				df: {
					label: __('Supplier Address'),
					fieldname: 'supplier_address',
					fieldtype: 'Link',
					options: 'Address',
					placeholder: __('Select Supplier Address'),
					get_query: () => {
						const sup = doc.supplier || '';
						return {
							query: 'frappe.contacts.doctype.address.address.address_query',
							filters: { link_doctype: 'Supplier', link_name: sup }
						};
					}
				},
				only_input: false
			});
			sup_addr_ctrl.refresh();
			if (doc.supplier_address) sup_addr_ctrl.set_value(doc.supplier_address);
			$(sup_addr_ctrl.$input).on('change', function () {
				doc.supplier_address = sup_addr_ctrl.get_value();
				const val = sup_addr_ctrl.get_value();
				if (!val) { $sup_addr_display.text(''); return; }
				frappe.db.get_doc('Address', val).then(addr_doc => {
					$sup_addr_display.text(format_address_display(addr_doc));
				});
			});
			const $sup_addr_display = $('<div style="margin-top:8px; font-size:13px; color:var(--text-muted); white-space:pre-line"></div>');
			if (doc.address_display || doc.supplier_address_display) {
				$sup_addr_display.text(strip_html_tags(doc.address_display || doc.supplier_address_display || ''));
			}
			$sup_addr_card.append($sup_addr_display);
		} else {
			if (!doc.address_display && !doc.supplier_address_display) {
				$sup_addr_card.append('<div class="text-muted">' + __('No Supplier Address') + '</div>');
			}
		}

		$sup_addr_col.append($sup_addr_card);
		$addr_row.append($sup_addr_col);

		const $ship_addr_col = $('<div class="col-md-6"></div>');
		const $ship_addr_card = $('<div class="pd-card" style="color: var(--text-color); background: var(--card-bg); border: 1px solid var(--border-color);"></div>');
		$ship_addr_card.append('<div style="font-weight:600; margin-bottom:8px; color: var(--text-color);">' + __('Shipping Address') + '</div>');

		if (is_draft) {
			const $ship_addr_ctrl_wrap = $('<div></div>');
			$ship_addr_card.append($ship_addr_ctrl_wrap);
			const ship_addr_ctrl = frappe.ui.form.make_control({
				parent: $ship_addr_ctrl_wrap.get(0),
				df: {
					label: __('Shipping Address'),
					fieldname: 'shipping_address',
					fieldtype: 'Link',
					options: 'Address',
					placeholder: __('Select Shipping Address'),
					get_query: () => {
						const cmp = doc.company || '';
						return {
							query: 'frappe.contacts.doctype.address.address.address_query',
							filters: { link_doctype: 'Company', link_name: cmp }
						};
					}
				},
				only_input: false
			});
			ship_addr_ctrl.refresh();
			if (doc.shipping_address) ship_addr_ctrl.set_value(doc.shipping_address);
			$(ship_addr_ctrl.$input).on('change', function () {
				doc.shipping_address = ship_addr_ctrl.get_value();
				const val = ship_addr_ctrl.get_value();
				if (!val) { $ship_addr_display.text(''); return; }
				frappe.db.get_doc('Address', val).then(addr_doc => {
					$ship_addr_display.text(format_address_display(addr_doc));
				});
			});
			const $ship_addr_display = $('<div style="margin-top:8px; font-size:13px; color:var(--text-muted); white-space:pre-line"></div>');
			if (doc.shipping_address_display) {
				$ship_addr_display.text(strip_html_tags(doc.shipping_address_display || ''));
			}
			$ship_addr_card.append($ship_addr_display);
		} else {
			if (!doc.shipping_address_display) {
				$ship_addr_card.append('<div class="text-muted">' + __('No Shipping Address') + '</div>');
			}
		}

		$ship_addr_col.append($ship_addr_card);
		$addr_row.append($ship_addr_col);

		$address_section.append($addr_row);
		$body.append($address_section);
	}

	const is_rfq = doctype === 'Request for Quotation';
	const has_warehouse_col = ['Purchase Receipt', 'Purchase Invoice', 'Purchase Order', 'Request for Quotation', 'Supplier Quotation'].includes(doctype);
	const has_rate_col = !is_rfq;
	const has_schedule_col = is_draft && ['Purchase Order', 'Request for Quotation', 'Supplier Quotation'].includes(doctype);

	const $items_section = $('<div class="pd-preview-section"></div>');
	$items_section.append('<div class="pd-preview-section-title">' + __('Items') + '</div>');

	let th = '<th>' + __('Item') + '</th><th class="text-right">' + __('Qty') + '</th><th>' + __('UOM') + '</th>';
	if (has_rate_col) th += '<th class="text-right">' + __('Rate') + '</th>';
	if (has_warehouse_col) th += '<th>' + __('Warehouse') + '</th>';
	if (has_schedule_col) th += '<th>' + __('Req. Date') + '</th>';
	if (has_rate_col) th += '<th class="text-right">' + __('Amount') + '</th>';
	if (is_draft) th += '<th style="width:60px"></th>';

	const $items_table_wrap = $('<div class="table-responsive"><table class="table table-bordered table-sm"><thead><tr>' + th + '</tr></thead><tbody class="pd-preview-items-tbody"></tbody>' + (has_rate_col ? '<tfoot><tr><td colspan="' + (3 + (has_rate_col ? 1 : 0) + (has_warehouse_col ? 1 : 0) + (has_schedule_col ? 1 : 0)) + '" class="text-right"><b>' + __('Net Total') + '</b></td><td class="text-right pd-preview-net-total"></td>' + (is_draft ? '<td></td>' : '') + '</tr></tfoot>' : '') + '</table></div>');
	$items_section.append($items_table_wrap);
	const $items_tbody = $items_table_wrap.find('.pd-preview-items-tbody');

	const recalc_net_total = () => {
		let net = 0;
		edit_state.mutable_items.forEach(it => { net += (it.rate || 0) * (it.qty || 0); });
		$items_table_wrap.find('.pd-preview-net-total').text(format_currency(net));
	};

	const render_items_rows = () => {
		$items_tbody.empty();
		if (!edit_state.mutable_items.length) {
			const col_count = 3 + (has_rate_col ? 1 : 0) + (has_warehouse_col ? 1 : 0) + (has_schedule_col ? 1 : 0) + (has_rate_col ? 1 : 0) + (is_draft ? 1 : 0);
			$items_tbody.append('<tr><td colspan="' + col_count + '" class="text-center text-muted">' + __('No items') + '</td></tr>');
			recalc_net_total();
			return;
		}
		edit_state.mutable_items.forEach((it, idx) => {
			const computed_amount = (it.rate || 0) * (it.qty || 0);
			const display_amount = (it.amount != null ? it.amount : computed_amount);

			let tds = '';
			if (is_draft) {
				if (it.__is_new) {
					tds += '<td style="min-width:260px"><div class="pd-prev-item-control"></div></td>';
				} else {
					tds += '<td style="min-width:140px"><div style="font-weight:600;font-size:13px;color:var(--text-color)">' + frappe.utils.escape_html(it.item_name || it.item_code || '') + '</div>';
					if (it.item_code && it.item_name && it.item_code !== it.item_name) {
						tds += '<div style="font-size:11px;color:var(--text-muted)">' + frappe.utils.escape_html(it.item_code) + '</div>';
					}
					tds += '</div></td>';
				}
				tds += '<td style="min-width:90px"><input type="number" step="0.001" min="0" class="form-control input-sm pd-prev-qty" value="' + (it.qty || 1) + '"></td>';
				tds += '<td style="min-width:70px"><input type="text" class="form-control input-sm pd-prev-uom" value="' + frappe.utils.escape_html(it.uom || '') + '"></td>';
				if (has_rate_col) {
					tds += '<td style="min-width:100px"><input type="number" step="0.01" min="0" class="form-control input-sm pd-prev-rate" value="' + (it.rate || 0) + '"></td>';
				}
				if (has_warehouse_col) {
					tds += '<td style="min-width:220px"><div class="pd-prev-wh-control"></div></td>';
				}
				if (has_schedule_col) {
					tds += '<td style="min-width:120px"><input type="date" class="form-control input-sm pd-prev-sched" value="' + frappe.utils.escape_html(it.schedule_date || doc.schedule_date || frappe.datetime.get_today()) + '"></td>';
				}
				if (has_rate_col) {
					tds += '<td class="text-right pd-prev-amount" style="min-width:90px;white-space:nowrap">' + format_currency(computed_amount) + '</td>';
				}
				tds += '<td class="text-center"><button class="btn btn-xs btn-danger pd-prev-remove" title="' + __('Remove') + '">✕</button></td>';
			} else {
				tds += '<td><div style="font-weight:600;font-size:13px">' + frappe.utils.escape_html(it.item_name || it.item_code || '') + '</div>';
				if (it.item_code && it.item_name && it.item_code !== it.item_name) {
					tds += '<div style="font-size:11px;color:var(--text-muted)">' + frappe.utils.escape_html(it.item_code) + '</div>';
				}
				tds += '</div></td>';
				tds += '<td class="text-right">' + (it.qty != null ? it.qty : '') + '</td>';
				tds += '<td class="text-left">' + frappe.utils.escape_html(it.uom || '') + '</td>';
				if (has_rate_col) tds += '<td class="text-right">' + (it.rate != null ? it.rate : '') + '</td>';
				if (has_warehouse_col) tds += '<td class="text-left">' + frappe.utils.escape_html(it.warehouse || '') + '</td>';
				if (has_rate_col) tds += '<td class="text-right">' + format_currency(display_amount) + '</td>';
			}

			const $tr = $('<tr>' + tds + '</tr>');
			$items_tbody.append($tr);
			if (is_draft && it.__is_new) {
				const itemParent = $tr.find('.pd-prev-item-control').get(0);
				if (itemParent) {
					const itemCtrl = frappe.ui.form.make_control({
						parent: itemParent,
						df: {
							label: __('Item'),
							fieldname: 'item_code',
							fieldtype: 'Link',
							options: 'Item',
							get_query: () => ({
								filters: {
									disabled: 0,
									is_stock_item: 1
								}
							})
						},
						only_input: false
					});
					itemCtrl.refresh();
					$(itemCtrl.$input).on('change', function () {
						const value = itemCtrl.get_value();
						if (!value) return;
						frappe.db.get_doc('Item', value).then(itemDoc => {
							edit_state.mutable_items[idx].item_code = itemDoc.name;
							edit_state.mutable_items[idx].item_name = itemDoc.item_name || itemDoc.name;
							edit_state.mutable_items[idx].uom = itemDoc.stock_uom || 'Nos';
							edit_state.mutable_items[idx].__is_new = false;
							render_items_rows();
						});
					});
				}
			}
			if (is_draft && has_warehouse_col) {
				const whParent = $tr.find('.pd-prev-wh-control').get(0);
				if (whParent) {
					const whCtrl = frappe.ui.form.make_control({
						parent: whParent,
						df: {
							label: __('Warehouse'),
							fieldname: 'warehouse',
							fieldtype: 'Link',
							options: 'Warehouse',
							get_query: () => ({
								filters: {
									company: doc.company,
									is_group: 0
								}
							})
						},
						only_input: false
					});
					whCtrl.refresh();
					if (it.warehouse && whCtrl.set_value) {
						whCtrl.set_value(it.warehouse);
					}
					$(whCtrl.$input).on('change', function () {
						edit_state.mutable_items[idx].warehouse = whCtrl.get_value();
					});
				}
			}
			if (is_draft) {
				const update_amount = () => {
					const r = edit_state.mutable_items[idx].rate || 0;
					const q = edit_state.mutable_items[idx].qty || 0;
					const a = r * q;
					edit_state.mutable_items[idx].amount = a;
					$tr.find('.pd-prev-amount').text(format_currency(a));
					recalc_net_total();
				};
				$tr.find('.pd-prev-qty').on('input', function () {
					edit_state.mutable_items[idx].qty = parseFloat($(this).val()) || 0;
					update_amount();
				});
				$tr.find('.pd-prev-rate').on('input', function () {
					edit_state.mutable_items[idx].rate = parseFloat($(this).val()) || 0;
					update_amount();
				});
				$tr.find('.pd-prev-uom').on('input', function () {
					edit_state.mutable_items[idx].uom = $(this).val();
				});
				$tr.find('.pd-prev-sched').on('input', function () {
					edit_state.mutable_items[idx].schedule_date = $(this).val();
				});
				$tr.find('.pd-prev-remove').on('click', function () {
					edit_state.mutable_items.splice(idx, 1);
					render_items_rows();
				});
				update_amount();
			}
		});
		recalc_net_total();
	};

	render_items_rows();
	$body.append($items_section);

	if (is_draft) {
		const $add_btn = $('<button class="btn btn-default" style="margin-top:10px">' + __('Add Item') + '</button>');
		$add_btn.on('click', function () {
			edit_state.mutable_items.push({
				__is_new: true,
				item_code: '',
				item_name: '',
				qty: 1,
				uom: 'Nos',
				rate: 0,
				warehouse: '',
				schedule_date: frappe.datetime.get_today()
			});
			render_items_rows();
		});
		$items_section.append($add_btn);
	}

	if (doctype === 'Purchase Order' || doctype === 'Purchase Invoice' || doctype === 'Supplier Quotation' || doctype === 'Request for Quotation') {
		const $terms_section = $('<div class="pd-preview-section"></div>');
		$terms_section.append('<div class="pd-preview-section-title">' + __('Terms & Conditions') + '</div>');

		if (is_draft) {
			const $tc_wrap = $('<div style="max-width:400px;margin-bottom:12px"></div>');
			$terms_section.append($tc_wrap);
			const tcCtrl = frappe.ui.form.make_control({
				parent: $tc_wrap.get(0),
				df: {
					label: __('Terms and Conditions Template'),
					fieldname: 'tc_name',
					fieldtype: 'Link',
					options: 'Terms and Conditions',
					get_query: () => ({
						filters: {
							buying: 1
						}
					})
				},
				only_input: false
			});
			tcCtrl.refresh();
			if (edit_state.tc_name) {
				tcCtrl.set_value(edit_state.tc_name);
			}
			const $textarea = $('<textarea class="form-control" rows="6"></textarea>');
			$textarea.val(edit_state.terms || '');
			$textarea.on('input', function () {
				edit_state.terms = $(this).val();
			});
			$(tcCtrl.$input).on('awesomplete-selectcomplete change', function () {
				const val = tcCtrl.get_value();
				edit_state.tc_name = val;
				if (!val) return;
				frappe.db.get_doc('Terms and Conditions', val).then(tcDoc => {
					edit_state.terms = tcDoc.terms || '';
					$textarea.val(edit_state.terms);
				});
			});
			$terms_section.append($textarea);
		} else {
			$terms_section.append('<div class="pd-card" style="white-space:pre-line">' + frappe.utils.escape_html(doc.terms || '') + '</div>');
		}
		$body.append($terms_section);
	}

	if (is_draft) {
		const $save_wrap = $('<div style="margin-top:20px;text-align:right"></div>');
		const $save_btn = $('<button class="btn btn-primary">' + __('Save Changes') + '</button>');
		$save_btn.on('click', function () {
			doc.items = edit_state.mutable_items.map(it => ({
				item_code: it.item_code,
				item_name: it.item_name,
				qty: it.qty,
				uom: it.uom,
				rate: it.rate,
				warehouse: it.warehouse,
				schedule_date: it.schedule_date
			}));
			doc.tc_name = edit_state.tc_name;
			doc.terms = edit_state.terms;
			frappe.call({
				method: 'frappe.client.save',
				args: { doc: doc },
				freeze: true,
				callback: function () {
					frappe.show_alert({ message: __('Document Updated'), indicator: 'green' });
					dialog.hide();
					const page = get_page();
					if (page) refresh_active_tab(page);
				}
			});
		});
		$save_wrap.append($save_btn);
		$body.append($save_wrap);
	}

	const $actions = $('<div class="d-flex" style="gap:8px; justify-content:flex-end; margin-top:20px; flex-wrap:wrap; padding-top:16px; border-top:1px solid var(--border-color);"></div>');

	if (doctype === 'Request for Quotation') {
		if (doc.docstatus === 0 && doc.status === 'Draft') {
			const $submit_btn = $('<button class="btn btn-primary">' + __('Submit') + '</button>');
			$submit_btn.on('click', () => {
				frappe.call({
					method: 'frappe.client.submit', args: { doc }, freeze: true,
					callback: (r) => {
						if (r && r.message) {
							frappe.show_alert({ message: __('RFQ {0} submitted', [r.message.name]), indicator: 'green' });
							dialog.hide();
							const _page = get_page(); if (_page) refresh_active_tab(_page);
						}
					},
					error: (err) => { frappe.msgprint({ title: __('Error'), message: __('Error submitting RFQ: {0}', [err.message || 'Unknown error']), indicator: 'red' }); }
				});
			});
			$actions.append($submit_btn);
		}
		if (doc.docstatus === 1 || doc.status === 'Open' || doc.status === 'Submitted') {
			const $sq_btn = $('<button class="btn btn-primary">' + __('Create Supplier Quotation') + '</button>');
			$sq_btn.on('click', () => create_sq_from_rfq(doc, dialog));
			$actions.append($sq_btn);
		}
	}

	if (doctype === 'Supplier Quotation') {
		if (doc.docstatus === 0 && doc.status === 'Draft') {
			const $submit_btn = $('<button class="btn btn-primary">' + __('Submit') + '</button>');
			$submit_btn.on('click', () => {
				frappe.call({
					method: 'frappe.client.submit', args: { doc }, freeze: true,
					callback: (r) => {
						if (r && r.message) {
							frappe.show_alert({ message: __('Supplier Quotation {0} submitted', [r.message.name]), indicator: 'green' });
							dialog.hide();
							const _page = get_page(); if (_page) refresh_active_tab(_page);
						}
					},
					error: (err) => { frappe.msgprint({ title: __('Error'), message: __('Error submitting Supplier Quotation: {0}', [err.message || 'Unknown error']), indicator: 'red' }); }
				});
			});
			$actions.append($submit_btn);
		}
		if (doc.docstatus === 1 || doc.status === 'Submitted') {
			const $po_btn = $('<button class="btn btn-primary">' + __('Create Purchase Order') + '</button>');
			$po_btn.on('click', () => create_po_from_sq(doc, dialog));
			$actions.append($po_btn);
		}
	}

	if (doctype === 'Purchase Order') {
		if (doc.docstatus === 1 || doc.status === 'To Receive and Bill' || doc.status === 'To Receive') {
			const $pr_btn = $('<button class="btn btn-primary">' + __('Create Purchase Receipt') + '</button>');
			$pr_btn.on('click', () => create_pr_from_po(doc.name, dialog));
			$actions.append($pr_btn);
		}
	}

	if (doctype === 'Purchase Receipt') {
		if (doc.docstatus === 1 || doc.status === 'To Bill') {
			const $pi_btn = $('<button class="btn btn-primary">' + __('Create Purchase Invoice') + '</button>');
			$pi_btn.on('click', () => create_pi_from_pr(doc.name, dialog));
			$actions.append($pi_btn);
		}
	}

	if ($actions.children().length) $body.append($actions);
}

function render_preview_taxes_table($container, taxes, doc) {
	$container.empty();
	if (!taxes || !taxes.length) {
		$container.append('<div class="text-muted" style="font-size:13px">' + __('No taxes applied') + '</div>');
		return;
	}
	let net_total = 0;
	(doc.items || []).forEach(it => { net_total += (it.rate || 0) * (it.qty || 0); });
	let html = '<div class="table-responsive"><table class="table table-bordered table-sm"><thead><tr>' +
		'<th>#</th><th>' + __('Type') + '</th><th>' + __('Account Head') + '</th>' +
		'<th class="text-right">' + __('Rate %') + '</th><th class="text-right">' + __('Amount') + '</th>' +
		'</thead><tbody>';
	let total = 0;
	taxes.forEach((tx, idx) => {
		let amount = 0;
		if (tx.charge_type === 'On Net Total') amount = net_total * ((tx.rate || 0) / 100.0);
		else amount = tx.tax_amount != null ? tx.tax_amount : (tx.base_tax_amount != null ? tx.base_tax_amount : 0);
		total += parseFloat(amount) || 0;
		html += '</tr>\
					<td class="text-center">' + (idx + 1) + '</td>\
					<td class="text-left">' + frappe.utils.escape_html(tx.charge_type || '') + '</td>\
					<td class="text-left">' + frappe.utils.escape_html(tx.account_head || '') + '</td>\
					<td class="text-right">' + (tx.rate != null ? tx.rate : '') + '</td>\
					<td class="text-right">' + format_currency(amount) + '</td>\
				</tr>';
	});
	html += '</tbody><tfoot><tr><td colspan="4" class="text-right"><b>' + __('Total Taxes') + '</b></td><td class="text-right"><b>' + format_currency(total) + '</b></td></tfoot></table></div>';
	$container.append(html);
}

function create_pr_from_po(po_name, dialog) {
	if (!po_name) return;
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
					// Correct field names for Purchase Receipt Item
					purchase_order: po_name,
					purchase_order_item: it.name,
					// Also carry forward RFQ references if present on PO item
					request_for_quotation: it.request_for_quotation || undefined,
					request_for_quotation_item: it.request_for_quotation_item || undefined,
					// Carry forward SQ references if present on PO item
					supplier_quotation: it.supplier_quotation || undefined,
					supplier_quotation_item: it.supplier_quotation_item || undefined
				}))
			};
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
					frappe.call({
						method: 'frappe.client.submit', 
						args: { doc: inserted }, 
						freeze: true,
						callback: (sub) => {
							frappe.show_alert({ 
								message: __('Purchase Receipt {0} submitted', [(sub && sub.message ? sub.message : inserted).name]), 
								indicator: 'green' 
							});
							if (dialog) dialog.hide();
							const _page = get_page(); 
							if (_page) refresh_active_tab(_page);
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
					description: it.description,
					// Purchase Receipt references
					purchase_receipt: pr_name,
					pr_detail: it.name,
					// Purchase Order references (carried from PR)
					purchase_order: it.purchase_order || undefined,
					po_detail: it.purchase_order_item || undefined,
					// RFQ references (carried from PR if present)
					request_for_quotation: it.request_for_quotation || undefined,
					request_for_quotation_item: it.request_for_quotation_item || undefined,
					// SQ references (carried from PR if present)
					supplier_quotation: it.supplier_quotation || undefined,
					supplier_quotation_item: it.supplier_quotation_item || undefined
				}))
			};
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
					frappe.call({
						method: 'frappe.client.submit', 
						args: { doc: inserted }, 
						freeze: true,
						callback: (sub) => {
							frappe.show_alert({ 
								message: __('Purchase Invoice {0} submitted', [(sub && sub.message ? sub.message : inserted).name]), 
								indicator: 'green' 
							});
							if (dialog) dialog.hide();
							const _page = get_page(); 
							if (_page) refresh_active_tab(_page);
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

function show_create_sq_option(submitted_rfq, page) {
	const d = new frappe.ui.Dialog({ 
		title: __('RFQ Submitted Successfully'), 
		size: 'small'
	});
	d.$body.append($('<div class="text-center" style="padding: 20px; color: var(--text-color);">\
		<div class="mb-3" style="color: var(--text-color);">' + __('RFQ {0} has been submitted.', [submitted_rfq.name]) + '</div>\
		<div class="mb-3" style="color: var(--text-color);">' + __('Would you like to create Supplier Quotations for the suppliers?') + '</div>\
	</div>'));
	d.set_primary_action(__('Create Supplier Quotations'), () => { 
		d.hide(); 
		create_sq_from_rfq(submitted_rfq, null); 
	});
	d.show();
}

function create_sq_from_rfq(rfq_doc, dialog) {
	if (!rfq_doc) return;
	
	frappe.call({
		method: 'frappe.client.get',
		args: { doctype: 'Request for Quotation', name: rfq_doc.name },
		freeze: true,
		callback: (rfq_res) => {
			const full_rfq = rfq_res && rfq_res.message;
			if (!full_rfq) {
				frappe.msgprint(__('Failed to load RFQ details'));
				return;
			}
			_create_sq_dialog(full_rfq, dialog);
		}
	});
}

function _create_sq_dialog(full_rfq, dialog) {
	const suppliers = (full_rfq.suppliers || []).map(s => s.supplier).filter(Boolean);
	if (!suppliers.length) { frappe.msgprint(__('No suppliers on RFQ')); return; }

	const company = full_rfq.company || frappe.defaults.get_default('company');
	const currency = full_rfq.currency || 'SAR';
	const buying_price_list = full_rfq.buying_price_list || frappe.defaults.get_default('buying_price_list');
	const price_list_currency = full_rfq.price_list_currency || currency;
	const conversion_rate = full_rfq.conversion_rate || 1;
	const plc_conversion_rate = full_rfq.plc_conversion_rate || 1;
	const taxes_and_charges = full_rfq.taxes_and_charges || '';
	const tc_name = full_rfq.tc_name || '';
	const terms = full_rfq.terms || '';
	const letter_head = full_rfq.letter_head || '';
	const shipping_address = full_rfq.shipping_address || '';
	const billing_address = full_rfq.billing_address || '';
	const message_for_supplier = full_rfq.message_for_supplier || '';
	
	if (suppliers.length === 1) {
		_create_single_sq_dialog(full_rfq, suppliers[0], dialog, {
			company, currency, buying_price_list, price_list_currency, 
			conversion_rate, plc_conversion_rate, taxes_and_charges,
			tc_name, terms, letter_head, shipping_address, billing_address,
			message_for_supplier
		});
		return;
	}

	const d = new frappe.ui.Dialog({ 
		title: __('Create Supplier Quotations') + ' (' + suppliers.length + ')', 
		size: 'large'
	});
	d.$body.css('color', 'var(--text-color)');

	const info_box = $('<div class="pd-card" style="margin-bottom: 16px; background: var(--control-bg); border-left: 4px solid var(--primary);"></div>');
	info_box.append('<div style="font-weight: 600; margin-bottom: 4px; color: var(--text-color);">' + __('Company') + ': ' + frappe.utils.escape_html(company) + '</div>');
	info_box.append('<div style="font-size: 12px; color: var(--text-muted);">' + __('Currency') + ': ' + frappe.utils.escape_html(currency) + ' | ' + __('Price List') + ': ' + frappe.utils.escape_html(buying_price_list || '-') + '</div>');
	d.$body.append(info_box);

	const supplier_list = $('<div style="margin-bottom: 16px; color: var(--text-color);"></div>');
	supplier_list.append('<div style="font-weight: 600; margin-bottom: 8px; color: var(--text-color);">' + __('Suppliers') + ' (' + suppliers.length + ')</div>');
	suppliers.forEach(s => {
		supplier_list.append('<div style="padding: 4px 0; color: var(--text-color);">• ' + frappe.utils.escape_html(s) + '</div>');
	});
	d.$body.append(supplier_list);

	const items_table = $('<div class="table-responsive" style="margin-top:16px"><table class="table table-bordered table-sm"><thead><tr><th>' + __('Item') + '</th><th class="text-right">' + __('Qty') + '</th><th class="text-right">' + __('UOM') + '</th><th class="text-right">' + __('Rate') + '</th><th class="text-right">' + __('Amount') + '</th></tr></thead><tbody class="sq-items-tbody"></tbody></table></div>');
	d.$body.append(items_table);
	const tbody = items_table.find('.sq-items-tbody');

	(full_rfq.items || []).forEach((item) => {
		const row = $('<tr data-item-code="' + frappe.utils.escape_html(item.item_code) + '" data-rfq-item="' + frappe.utils.escape_html(item.name || '') + '" data-warehouse="' + frappe.utils.escape_html(item.warehouse || '') + '"><td>' + frappe.utils.escape_html(item.item_name || item.item_code) + '</td><td class="text-right">' + (item.qty || 1) + '</td><td class="text-right">' + (item.uom || 'Nos') + '</td><td class="text-right"><input type="number" step="0.01" min="0" class="form-control input-sm sq-rate" style="max-width:120px; margin-left:auto" value="0" data-qty="' + (item.qty || 1) + '" data-uom="' + frappe.utils.escape_html(item.uom || 'Nos') + '" data-cost-center="' + frappe.utils.escape_html(item.cost_center || '') + '"></td><td class="text-right sq-amount">0.00</td>');
		tbody.append(row);
	});

	tbody.on('input', '.sq-rate', function () {
		const $row = $(this).closest('tr');
		const rate = parseFloat($(this).val()) || 0;
		const qty = parseFloat($(this).data('qty')) || 1;
		$row.find('.sq-amount').text((rate * qty).toFixed(2));
	});

	d.set_primary_action(__('Create All'), () => {
		const sq_items = [];
		tbody.find('tr').each(function () {
			const $row = $(this);
			const $rate_input = $row.find('.sq-rate');
			const rate = parseFloat($rate_input.val()) || 0;
			const qty = parseFloat($rate_input.data('qty')) || 1;
			const uom = $rate_input.data('uom') || $row.find('td:nth-child(3)').text().trim() || 'Nos';
			const cost_center = $rate_input.data('cost-center') || '';
			const rfq_item = $row.attr('data-rfq-item') || '';
			const warehouse = $row.attr('data-warehouse') || '';
			
			sq_items.push({
				item_code: $row.attr('data-item-code'),
				qty: qty,
				rate: rate,
				amount: rate * qty,
				uom: uom,
				cost_center: cost_center || undefined,
				warehouse: warehouse || undefined,
				request_for_quotation: full_rfq.name,
				request_for_quotation_item: rfq_item || undefined
			});
		});

		let created_count = 0;
		let failed_count = 0;
		const total = suppliers.length;

		suppliers.forEach((supplier, index) => {
			const sq_doc = {
				doctype: 'Supplier Quotation',
				supplier: supplier,
				company: company,
				transaction_date: frappe.datetime.get_today(),
				valid_till: frappe.datetime.add_days(frappe.datetime.get_today(), 30),
				currency: currency,
				conversion_rate: conversion_rate,
				buying_price_list: buying_price_list,
				price_list_currency: price_list_currency,
				plc_conversion_rate: plc_conversion_rate,
				items: sq_items,
				taxes_and_charges: taxes_and_charges || undefined,
				tc_name: tc_name || undefined,
				terms: terms || undefined,
				shipping_address: shipping_address || undefined,
				billing_address: billing_address || undefined,
				letter_head: letter_head || undefined,
				message_for_supplier: message_for_supplier || undefined
			};
			
			frappe.call({
				method: 'frappe.client.insert',
				args: { doc: sq_doc },
				freeze: true,
				freeze_message: __('Creating Supplier Quotation {0} of {1}...', [index + 1, total]),
				callback: (r) => {
					if (r && r.message) {
						created_count++;
						frappe.show_alert({ 
							message: __('Supplier Quotation {0} created for {1}', [r.message.name, supplier]), 
							indicator: 'green' 
						});

						if (created_count + failed_count === total) {
							if (dialog) dialog.hide();
							d.hide();
							const _page = get_page(); 
							if (_page) refresh_active_tab(_page);

							if (failed_count > 0) {
								frappe.msgprint({
									title: __('Partial Success'),
									message: __('Created {0} of {1} Supplier Quotations. {2} failed.', [created_count, total, failed_count]),
									indicator: 'orange'
								});
							} else {
								frappe.show_alert({
									message: __('All {0} Supplier Quotations created successfully', [total]),
									indicator: 'green'
								});
							}
						}
					}
				},
				error: (err) => {
					failed_count++;
					frappe.show_alert({
						message: __('Failed to create SQ for {0}: {1}', [supplier, err.message || 'Unknown error']),
						indicator: 'red'
					});

					if (created_count + failed_count === total) {
						if (dialog) dialog.hide();
						d.hide();
						const _page = get_page(); 
						if (_page) refresh_active_tab(_page);
					}
				}
			});
		});
	});

	d.show();
}

function _create_single_sq_dialog(full_rfq, supplier, dialog, settings) {
	const d = new frappe.ui.Dialog({ 
		title: __('Create Supplier Quotation'), 
		size: 'large'
	});
	d.$body.css('color', 'var(--text-color)');

	const info_box = $('<div class="pd-card" style="margin-bottom: 16px; background: var(--control-bg); border-left: 4px solid var(--primary);"></div>');
	info_box.append('<div style="font-weight: 600; margin-bottom: 4px; color: var(--text-color);">' + __('Company') + ': ' + frappe.utils.escape_html(settings.company) + '</div>');
	info_box.append('<div style="font-size: 12px; color: var(--text-muted);">' + __('Supplier') + ': ' + frappe.utils.escape_html(supplier) + '</div>');
	d.$body.append(info_box);

	const items_table = $('<div class="table-responsive" style="margin-top:16px"><table class="table table-bordered table-sm"><thead><tr><th>' + __('Item') + '</th><th class="text-right">' + __('Qty') + '</th><th class="text-right">' + __('UOM') + '</th><th class="text-right">' + __('Rate') + '</th><th class="text-right">' + __('Amount') + '</th></tr></thead><tbody class="sq-items-tbody"></tbody></table></div>');
	d.$body.append(items_table);
	const tbody = items_table.find('.sq-items-tbody');

	(full_rfq.items || []).forEach((item) => {
		const row = $('<tr data-item-code="' + frappe.utils.escape_html(item.item_code) + '" data-rfq-item="' + frappe.utils.escape_html(item.name || '') + '" data-warehouse="' + frappe.utils.escape_html(item.warehouse || '') + '"><td>' + frappe.utils.escape_html(item.item_name || item.item_code) + '</td><td class="text-right">' + (item.qty || 1) + '</td><td class="text-right">' + (item.uom || 'Nos') + '</td><td class="text-right"><input type="number" step="0.01" min="0" class="form-control input-sm sq-rate" style="max-width:120px; margin-left:auto" value="0" data-qty="' + (item.qty || 1) + '" data-uom="' + frappe.utils.escape_html(item.uom || 'Nos') + '" data-cost-center="' + frappe.utils.escape_html(item.cost_center || '') + '"></td><td class="text-right sq-amount">0.00</td>');
		tbody.append(row);
	});

	tbody.on('input', '.sq-rate', function () {
		const $row = $(this).closest('tr');
		const rate = parseFloat($(this).val()) || 0;
		const qty = parseFloat($(this).data('qty')) || 1;
		$row.find('.sq-amount').text((rate * qty).toFixed(2));
	});

	d.set_primary_action(__('Create'), () => {
		const sq_items = [];
		tbody.find('tr').each(function () {
			const $row = $(this);
			const $rate_input = $row.find('.sq-rate');
			const rate = parseFloat($rate_input.val()) || 0;
			const qty = parseFloat($rate_input.data('qty')) || 1;
			const uom = $rate_input.data('uom') || $row.find('td:nth-child(3)').text().trim() || 'Nos';
			const cost_center = $rate_input.data('cost-center') || '';
			const rfq_item = $row.attr('data-rfq-item') || '';
			const warehouse = $row.attr('data-warehouse') || '';
			
			sq_items.push({
				item_code: $row.attr('data-item-code'),
				qty: qty,
				rate: rate,
				amount: rate * qty,
				uom: uom,
				cost_center: cost_center || undefined,
				warehouse: warehouse || undefined,
				request_for_quotation: full_rfq.name,
				request_for_quotation_item: rfq_item || undefined
			});
		});

		const sq_doc = {
			doctype: 'Supplier Quotation',
			supplier: supplier,
			company: settings.company,
			transaction_date: frappe.datetime.get_today(),
			valid_till: frappe.datetime.add_days(frappe.datetime.get_today(), 30),
			currency: settings.currency,
			conversion_rate: settings.conversion_rate,
			buying_price_list: settings.buying_price_list,
			price_list_currency: settings.price_list_currency,
			plc_conversion_rate: settings.plc_conversion_rate,
			items: sq_items,
			taxes_and_charges: settings.taxes_and_charges || undefined,
			tc_name: settings.tc_name || undefined,
			terms: settings.terms || undefined,
			shipping_address: settings.shipping_address || undefined,
			billing_address: settings.billing_address || undefined,
			letter_head: settings.letter_head || undefined,
			message_for_supplier: settings.message_for_supplier || undefined
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
					const _page = get_page(); 
					if (_page) refresh_active_tab(_page);
				}
			}
		});
	});

	d.show();
}


function create_po_from_sq(sq_doc, dialog) {
	if (!sq_doc) return;
	frappe.call({
		method: 'frappe.client.get', args: { doctype: 'Supplier Quotation', name: sq_doc.name }, freeze: true,
		callback: (sq_res) => {
			const sq = sq_res && sq_res.message;
			if (!sq || !(sq.items && sq.items.length)) { frappe.msgprint(__('No items found on Supplier Quotation')); return; }
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
					supplier_quotation: sq.name, 
					supplier_quotation_item: it.name,
					// // Carry forward RFQ references from SQ item to PO item
					// request_for_quotation: it.request_for_quotation || undefined,
					// request_for_quotation_item: it.request_for_quotation_item || undefined
				}))
			};
			frappe.call({
				method: 'frappe.client.insert', 
				args: { doc: po_doc }, 
				freeze: true,
				callback: (ins) => {
					const inserted = ins && ins.message;
					if (!inserted) { frappe.msgprint(__('Failed to insert Purchase Order')); return; }
					frappe.call({
						method: 'frappe.client.submit', 
						args: { doc: inserted }, 
						freeze: true,
						callback: (sub) => {
							frappe.show_alert({ message: __('Purchase Order {0} submitted', [(sub && sub.message ? sub.message : inserted).name]), indicator: 'green' });
							if (dialog) dialog.hide();
							const _page = get_page(); 
							if (_page) refresh_active_tab(_page);
						},
						error: (err) => { frappe.msgprint({ title: __('Error'), message: __('Error submitting Purchase Order: {0}', [err.message || 'Unknown error']), indicator: 'red' }); }
					});
				},
				error: (err) => { frappe.msgprint({ title: __('Error'), message: __('Error creating Purchase Order: {0}', [err.message || 'Unknown error']), indicator: 'red' }); }
			});
		},
		error: (err) => { frappe.msgprint({ title: __('Error'), message: __('Error fetching Supplier Quotation: {0}', [err.message || 'Unknown error']), indicator: 'red' }); }
	});
}

function strip_html_tags(html) {
	if (!html) return '';
	const div = document.createElement('div');
	div.innerHTML = html;
	return div.textContent || div.innerText || '';
}

function format_address_display(addr_doc) {
	if (!addr_doc) return '';
	const parts = [
		addr_doc.address_line1,
		addr_doc.address_line2,
		addr_doc.city,
		addr_doc.state,
		addr_doc.pincode,
		addr_doc.country
	].filter(Boolean);
	return parts.join('\n');
}