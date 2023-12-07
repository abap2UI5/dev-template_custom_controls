CLASS z2cl_a2ui5_my_test_app DEFINITION PUBLIC.

  PUBLIC SECTION.

    INTERFACES z2ui5_if_app.

    DATA mv_binded_value TYPE string.

    DATA check_initialized TYPE abap_bool.
    DATA client TYPE REF TO z2ui5_if_client.
    METHODS display_view.
    METHODS init.
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS z2cl_a2ui5_my_test_app IMPLEMENTATION.


  METHOD z2ui5_if_app~main.

    me->client = client.

    IF check_initialized = abap_false.
      init( ).
      RETURN.
    ENDIF.

    CASE client->get( )-event.
      WHEN 'ON_CC_LOADED'.
        display_view( ).
      WHEN 'MY_FRONTEND_EVENT'.
        client->message_box_display( |Frontend Event raised, and processed in the backend, value: { mv_binded_value }| ).
      WHEN 'BACK'.
        client->nav_app_leave( client->get_app( client->get( )-s_draft-id_prev_app_stack  ) ).
    ENDCASE.

  ENDMETHOD.

  METHOD display_view.

    DATA(view) = z2ui5_cl_xml_view=>factory( ).
    client->view_display( view->shell(
      )->page( 'abap2UI5 - My CC App'
      )->_generic(
        name   = `MyCustomControl`
        ns     = `z2ui5`
        t_prop = VALUE #(
            ( n = `value`               v = client->_bind_edit( mv_binded_value ) )
            ( n = `change`              v = client->_event( 'MY_FRONTEND_EVENT' ) )
            ( n = `checkCallMyFunction` v = `true` )
             )
      )->stringify( ) ).

  ENDMETHOD.


  METHOD init.

    check_initialized = abap_true.
    mv_binded_value = `my backend value`.

    DATA(view) = z2ui5_cl_xml_view=>factory( ).
    client->view_display(
      view->_generic( ns = `html` name = `script` )->_cc_plain_xml( zcl_a2ui5_my_custom_control=>get_js( )
          )->_z2ui5( )->timer( client->_event( `ON_CC_LOADED` )
          )->stringify( ) ).

  ENDMETHOD.

ENDCLASS.
