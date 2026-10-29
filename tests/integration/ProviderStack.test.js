import React from "react";
import { Text } from "react-native";
import { render, screen } from "tests/helpers/render";

describe( "Provider stack", () => {
  test( "renders children through shared test providers", () => {
    render( <Text testID="provider-stack-child">Seek</Text> );
    expect( screen.getByTestId( "provider-stack-child" ) ).toBeTruthy();
  } );
} );
