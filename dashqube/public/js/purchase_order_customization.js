// Purchase Order Customization for Dashqube
// Ensures rate field is visible in purchase order items

// Ensure base namespaces
frappe.provide("dashqube");
frappe.provide("dashqube.purchase_order");

dashqube.purchase_order = {
    init: function() {
        this.setup_rate_field_visibility();
    },

    setup_rate_field_visibility: function() {
        // Hook into purchase order form events
        frappe.ui.form.on("Purchase Order", {
            setup: function(frm) {
                dashqube.purchase_order.ensure_rate_field_visible(frm);
            },
            
            refresh: function(frm) {
                dashqube.purchase_order.ensure_rate_field_visible(frm);
            },
            
            items_add: function(frm, cdt, cdn) {
                dashqube.purchase_order.ensure_rate_field_visible(frm);
            }
        });

        // Hook into purchase order item events
        frappe.ui.form.on("Purchase Order Item", {
            items_add: function(frm, cdt, cdn) {
                dashqube.purchase_order.ensure_rate_field_visible(frm);
            },
            
            items_render: function(frm, cdt, cdn) {
                dashqube.purchase_order.ensure_rate_field_visible(frm);
            }
        });
    },

    ensure_rate_field_visible: function(frm) {
        if (!frm || !frm.fields_dict || !frm.fields_dict.items) return;
        
        const items_grid = frm.fields_dict.items.grid;
        if (!items_grid) return;

        // Ensure rate field is visible in the grid
        try {
            items_grid.toggle_display("rate", true);
            
            // Force show the rate field using CSS
            setTimeout(() => {
                const rateCells = frm.$wrapper.find('.grid-row .grid-cell[data-fieldname="rate"]');
                rateCells.each(function() {
                    $(this).show();
                    $(this).css({
                        'display': 'table-cell !important',
                        'visibility': 'visible !important',
                        'min-width': '120px',
                        'width': '120px'
                    });
                });

                // Also show rate field inputs
                const rateInputs = frm.$wrapper.find('.grid-row .grid-cell[data-fieldname="rate"] input');
                rateInputs.each(function() {
                    $(this).show();
                    $(this).css({
                        'display': 'block !important',
                        'visibility': 'visible !important'
                    });
                });
            }, 100);
        } catch (e) {
            console.log("Error ensuring rate field visibility:", e);
        }
    },

    // Function to be called when grid is rendered
    on_grid_rendered: function(grid) {
        if (!grid || !grid.grid_rows) return;
        
        grid.grid_rows.forEach(row => {
            if (row.grid_cells && row.grid_cells.rate) {
                const rateCell = row.grid_cells.rate;
                if (rateCell) {
                    rateCell.show();
                    rateCell.$wrapper.show();
                }
            }
        });
    }
};

// Initialize when DOM is ready
$(document).ready(function() {
    dashqube.purchase_order.init();
});

// Initialize after Frappe loads (Desk context)
if (typeof frappe !== 'undefined' && frappe.after_ajax) {
    frappe.after_ajax(() => {
        try { dashqube.purchase_order.init(); } catch (e) { /* no-op */ }
    });
}

// Compatibility shim for scripts expecting dashqube.Purchase.RateFieldEnhancer.ensure_rate_field_visible
try {
    frappe.provide("dashqube.Purchase.RateFieldEnhancer");
    if (!dashqube.Purchase) dashqube.Purchase = {};
    if (!dashqube.Purchase.RateFieldEnhancer) dashqube.Purchase.RateFieldEnhancer = {};
    dashqube.Purchase.RateFieldEnhancer.ensure_rate_field_visible = function(frm) {
        if (dashqube && dashqube.purchase_order && dashqube.purchase_order.ensure_rate_field_visible) {
            dashqube.purchase_order.ensure_rate_field_visible(frm);
        }
    };
} catch (e) {
    // no-op
}
