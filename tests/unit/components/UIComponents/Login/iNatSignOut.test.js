import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";

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

  test( "press signs the user out", () => {
    const user = {
      login: "some_token",
      userProfile: {
        login: "some_name",
        icon: "some_photo"
      }
    };

    renderButton( user );
    const button = screen.getByText( "SIGN OUT OF INATURALIST" );
    fireEvent.press( button );
    // TODO: test that the user is signed out
  } );
} );
