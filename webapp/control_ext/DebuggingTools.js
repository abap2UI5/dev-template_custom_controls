sap.ui.define([
    "sap/ui/core/Control",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel"
], (Control, Fragment, JSONModel) => {
    "use strict";

    return Control.extend("project1.control.DebuggingTools", {
        metadata: {
            properties: {
                checkLoggingActive: {
                    type: "boolean",
                    defaultValue: ""
                }
            },
            events: {
                "finished": {
                    allowPreventDefault: true,
                    parameters: {},
                }
            }
        },

        async show() {

            var oFragmentController = {

                prettifyXml(sourceXml) {
                    var xmlDoc = new DOMParser().parseFromString(sourceXml, 'application/xml');
                    var xsltDoc = new DOMParser().parseFromString([
                        // describes how we want to modify the XML - indent everything
                        '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
                        '  <xsl:strip-space elements="*"/>',
                        '  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
                        '    <xsl:value-of select="normalize-space(.)"/>',
                        '  </xsl:template>',
                        '  <xsl:template match="node()|@*">',
                        '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
                        '  </xsl:template>',
                        '  <xsl:output indent="yes"/>',
                        '</xsl:stylesheet>',
                    ].join('\n'), 'application/xml');
        
                    var xsltProcessor = new XSLTProcessor();
                    xsltProcessor.importStylesheet(xsltDoc);
                    var resultDoc = xsltProcessor.transformToDocument(xmlDoc);
                    var resultXml = new XMLSerializer().serializeToString(resultDoc);
                    return resultXml;
                },

                onItemSelect: function (oEvent) {
                    let selItem = oEvent.getSource().getSelectedItem();

                    if (selItem == 'MODEL') {
                        this.displayEditor( oEvent, JSON.stringify( sap?.z2ui5?.oView?.getModel()?.getData(), null, 3) , 'json' );
                        return;
                    }
                    if (selItem == 'VIEW') {
                        this.displayEditor( oEvent, sap?.z2ui5?.oView?.mProperties?.viewContent , 'xml' );
                        return;
                    }
                    if (selItem == 'PLAIN') {
                        this.displayEditor(  oEvent, JSON.stringify(sap.z2ui5.oResponse, null, 3) , 'json' );
                        return;
                    }
                    if (selItem == 'REQUEST') {
                        this.displayEditor(  oEvent, JSON.stringify(sap.z2ui5.oBody, null, 3) , 'json' );
                        return;
                    }
                    if (selItem == 'POPUP') {
                        this.displayEditor(  oEvent, JSON.stringify(sap.z2ui5.oBody, null, 3) , 'xml' );
                        return;
                    }
                    if (selItem == 'POPUP_MODEL') {
                        this.displayEditor(  oEvent, JSON.stringify(sap.z2ui5.oBody, null, 3) , 'json' );
                        return;
                    }
                    if (selItem == 'POPOVER') {
                        this.displayEditor(  oEvent, sap?.z2ui5?.oViewPopover?.mProperties?.viewContent , 'xml' );
                        return;
                    }
                    if (selItem == 'POPOVER_MODEL') {
                        this.displayEditor(  oEvent, JSON.stringify( sap?.z2ui5?.oViewNest?.getModel( )?.getData( ) , null, 3) , 'json' );
                        return;
                    }
                    if (selItem == 'NEST1') {
                        this.displayEditor(  oEvent, sap?.z2ui5?.oViewNest?.mProperties?.viewContent  , 'xml' );
                        return;
                    }
                    if (selItem == 'NEST1_MODEL') {
                        this.displayEditor(  oEvent, JSON.stringify( sap?.z2ui5?.oViewNest?.getModel( )?.getData( ) , null, 3) , 'json' );
                        return;
                    }
                    if (selItem == 'NEST2') {
                        this.displayEditor(  oEvent, sap?.z2ui5?.oViewNest2?.mProperties?.viewContent  , 'xml' );
                        return;
                    }
                    if (selItem == 'NEST2_MODEL') {
                        this.displayEditor(  oEvent, JSON.stringify( sap?.z2ui5?.oViewNest2?.getModel( )?.getData( ) , null, 3) , 'json' );
                        return;
                    }

                },

                displayEditor (oEvent, content, type) {
                    oEvent.getSource().getModel().oData.value = content;
                    oEvent.getSource().getModel().oData.type = type;
                    oEvent.getSource().getModel().refresh();
                },

                onClose: function () {
                    this.oDialog.close();

                }
            };

            let XMLDef = `<core:FragmentDefinition
            xmlns="sap.m"
                xmlns:mvc="sap.ui.core.mvc"
                xmlns:core="sap.ui.core"
                xmlns:tnt="sap.tnt"
                xmlns:editor="sap.ui.codeeditor">
                  <Dialog title="abap2UI5 - Debugging Tools" stretch="true">
                  <HBox>
                <tnt:SideNavigation id="sideNavigation" selectedKey="PLAIN" itemSelect="onItemSelect">
                    <tnt:NavigationList>
                        <tnt:NavigationListItem text="Communication" icon="sap-icon://employee">
                            <tnt:NavigationListItem text="Previous Request" id="REQUEST" key="REQUEST" />
                            <tnt:NavigationListItem text="Response"                id="PLAIN"         key="PLAIN"/>
                        </tnt:NavigationListItem>
                        <tnt:NavigationListItem text="View" icon="sap-icon://employee">
                            <tnt:NavigationListItem text="View (XML)"           id="VIEW"          key="VIEW"/>
                            <tnt:NavigationListItem text="View Model (JSON)"    id="MODEL"         key="MODEL"  />
                            <tnt:NavigationListItem text="Popup (XML)"          id="POPUP"         key="POPUP"          enabled="{/activePopup}"/>
                            <tnt:NavigationListItem text="Popup Model (JSON)"   id="POPUP_MODEL"   key="POPUP_MODEL"    enabled="{/activePopup}"/>
                            <tnt:NavigationListItem text="Popover (XML)"        id="POPOVER"       key="POPOVER"        enabled="{/activePopover}"/>
                            <tnt:NavigationListItem text="Popover Model (JSON)" id="POPOVER_MODEL" key="POPOVER_MODEL"  enabled="{/activePopover}"/>
                            <tnt:NavigationListItem text="Nest1 (XML)"          id="NEST1"         key="NEST1"          enabled="{/activeNest1}"/>
                            <tnt:NavigationListItem text="Nest1 Model (JSON)"   id="NEST1_MODEL"   key="NEST1_MODEL"    enabled="{/activeNest1}"/>
                            <tnt:NavigationListItem text="Nest2 (XML)"          id="NEST2"         key="NEST2"          enabled="{/activeNest2}"/>
                            <tnt:NavigationListItem text="Nest2 Model (JSON)"   id="NEST2_MODEL"   key="NEST2_MODEL"    enabled="{/activeNest2}"/>
                        </tnt:NavigationListItem>
                    </tnt:NavigationList>
                </tnt:SideNavigation>
                    <editor:CodeEditor
                    type="{/type}"
                    value='{/value}'
                height="800px" width="1200px"/> </HBox>
               <footer><Toolbar><ToolbarSpacer/><Button text="Close" press="onClose"/></Toolbar></footer>
               </Dialog>
            </core:FragmentDefinition>`;
            XMLDef = `PGNvcmU6RnJhZ21lbnREZWZpbml0aW9uCiAgICAgICAgICAgIHhtbG5zPSJzYXAubSIKICAgICAgICAgICAgICAgIHhtbG5zOm12Yz0ic2FwLnVpLmNvcmUubXZjIgogICAgICAgICAgICAgICAgeG1sbnM6Y29yZT0ic2FwLnVpLmNvcmUiCiAgICAgICAgICAgICAgICB4bWxuczp0bnQ9InNhcC50bnQiCiAgICAgICAgICAgICAgICB4bWxuczplZGl0b3I9InNhcC51aS5jb2RlZWRpdG9yIj4KICAgICAgICAgICAgICAgICAgPERpYWxvZyB0aXRsZT0iYWJhcDJVSTUgLSBEZWJ1Z2dpbmcgVG9vbHMiIHN0cmV0Y2g9InRydWUiPgogICAgICAgICAgICAgICAgICA8SEJveD4KICAgICAgICAgICAgICAgIDx0bnQ6U2lkZU5hdmlnYXRpb24gaWQ9InNpZGVOYXZpZ2F0aW9uIiBzZWxlY3RlZEtleT0iUExBSU4iIGl0ZW1TZWxlY3Q9Im9uSXRlbVNlbGVjdCI+CiAgICAgICAgICAgICAgICAgICAgPHRudDpOYXZpZ2F0aW9uTGlzdD4KICAgICAgICAgICAgICAgICAgICAgICAgPHRudDpOYXZpZ2F0aW9uTGlzdEl0ZW0gdGV4dD0iQ29tbXVuaWNhdGlvbiIgaWNvbj0ic2FwLWljb246Ly9lbXBsb3llZSI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dG50Ok5hdmlnYXRpb25MaXN0SXRlbSB0ZXh0PSJQcmV2aW91cyBSZXF1ZXN0IiBpZD0iUkVRVUVTVCIga2V5PSJSRVFVRVNUIiAvPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRudDpOYXZpZ2F0aW9uTGlzdEl0ZW0gdGV4dD0iUmVzcG9uc2UiICAgICAgICAgICAgICAgIGlkPSJQTEFJTiIgICAgICAgICBrZXk9IlBMQUlOIi8+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvdG50Ok5hdmlnYXRpb25MaXN0SXRlbT4KICAgICAgICAgICAgICAgICAgICAgICAgPHRudDpOYXZpZ2F0aW9uTGlzdEl0ZW0gdGV4dD0iVmlldyIgaWNvbj0ic2FwLWljb246Ly9lbXBsb3llZSI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dG50Ok5hdmlnYXRpb25MaXN0SXRlbSB0ZXh0PSJWaWV3IChYTUwpIiAgICAgICAgICAgaWQ9IlZJRVciICAgICAgICAgIGtleT0iVklFVyIvPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRudDpOYXZpZ2F0aW9uTGlzdEl0ZW0gdGV4dD0iVmlldyBNb2RlbCAoSlNPTikiICAgIGlkPSJNT0RFTCIgICAgICAgICBrZXk9Ik1PREVMIiAgLz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0bnQ6TmF2aWdhdGlvbkxpc3RJdGVtIHRleHQ9IlBvcHVwIChYTUwpIiAgICAgICAgICBpZD0iUE9QVVAiICAgICAgICAga2V5PSJQT1BVUCIgICAgICAgICAgZW5hYmxlZD0iey9hY3RpdmVQb3B1cH0iLz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0bnQ6TmF2aWdhdGlvbkxpc3RJdGVtIHRleHQ9IlBvcHVwIE1vZGVsIChKU09OKSIgICBpZD0iUE9QVVBfTU9ERUwiICAga2V5PSJQT1BVUF9NT0RFTCIgICAgZW5hYmxlZD0iey9hY3RpdmVQb3B1cH0iLz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0bnQ6TmF2aWdhdGlvbkxpc3RJdGVtIHRleHQ9IlBvcG92ZXIgKFhNTCkiICAgICAgICBpZD0iUE9QT1ZFUiIgICAgICAga2V5PSJQT1BPVkVSIiAgICAgICAgZW5hYmxlZD0iey9hY3RpdmVQb3BvdmVyfSIvPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRudDpOYXZpZ2F0aW9uTGlzdEl0ZW0gdGV4dD0iUG9wb3ZlciBNb2RlbCAoSlNPTikiIGlkPSJQT1BPVkVSX01PREVMIiBrZXk9IlBPUE9WRVJfTU9ERUwiICBlbmFibGVkPSJ7L2FjdGl2ZVBvcG92ZXJ9Ii8+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dG50Ok5hdmlnYXRpb25MaXN0SXRlbSB0ZXh0PSJOZXN0MSAoWE1MKSIgICAgICAgICAgaWQ9Ik5FU1QxIiAgICAgICAgIGtleT0iTkVTVDEiICAgICAgICAgIGVuYWJsZWQ9InsvYWN0aXZlTmVzdDF9Ii8+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dG50Ok5hdmlnYXRpb25MaXN0SXRlbSB0ZXh0PSJOZXN0MSBNb2RlbCAoSlNPTikiICAgaWQ9Ik5FU1QxX01PREVMIiAgIGtleT0iTkVTVDFfTU9ERUwiICAgIGVuYWJsZWQ9InsvYWN0aXZlTmVzdDF9Ii8+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dG50Ok5hdmlnYXRpb25MaXN0SXRlbSB0ZXh0PSJOZXN0MiAoWE1MKSIgICAgICAgICAgaWQ9Ik5FU1QyIiAgICAgICAgIGtleT0iTkVTVDIiICAgICAgICAgIGVuYWJsZWQ9InsvYWN0aXZlTmVzdDJ9Ii8+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dG50Ok5hdmlnYXRpb25MaXN0SXRlbSB0ZXh0PSJOZXN0MiBNb2RlbCAoSlNPTikiICAgaWQ9Ik5FU1QyX01PREVMIiAgIGtleT0iTkVTVDJfTU9ERUwiICAgIGVuYWJsZWQ9InsvYWN0aXZlTmVzdDJ9Ii8+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvdG50Ok5hdmlnYXRpb25MaXN0SXRlbT4KICAgICAgICAgICAgICAgICAgICA8L3RudDpOYXZpZ2F0aW9uTGlzdD4KICAgICAgICAgICAgICAgIDwvdG50OlNpZGVOYXZpZ2F0aW9uPgogICAgICAgICAgICAgICAgICAgIDxlZGl0b3I6Q29kZUVkaXRvcgogICAgICAgICAgICAgICAgICAgIHR5cGU9InsvdHlwZX0iCiAgICAgICAgICAgICAgICAgICAgdmFsdWU9J3svdmFsdWV9JwogICAgICAgICAgICAgICAgaGVpZ2h0PSI4MDBweCIgd2lkdGg9IjEyMDBweCIvPiA8L0hCb3g+CiAgICAgICAgICAgICAgIDxmb290ZXI+PFRvb2xiYXI+PFRvb2xiYXJTcGFjZXIvPjxCdXR0b24gdGV4dD0iQ2xvc2UiIHByZXNzPSJvbkNsb3NlIi8+PC9Ub29sYmFyPjwvZm9vdGVyPgogICAgICAgICAgICAgICA8L0RpYWxvZz4KICAgICAgICAgICAgPC9jb3JlOkZyYWdtZW50RGVmaW5pdGlvbj4=`;
            XMLDef = atob( XMLDef );
            if (this.oFragment) {
                this.oFragment.close();
                this.oFragment.destroy();
            }
            this.oFragment = await Fragment.load({
                definition: XMLDef,
                controller: oFragmentController,
            });

            oFragmentController.oDialog = this.oFragment;

            let value = JSON.stringify(sap.z2ui5.oResponse, null, 3);
            let oData = { 
                type: 'json', 
                value: value,
                activeNest1   : sap?.z2ui5?.oViewNest?.mProperties?.viewContent !== undefined,
                activeNest2   : sap?.z2ui5?.oViewNest2?.mProperties?.viewContent !== undefined,
                activePopup   : sap?.z2ui5?.oViewPopup?.mProperties?.viewContent !== undefined,
                activePopover : sap?.z2ui5?.oViewPopover?.mProperties?.viewContent !== undefined,
            };
            var oModel = new JSONModel(oData);
            this.oFragment.setModel(oModel);
            this.oFragment.open();

        },

        async init() {

            document.addEventListener("keydown", function (zEvent) {
                if (zEvent.ctrlKey && zEvent.key === "a") {  // case sensitive
                    sap.m.MessageToast.show(`test`);
                    sap.z2ui5.DebuggingTools.show();
                }
            });

        },

        renderer(oRm, oControl) {
        },

    });
});