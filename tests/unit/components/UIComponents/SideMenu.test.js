import React from "react";
import { render, screen } from "@testing-library/react-native";

import SideMenu from "../../../../components/UIComponents/SideMenu";

describe( "SideMenu", () => {
    test( "should render correctly", () => {
        render( <SideMenu navigation={{}} /> );
        screen.findByTestId( "side-menu" );
        expect( screen ).toMatchSnapshot( );
     } );
} );
