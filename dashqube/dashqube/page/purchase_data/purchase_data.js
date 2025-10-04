frappe.pages['purchase-data'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Purchase Data',
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

	// scoped styles to improve UI
	const style = $('<style>\
	\t.purchase-data-tabs .nav-tabs { margin-bottom: 8px; }\
	\t.pd-card { background: var(--bg-color); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px; }\
	\t.pd-header { display: flex; gap: 8px; align-items: center; justify-content: space-between; }\
	\t.pd-header .pd-search { flex: 1 1 auto; max-width: 560px; }\
	\t.pd-list { margin-top: 8px; }\
	\t.pd-row { display: flex; justify-content: space-between; gap: 16px; padding: 10px 4px; border-bottom: 1px solid var(--border-color); cursor: pointer; }\
	\t.pd-row:last-child { border-bottom: 0; }\
	\t.pd-title { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\
	\t.pd-sub { color: var(--text-muted); font-size: 12px; white-space: nowrap; }\
	\t.pd-right { text-align: right; min-width: 160px; }\
	\t.pd-badge { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 11px; background: var(--bg-light-gray); }\
	</style>');
	$(page.body).prepend(style);

	render_tab_body(page, tabs, 'Purchase Order');

	// refresh when page is shown again
	page.wrapper.on('show', () => refresh_active_tab(page));
}

function make_tabs(page) {
	const tab_html = $(
		'<div class="purchase-data-tabs">\
			<ul class="nav nav-tabs" role="tablist">\
				<li class="nav-item">\
					<button type="button" class="nav-link active" data-target="#pd-po" role="tab" aria-selected="true">' + __('Purchase Order') + '</button>\
				</li>\
				<li class="nav-item">\
					<button type="button" class="nav-link" data-target="#pd-pr" role="tab" aria-selected="false">' + __('Purchase Receipt') + '</button>\
				</li>\
				<li class="nav-item">\
					<button type="button" class="nav-link" data-target="#pd-pi" role="tab" aria-selected="false">' + __('Purchase Invoice') + '</button>\
				</li>\
			</ul>\
			<div class="tab-content" style="padding-top: 12px;">\
				<div class="tab-pane active" id="pd-po" role="tabpanel"></div>\
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
		'Purchase Invoice': 'Purchase Invoice'
	};

	const pane_id = label === 'Purchase Order' ? '#pd-po' : (label === 'Purchase Receipt' ? '#pd-pr' : '#pd-pi');
	const $pane = tabs_wrapper.find(pane_id);
	$pane.empty();

	const header = $(
		'<div class="pd-card pd-header">\
			<div class="pd-search" style="min-width:260px"></div>\
			<button class="btn btn-primary">' + __('New') + ' ' + __(label) + '</button>\
		</div>'
	);
	const item_selector = $('<div class="pd-card" style="margin-top:8px"><div class="pd-items-header d-flex" style="gap:8px; align-items:center; flex-wrap:wrap">\
		<div class="h6 mb-0" style="margin-right:auto">' + __('All Items') + '</div>\
		<input type="text" class="form-control pd-item-search" placeholder="' + __('Search by item code, serial number or barcode') + '" style="max-width:360px">\
		<select class="form-control pd-item-group" style="max-width:240px"><option value="">' + __('Select item group') + '</option></select>\
	</div>\
	<div class="pd-item-grid" style="margin-top:10px"></div></div>');

	// inline creation panel (visible on all tabs, configured per active doctype)
	const create_box = $('<div class="pd-card pd-create" style="margin-top:8px; display:none"></div>');

	const list = $('<div class="pd-card pd-list result-list"></div>');
	$pane.append(header).append(create_box).append(list);
	$pane.prepend(item_selector);

	// Replace free-text search with Supplier Link control
	const supplier_placeholder = header.find('.pd-search');
	const supplier_control = frappe.ui.form.make_control({
		parent: supplier_placeholder.get(0),
		df: {
			label: __('Supplier'),
			fieldname: 'supplier_filter',
			fieldtype: 'Link',
			options: 'Supplier',
			placeholder: __('Select Supplier')
		},
		only_input: false
	});
	supplier_control.refresh();
	const new_btn = header.find('button');

	new_btn.on('click', () => create_doc_inline(doctype_map[label], () => trigger_search()));

	let search_timer = null;
	const trigger_search = () => {
		const supplier = (supplier_control.get_value && supplier_control.get_value()) || '';
		load_docs_into(list, doctype_map[label], supplier);
	};

	// trigger on change of supplier link
	$(supplier_control.$input).on('change', () => {
		if (search_timer) clearTimeout(search_timer);
		search_timer = setTimeout(trigger_search, 50);
	});

	// initial load
	trigger_search();

	// initialize item selector
	initialize_item_selector(item_selector, (it) => {
		show_purchase_create_box(create_box, doctype_map[label]);
		purchase_add_item(create_box, it);
	});
}

function load_docs_into(container, doctype, supplier_name) {
	container.empty().append($('<div class="text-muted">' + __('Loading...') + '</div>'));

	const filters = [];
	const party_field = doctype === 'Purchase Invoice' ? 'supplier' : 'supplier';
	if (supplier_name) {
		filters.push([doctype, party_field, '=', supplier_name]);
	}

	frappe.call({
		method: 'frappe.client.get_list',
		args: {
			doctype: doctype,
			fields: ['name', 'supplier', 'posting_date', 'status', 'grand_total', 'currency'],
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
					<div class="pd-badge">' + frappe.utils.escape_html(status) + '</div>\
				</div>\
			</div>'
		);

		$card.on('click', () => open_doc_preview_dialog(doctype, row.name));
		container.append($card);
	});
}

function refresh_active_tab(page) {
	const active_link = $(page.body).find('.nav-link.active');
	const label = active_link.length ? active_link.text().trim() : 'Purchase Order';
	const pane_id = label === 'Purchase Order' ? '#pd-po' : (label === 'Purchase Receipt' ? '#pd-pr' : '#pd-pi');
	const $pane = $(page.body).find(pane_id);
	const list = $pane.find('.result-list');
	if (list.length) {
		const doctype = label;
		load_docs_into(list, doctype, ($pane.find('input').val() || '').trim());
	}
}

function initialize_item_selector(wrapper, on_select) {
	// styles for grid
	if (!$(document).data('pd-item-grid-styles')) {
		const s = $('<style>\
		.pd-item-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }\
		.pd-item-card { border: 1px solid var(--border-color); border-radius: 10px; padding: 10px; background: var(--bg-color); cursor: pointer; }\
		.pd-item-img { width: 100%; height: 110px; border-radius: 8px; background: var(--bg-light-gray); display:flex; align-items:center; justify-content:center; overflow:hidden; }\
		.pd-item-img img { max-width: 100%; max-height: 100%; object-fit: contain; }\
		.pd-item-title { margin-top: 8px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\
		.pd-item-sub { color: var(--text-muted); font-size: 12px; }\
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

	$box.append('<div class="h6" style="margin-bottom:10px">' + __('New') + ' ' + __(doctype) + '</div>');

	const controls_row = $('<div class="d-flex" style="gap:8px; flex-wrap:wrap; align-items:center; margin-bottom:10px"></div>');
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
	const actions = $('<div class="d-flex" style="gap:8px; justify-content:flex-end; margin-top:8px"></div>');
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

	frappe.call({
		method: 'erpnext.stock.get_item_details.get_item_details',
		args: {
			args: {
				doctype: 'Purchase Order',
				item_code: item_code,
				company: company,
				price_list: price_list,
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
	const sys_currency = (frappe.boot && frappe.boot.sysdefaults && (frappe.boot.sysdefaults.currency || frappe.boot.sysdefaults.default_currency)) || null;

	const doc = {
		doctype: state.doctype || 'Purchase Order',
		supplier: supplier,
		company: company || undefined,
		buying_price_list: buying_price_list || undefined,
		currency: sys_currency || undefined,
		price_list_currency: sys_currency || undefined,
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
		items_html += '<div style="margin-top:12px">\
			<div class="font-weight-bold">' + __('Items') + '</div>\
			<div class="table-responsive">\
				<table class="table table-bordered table-sm" style="margin-top:6px">\
					<thead><tr><th>' + __('Item') + '</th><th class="text-right">' + __('Qty') + '</th><th class="text-right">' + __('Rate') + '</th><th class="text-right">' + __('Amount') + '</th></tr></thead>\
					<tbody>' + items_child.map(it => {
						const amount = (it.amount != null) ? it.amount : (it.base_amount != null ? it.base_amount : '');
						return '<tr>\
							<td>' + frappe.utils.escape_html(it.item_name || it.item_code || '') + '</td>\
							<td class="text-right">' + (it.qty != null ? it.qty : '') + '</td>\
							<td class="text-right">' + (it.rate != null ? it.rate : '') + '</td>\
							<td class="text-right">' + (amount != null ? amount : '') + '</td>\
						</tr>';
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
}

function create_pr_from_po(po_name, dialog) {
	if (!po_name) return;
	frappe.call({
		method: 'erpnext.buying.doctype.purchase_order.purchase_order.make_purchase_receipt',
		args: { source_name: po_name },
		freeze: true,
		callback: (r) => {
			const pr_doc = r && r.message;
			if (!pr_doc) { frappe.msgprint(__('Unable to create Purchase Receipt')); return; }
			frappe.call({
				method: 'frappe.client.insert',
				args: { doc: pr_doc },
				freeze: true,
				callback: (ins) => {
					const inserted = ins && ins.message;
					if (!inserted) { frappe.msgprint(__('Failed to insert Purchase Receipt')); return; }
					frappe.call({
						method: 'frappe.client.submit',
						args: { doc: inserted },
						freeze: true,
						callback: (sub) => {
							const submitted = sub && sub.message ? sub.message : inserted;
							frappe.show_alert({ message: __('Purchase Receipt {0} submitted', [submitted.name]), indicator: 'green' });
							if (dialog) dialog.hide();
							refresh_active_tab(cur_page.page);
						}
					});
				}
			});
		}
	});
}

function create_pi_from_pr(pr_name, dialog) {
	if (!pr_name) return;
	frappe.call({
		method: 'erpnext.buying.doctype.purchase_receipt.purchase_receipt.make_purchase_invoice',
		args: { source_name: pr_name },
		freeze: true,
		callback: (r) => {
			const mapped = r && r.message;
			if (!mapped) { frappe.msgprint(__('Unable to create Purchase Invoice')); return; }
			// Fallback: if mapping produced no items, rebuild a minimal PI from PR items
			const proceedWith = (docToInsert) => {
				frappe.call({
					method: 'frappe.client.insert',
					args: { doc: docToInsert },
					freeze: true,
					callback: (ins) => {
						const inserted = ins && ins.message;
						if (!inserted) { frappe.msgprint(__('Failed to insert Purchase Invoice')); return; }
						frappe.call({
							method: 'frappe.client.submit',
							args: { doc: inserted },
							freeze: true,
							callback: (sub) => {
								const submitted = sub && sub.message ? sub.message : inserted;
								frappe.show_alert({ message: __('Purchase Invoice {0} submitted', [submitted.name]), indicator: 'green' });
								if (dialog) dialog.hide();
								refresh_active_tab(cur_page.page);
							}
						});
					}
				});
			};

			if (mapped.items && mapped.items.length) {
				proceedWith(mapped);
				return;
			}

			// No items from mapper: fetch PR and build PI items
			frappe.call({
				method: 'frappe.client.get',
				args: { doctype: 'Purchase Receipt', name: pr_name },
				freeze: true,
				callback: (pr_res) => {
					const pr = pr_res && pr_res.message;
					if (!pr || !(pr.items && pr.items.length)) { frappe.msgprint(__('No items found on Purchase Receipt')); return; }
					const pi_doc = {
						doctype: 'Purchase Invoice',
						supplier: pr.supplier,
						company: pr.company,
						posting_date: frappe.datetime.get_today(),
						items: (pr.items || []).map(it => ({ item_code: it.item_code, qty: it.qty || it.received_qty || 1, rate: it.rate || it.valuation_rate || 0, uom: it.uom || it.stock_uom }))
					};
					proceedWith(pi_doc);
				}
			});
		}
	});
}