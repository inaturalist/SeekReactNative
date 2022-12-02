import React from "react";
import { render, screen } from "tests/jest-utils";

import SideMenu from "../../../../components/UIComponents/SideMenu";

describe( "SideMenu", () => {
    test( "should render correctly", async () => {
        render( <SideMenu navigation={{}} /> );
        await screen.findByTestId( "side-menu" );
        expect( screen ).toMatchSnapshot( );
     } );
} );
