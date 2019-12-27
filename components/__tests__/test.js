import React from "react";
import { render, fireEvent } from "react-native-testing-library";

import AboutScreen from "../AboutScreen";
import Observations from "../Observations/Observations";

const navigation = {
  navigate: jest.fn(),
  addListener: jest.fn()
};

test( "About Screen loads and renders", () => {
  const { debug, getByTestId } = render( <AboutScreen navigation={navigation} /> );

  const versionNumber = getByTestId( "versionNumber" );

  expect( versionNumber ).toBeDefined();

  debug( "debug message" );
} );

test( "Observation Screen loads and renders", () => {
  const { debug, getByTestId } = render( <Observations navigation={navigation} /> );

  const scrollView = getByTestId( "scroll-view" );

  expect( scrollView ).toBeDefined();

  debug( "debug message" );
} );
