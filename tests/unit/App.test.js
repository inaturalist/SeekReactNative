import React from "react";
import { render, screen } from "@testing-library/react-native";
import { View } from "react-native";

import SeekApp from "../../components/App";
import RootStack from "../../components/Navigation/RootStack";

jest.mock( "../../components/Navigation/RootStack", () =>
  jest.fn().mockReturnValue( null )
);

describe( "App", () => {
  test( "container should render correctly", () => {
    RootStack.mockReturnValue( <View testID="test-added-app-stack" /> );
    render( <SeekApp /> );
    expect( screen.findByTestId( "test-added-app-stack" ) ).toBeTruthy();
    expect( screen ).toMatchSnapshot();
  } );
} );
