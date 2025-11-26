frappe.pages["stock-management"].on_page_load = async function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: "Stock Management",
		single_column: true,
	});

	// Clear any existing content
	$(page.main).empty();

	// Create a container for the Vue app
	const container = $('<div id="dashboard-app"></div>');
	$(page.main).append(container);

	console.log("Stock Management page loaded");
	console.log("Checking for Dashboard bundle...");

	// Ensure dashboard bundle is loaded - wait for it if needed
	const initDashboard = () => {
		console.log("Attempting to initialize Dashboard...");
		console.log("Dashboard global:", typeof Dashboard !== "undefined" ? Dashboard : "undefined");
		console.log("window.Dashboard:", window.Dashboard);
		
		// Try both Dashboard and window.Dashboard
		const DashboardObj = typeof Dashboard !== "undefined" ? Dashboard : (typeof window.Dashboard !== "undefined" ? window.Dashboard : null);
		
		if (DashboardObj && DashboardObj.initDashboard) {
			try {
				console.log("Initializing Dashboard with container:", container[0]);
				// Mount the Vue app to the container
				DashboardObj.initDashboard(container[0]);
				console.log("Dashboard initialized successfully");
			} catch (error) {
				console.error("Error initializing dashboard:", error);
				console.error("Error stack:", error.stack);
				frappe.show_alert({
					message: __("Error initializing dashboard. Please check the console."),
					indicator: "red",
				});
			}
		} else {
			console.error("Dashboard bundle not loaded!");
			console.error("Dashboard type:", typeof Dashboard);
			console.error("window.Dashboard type:", typeof window.Dashboard);
			console.error("Available globals:", Object.keys(window).filter(k => k.toLowerCase().includes("dashboard")));
			frappe.show_alert({
				message: __("Dashboard bundle not loaded. Please build: cd apps/dashqube/dashboard && npm run build"),
				indicator: "red",
			});
		}
	};

	// Check if bundle is already loaded
	const DashboardObj = typeof Dashboard !== "undefined" ? Dashboard : (typeof window.Dashboard !== "undefined" ? window.Dashboard : null);
	if (DashboardObj && DashboardObj.initDashboard) {
		console.log("Dashboard bundle already loaded");
		initDashboard();
	} else {
		console.log("Waiting for Dashboard bundle to load...");
		// Wait for bundle to load (loaded via app_include_js in hooks.py)
		let attempts = 0;
		const maxAttempts = 200; // 10 seconds max wait
		const checkBundle = setInterval(() => {
			attempts++;
			const DashboardObj = typeof Dashboard !== "undefined" ? Dashboard : (typeof window.Dashboard !== "undefined" ? window.Dashboard : null);
			if (DashboardObj && DashboardObj.initDashboard) {
				console.log("Dashboard bundle loaded after", attempts * 50, "ms");
				clearInterval(checkBundle);
				initDashboard();
			} else if (attempts >= maxAttempts) {
				console.error("Timeout waiting for Dashboard bundle after", attempts * 50, "ms");
				console.error("Current window.Dashboard:", window.Dashboard);
				clearInterval(checkBundle);
				initDashboard(); // Will show error
			}
		}, 50);
	}
};
