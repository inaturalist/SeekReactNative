import React from "react";
import { render, screen, fireEvent } from "tests/jest-utils";

import UserLoginProvider from "../../../../../components/Providers/UserLoginProvider";
import INatSignOut from "../../../../../components/UIComponents/Login/iNatSignOut";

function renderWithoutUser() {
  return render(
    <UserLoginProvider value={{}}>
      <INatSignOut />
    </UserLoginProvider>
  );
}

describe( "iNatSignOut", () => {
  test( "should render correctly", async () => {
    renderWithoutUser();
    await screen.findByText( "SIGN OUT OF INATURALIST" );
    expect( screen ).toMatchSnapshot();
  } );
} );
