sap.ui.define([
    "sap/ui/core/mvc/Controller"
],

    function (Controller) {
        "use strict";

        return Controller.extend("project1.controller.View1", {
            onInit: function () {

                var data = { 'MY_BINDED_VALUE' : "backend value" };
                var oModel = new sap.ui.model.json.JSONModel(data);
                this.oView.setModel( oModel );

            },
            onMyBackendChangeHandler: function (oEvent){
                var data = this.oView.getModel().getData();
                sap.m.MessageToast.show( 'Frontend Event raised, and processed in the backend, value: ' + data.MY_BINDED_VALUE );
            }
        });
    });
