frappe.pages["stock-management"].on_page_load = async function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: "Stock Management",
		single_column: true,
	});

	// Create a container for the Vue app
	const container = $('<div id="dashboard-app"></div>');
	$(page.main).html(container);

	// Ensure dashboard bundle is loaded - wait for it if needed
	const initDashboard = () => {
		if (typeof Dashboard !== "undefined" && Dashboard.initDashboard) {
			try {
				// Mount the Vue app to the container
				Dashboard.initDashboard(container[0]);
			} catch (error) {
				console.error("Error initializing dashboard:", error);
				frappe.show_alert({
					message: __("Error initializing dashboard. Please check the console."),
					indicator: "red",
				});
			}
		} else {
			console.error("Dashboard bundle not loaded. Please build the dashboard bundle:");
			console.error("cd apps/dashqube/dashboard && npm install && npm run build");
			frappe.show_alert({
				message: __("Dashboard bundle not loaded. Please build the dashboard bundle."),
				indicator: "red",
			});
		}
	};

	// Check if bundle is already loaded
	if (typeof Dashboard !== "undefined" && Dashboard.initDashboard) {
		initDashboard();
	} else {
		// Wait for bundle to load (loaded via app_include_js in hooks.py)
		let attempts = 0;
		const maxAttempts = 100; // 5 seconds max wait
		const checkBundle = setInterval(() => {
			attempts++;
			if (typeof Dashboard !== "undefined" && Dashboard.initDashboard) {
				clearInterval(checkBundle);
				initDashboard();
			} else if (attempts >= maxAttempts) {
				clearInterval(checkBundle);
				initDashboard(); // Will show error
			}
		}, 50);
	}
};
