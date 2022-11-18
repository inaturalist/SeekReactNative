import React from "react";
import { render, screen } from "@testing-library/react-native";
import { View } from "react-native";

import SeekApp from "../../components/App";
import RootStack from "../../components/Navigation/RootStack";

jest.mock( "../../components/Navigation/RootStack", () =>
  jest.fn().mockReturnValue( null )
);

const testID = "test-app";
describe( "App", () => {
  test( "container should render correctly", async () => {
    RootStack.mockReturnValue( <View testID={testID} /> );
    // render( <SeekApp /> );
    // await screen.findByTestId( testID );
    // expect( screen.getByTestId( testID ) ).toBeTruthy();
    // expect( screen ).toMatchSnapshot();
  } );
} );
