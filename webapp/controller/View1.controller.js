sap.ui.define([
    "sap/ui/core/mvc/Controller"
],

    function (Controller) {
        "use strict";

        return Controller.extend("project1.controller.View1", {
            onInit: function () {

                sap.z2ui5 = {};
                sap.z2ui5.oResponse = {};
                sap.z2ui5.oController = this;
                sap.z2ui5.oResponse.ID = '325423432214341';
                sap.z2ui5.oBody = {
                    "OLOCATION": {
                        "ORIGIN": "<<system>>>",
                        "PATHNAME": "/test",
                        "SEARCH": "?app_start=23423",
                        "VERSION": "com.sap.ui5.dist:sapui5-sdk-dist:1.120.0:war",
                        "CHECK_LAUNCHPAD_ACTIVE": false
                    }
                };
                sap.z2ui5.oResponse.PARAMS = {};
                sap.z2ui5.oResponse.PARAMS.S_VIEW = {};
                sap.z2ui5.oResponse.PARAMS.S_VIEW.XML = '<mvc:View displayBlock="true" height="100%" xmlns="sap.m" xmlns:mvc="sap.ui.core.mvc" xmlns:l="sap.ui.layout" xmlns:form="sap.ui.layout.form"><Shell><Page showNavButton="false"><headerContent><Title text="abap2UI5 - Developing UI5 Apps in Pure ABAP"/><ToolbarSpacer/><Link text="SCN" target="_blank" href="https://blogs.sap.com/tag/abap2ui5/"/><Link text="Twitter" target="_blank" href="https://twitter.com/abap2UI5"/><Link text="GitHub" target="_blank" href="https://github.com/abap2ui5/abap2ui5"/></headerContent><l:Grid defaultSpan="XL7 L7 M12 S12"><l:content><form:SimpleForm title="Quickstart" layout="ResponsiveGridLayout" editable="true"><form:content><Label text="Step 1"/><Text text="Create a new class in your abap system"/><Label text="Step 2"/><Text text="Add the interface: Z2UI5_IF_APP"/><Label text="Step 3"/><Text text="Define view, implement behaviour"/><Link text="(Example)" target="_blank" href="https://github.com/abap2UI5/abap2UI5/blob/main/src/01/02/z2ui5_cl_fw_ui_hello_world.clas.abap"/><Label text="Step 4"/><Input placeholder="fill in the class name and press &apos;check&apos;" editable="true" value="{/EDIT/MS_HOME_CLASSNAME}" submit="onEvent( { &apos;EVENT&apos; : &apos;BUTTON_CHECK&apos;, &apos;METHOD&apos; : &apos;UPDATE&apos; , &apos;CHECK_VIEW_DESTROY&apos; : false })"/><Button press="onEvent( { &apos;EVENT&apos; : &apos;BUTTON_CHECK&apos;, &apos;METHOD&apos; : &apos;UPDATE&apos; , &apos;CHECK_VIEW_DESTROY&apos; : false })" text="check" icon="sap-icon://validate"/><Label text="Step 5"/><Link text="Link to the Application" target="_blank" href="https://<<system>>.com/test?app_start=z2ui5_cl_fw_ui_hello_world" enabled="false"/></form:content></form:SimpleForm><form:SimpleForm title="Samples" layout="ResponsiveGridLayout" editable="true"><form:content><Label/><Button press="onEvent( { &apos;EVENT&apos; : &apos;DEMOS&apos;, &apos;METHOD&apos; : &apos;UPDATE&apos; , &apos;CHECK_VIEW_DESTROY&apos; : true })" text="Continue..." enabled="true"/><Button visible="false"/><Link text="More on GitHub..." target="_blank" href="https://github.com/abap2UI5/abap2UI5-documentation/blob/main/docs/links.md"/></form:content></form:SimpleForm></l:content></l:Grid></Page></Shell></mvc:View>';
                sap.z2ui5.oResponse.OVIEWMODEL = {
                    "EDIT": {
                        "MS_HOME_CLASSNAME": "Z2UI5_CL_FW_UI_HELLO_WORLD"
                    }
                };
                sap.z2ui5.oViewNest2 = { mProperties : { "viewContent" : "test" } };

                var data = { 'MY_BINDED_VALUE' : "backend value" ,
                              tokens : [ {text: "Token 1", key: "0001"}, { text: "Token 2" , key: "0002" } ],
                              removedTokens : {} ,
                              addedTokens : {},
                              GT_DATA : 
                              [
                                {
                                    "FIELD1": "21",
                                    "FIELD2": "T1",
                                    "FIELD3": "TEXT1"
                                },
                                {
                                    "FIELD1": "22",
                                    "FIELD2": "T1",
                                    "FIELD3": "TEXT1"
                                },
                                {
                                    "FIELD1": "23",
                                    "FIELD2": "T2",
                                    "FIELD3": "TEXT1"
                                },
                                {
                                    "FIELD1": "24",
                                    "FIELD2": "T2",
                                    "FIELD3": "TEXT2"
                                },
                                {
                                    "FIELD1": "25",
                                    "FIELD2": "T3",
                                    "FIELD3": "TEXT2"
                                }
                            ]
            };

                var oModel = new sap.ui.model.json.JSONModel(data);
                this.oView.setModel( oModel );

                jQuery.sap.declare("project1.control.DebuggingTools");
                sap.z2ui5.DebuggingTools = new project1.control.DebuggingTools();
                sap.z2ui5.DebuggingTools.show();
            },

            onChange(oEvent){
                    debugger;
            },
            onTokenUpdate (){
      
                this.onInit();
     

            },

            onSubmit(){
                debugger;
            },

            onMyBackendChangeHandler: function (oEvent){
                var data = this.oView.getModel().getData();
                sap.m.MessageToast.show( 'Frontend Event raised, and processed in the backend, value: ' + data.MY_BINDED_VALUE );
            }
        });
    });
