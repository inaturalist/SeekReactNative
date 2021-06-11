// @flow

import * as React from "react";
import { render } from "@testing-library/react-native";
import DescriptionText from "../DescriptionText";

describe( "DescriptionText", () => {
  it( "displays the passed-in name", () => {
    const { queryByText } = render( <DescriptionText text="Seek" /> );
    expect( queryByText( "Seek" ) ).not.toBeNull();
  } );
} );
