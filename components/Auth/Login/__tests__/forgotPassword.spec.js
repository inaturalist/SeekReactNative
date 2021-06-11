// @flow

import * as React from "react";
import {render, fireEvent} from "@testing-library/react-native";
import ForgotPassword from "../ForgotPasswordScreen";

import i18n from "../../../../i18n";
import { checkIsEmailValid } from "../../../../utility/loginHelpers";

beforeEach( () => {
  fetch.resetMocks();
} );

jest.mock( "@react-navigation/native", ( ) => ( {
  useNavigation: jest.fn( () => ( {
    addListener: jest.fn(),
    navigate: jest.fn()
  } ) ),
  useRoute: jest.fn( ).mockReturnValue( { name: "Login" } )
} ) );

describe( "ForgotPassword", () => {
  describe( "clicking submit for valid email", () => {
    const testEmail = "123@me.com";
    let getByTestId;

    beforeEach( () => {
      ( {getByTestId} = render( <ForgotPassword /> ) );

      fetch.mockResponseOnce( { status: 200 } );

      fireEvent.changeText( getByTestId( "emailAddress" ), testEmail );
      fireEvent.press( getByTestId( "greenButton" ) );
    } );

    it( "does not clear the input field", () => {
      expect( getByTestId( "emailAddress" ).props.value ).toEqual( testEmail );
    } );

    it( "validates email", () => {
      expect( checkIsEmailValid( testEmail ) ).toBeTruthy();
    } );

    it( "calls fetch", () => {
      expect( fetch ).toHaveBeenCalledTimes( 1 );
    } );
  } );

  describe( "clicking submit for invalid email", () => {
    const testEmail = "0@me";
    const loginErrorText = i18n.t( "login.error_email" );
    let getByTestId;

    beforeEach( () => {
      ( {getByTestId} = render( <ForgotPassword /> ) );

      fetch.mockResponseOnce( { status: 200 } );

      fireEvent.changeText( getByTestId( "emailAddress" ), testEmail );
      fireEvent.press( getByTestId( "greenButton" ) );
    } );

    it( "invalidates email", () => {
      expect( checkIsEmailValid( testEmail ) ).toBeFalsy();
    } );

    it( "does not call fetch", () => {
      expect( fetch ).toHaveBeenCalledTimes( 0 );
    } );

    it( "displays the correct login error", () => {
      expect( getByTestId( "loginError" ).props.children ).toContain( loginErrorText );
    } );
  } );
} );
