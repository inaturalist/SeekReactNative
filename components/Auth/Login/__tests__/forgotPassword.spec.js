import React from "react";
import {render, fireEvent} from "@testing-library/react-native";
import ForgotPassword from "../ForgotPasswordScreen";

beforeEach( () => {
  fetch.resetMocks();
} );

describe( "ForgotPassword", () => {
  describe( "clicking submit", () => {
    const testEmail = "123@me.com";
    let getByTestId;

    beforeEach( () => {
      ( {getByTestId} = render( <ForgotPassword /> ) );

      fetch.mockResponseOnce( JSON.stringify( { status: 200 } ) );

      fireEvent.changeText( getByTestId( "emailAddress" ), testEmail );
      fireEvent.press( getByTestId( "greenButton" ) );
    } );

    it( "does not clear the input field", () => {
      expect( getByTestId( "emailAddress" ).props.value ).toEqual( testEmail );
    } );

    it( "calls fetch", () => {
      expect( fetch ).toHaveBeenCalled();
    } );
  } );
} );
