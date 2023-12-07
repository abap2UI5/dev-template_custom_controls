sap.ui.define([
	"sap/ui/core/Control"
], (Control) => {
	"use strict";

	return Control.extend("project1.control.MyCustomControl", {
		metadata: {

			properties: {
				value: { type: "string" },
				checkCallMyFunction: { type : "boolean" }
			},
			events: {
				change: {}
			}
		},

		setValue(value) {
			this.setProperty("value", value);
		},
		getValue() {
			return this.getProperty("value");
		},
		setCheckCallMyFunction(checkCallMyFunction) {
			if (checkCallMyFunction) {
				this.myFrontendFunction();
			}
			this.setProperty("checkCallMyFunction", false);
		},
		init() {
		},

		myFrontendFunction(){
			sap.m.MessageToast.show( 'myFrontendFunction called' );
		},

		onAfterRendering() {

			setTimeout((oControl) => {
				oControl.setValue("frontend value");
				oControl.fireChange();
			}, 3000, this);

		},

		renderer(oRM, oControl) {
			oRM.openStart("div", oControl);
			oRM.openEnd();
			oRM.write(oControl.getValue("value"));
			oRM.close("div");
		}
	});
});