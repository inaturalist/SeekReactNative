import React from "react";
import { Platform } from "react-native";
import { render, fireEvent } from "react-native-testing-library";
import About from "../AboutScreen";

describe( "About", () => {
  describe( "navigate to debug", () => {
    let getByTestId;

    beforeEach( () => {
      ( { getByTestId } = render( <About /> ) );

      fireEvent.press( getByTestId( "debug" ) );
    } );

    it( "navigates to Debug screen on Android", () => {
      if ( Platform.OS === "android" ) {
        expect( getByTestId( "debug" ).props.disabled ).toEqual( false );
      } else {
        expect( getByTestId( "debug" ).props.disabled ).toEqual( true );
      }
    } );
  } );
} );
