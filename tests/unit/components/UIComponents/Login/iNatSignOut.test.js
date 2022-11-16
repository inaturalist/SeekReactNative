import React from "react";
import { render, screen } from "@testing-library/react-native";

import UserLoginProvider from "../../../../../components/Providers/UserLoginProvider";
import INatSignOut from "../../../../../components/UIComponents/Login/iNatSignOut";

function renderButton( user ) {
  return render(
    <UserLoginProvider value={user}>
      <INatSignOut />
    </UserLoginProvider>
  );
}

describe( "iNatSignOut", () => {
  test( "should render correctly", () => {
    renderButton();
    screen.findByText( "SIGN OUT OF INATURALIST" );
    expect( screen ).toMatchSnapshot();
  } );
} );
