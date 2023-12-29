sap.ui.require([
	"sap/ui/core/Control"
], (Control) => {
	"use strict";

	return Control.extend("project1.control.UITableExt", {
		metadata: {
			properties: {
				tableId: { type: "String" },
				checkHoldFilter: { type: "Boolean" }
			}
		},

		init() {
			sap.z2ui5.onBeforeRoundtrip.push(this.readFilter.bind(this));
			sap.z2ui5.onAfterRoundtrip.push(this.setFilter.bind(this));
		},

		readFilter() {
			try {
				let id = this.getPropery("tableId");
				let oTable = sap.z2ui5.oView.byId(id);
				this.aFilters = oTable.getBinding().aFilters;
			} catch (e) { };
		},

		setFilter() {
			try {
				let id = this.getPropery("tableId");
				let oTable = sap.z2ui5.oView.byId(id);
				oTable.getBinding().filter(this.aFilters);
			} catch (e) { };
		},

		renderer(oRM, oControl) {
		}
	});
});