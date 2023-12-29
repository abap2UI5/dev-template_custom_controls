sap.ui.define([
	"sap/m/MultiInput"
], (MultiInput) => {
	"use strict";

	return MultiInput.extend("project1.control.MultiInput", {
		metadata: {
			properties: {
				addedTokens: { type: "Array" },
				removedTokens: { type: "Array" }
			}
		},

		init() {
			MultiInput.prototype.init.call(this);
			this.attachTokenUpdate(this.onTokenUpdate);

			var fnValidator = function (args) {
				var text = args.text;
				return new sap.m.Token({ key: text, text: text });
			};

			this.addValidator(fnValidator);
		},

		onTokenUpdate(oEvent) {
			debugger;
			this.setProperty("addedTokens", []);
			this.setProperty("removedTokens", []);

			if (oEvent.mParameters.type == "removed") {
				let removedTokens = [];
				oEvent.mParameters.removedTokens.forEach((item) => {
					removedTokens.push({ KEY: item.getKey(), TEXT: item.getText() });
				});
				this.setProperty("removedTokens", removedTokens);
			} else {
				let addedTokens = [];
				oEvent.mParameters.addedTokens.forEach((item) => {
					addedTokens.push({ KEY: item.getKey(), TEXT: item.getText() });
				});
				this.setProperty("addedTokens", addedTokens);
			}
		},

		renderer(oRM, oControl) {
			sap.m.MultiInputRenderer.render(oRM, oControl);

		}
	});
});