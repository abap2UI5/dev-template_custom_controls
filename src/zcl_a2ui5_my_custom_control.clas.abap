CLASS zcl_a2ui5_my_custom_control DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.
    CLASS-METHODS get_js
      RETURNING
        VALUE(result) TYPE string.
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_a2ui5_my_custom_control IMPLEMENTATION.

  METHOD get_js.

    result = `jQuery.sap.declare("z2ui5.MyCustomControl");` && |\n|  &&
             `sap.ui.require([` && |\n|  &&
             `  "sap/ui/core/Control"` && |\n|  &&
             `], (Control) => {` && |\n|  &&
             `  "use strict";` && |\n|  &&
             |\n|  &&
             `  return Control.extend("z2ui5.MyCustomControl", {` && |\n|  &&
             `      metadata: {` && |\n|  &&
             |\n|  &&
             `          properties: {` && |\n|  &&
             `              value: { type: "string" },` && |\n|  &&
             `              checkCallMyFunction: { type : "boolean" }` && |\n|  &&
             `          },` && |\n|  &&
             `          events: {` && |\n|  &&
             `              change: {}` && |\n|  &&
             `          }` && |\n|  &&
             `      },` && |\n|  &&
             |\n|  &&
             `      setValue(value) {` && |\n|  &&
             `          this.setProperty("value", value);` && |\n|  &&
             `      },` && |\n|  &&
             `      getValue() {` && |\n|  &&
             `          return this.getProperty("value");` && |\n|  &&
             `      },` && |\n|  &&
             `      setCheckCallMyFunction(checkCallMyFunction) {` && |\n|  &&
             `          if (checkCallMyFunction) {` && |\n|  &&
             `              this.myFrontendFunction();` && |\n|  &&
             `          }` && |\n|  &&
             `          this.setProperty("checkCallMyFunction", false);` && |\n|  &&
             `      },` && |\n|  &&
             `      init() {` && |\n|  &&
             `      },` && |\n|  &&
             |\n|  &&
             `      myFrontendFunction(){` && |\n|  &&
             `          sap.m.MessageToast.show( 'myFrontendFunction called' );` && |\n|  &&
             `      },` && |\n|  &&
             |\n|  &&
             `      onAfterRendering() {` && |\n|  &&
             |\n|  &&
             `          setTimeout((oControl) => {` && |\n|  &&
             `              oControl.setValue("frontend value");` && |\n|  &&
             `              oControl.fireChange();` && |\n|  &&
             `          }, 3000, this);` && |\n|  &&
             |\n|  &&
             `      },` && |\n|  &&
             |\n|  &&
             `      renderer(oRM, oControl) {` && |\n|  &&
             `          oRM.openStart("div", oControl);` && |\n|  &&
             `          oRM.openEnd();` && |\n|  &&
             `          oRM.write(oControl.getValue("value"));` && |\n|  &&
             `          oRM.close("div");` && |\n|  &&
             `      }` && |\n|  &&
             `  });` && |\n|  &&
             `});`.

  ENDMETHOD.

ENDCLASS.
