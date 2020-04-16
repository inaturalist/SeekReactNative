import React from "react";
import { Platform } from "react-native";
import { render, fireEvent } from "react-native-testing-library";
import About from "../AboutScreen";

describe( "About", () => {
  describe( "button to navigate to Debug Log", () => {
    let getByTestId;

    beforeEach( () => {
      ( { getByTestId } = render( <About /> ) );

      fireEvent.press( getByTestId( "debug" ) );
    } );

    it( "only shows Debug Log screen to Android users", () => {
      if ( Platform.OS === "android" ) {
        expect( getByTestId( "debug" ).props.disabled ).toEqual( false );
      } else {
        expect( getByTestId( "debug" ).props.disabled ).toEqual( true );
      }
    } );
  } );
} );
