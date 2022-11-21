import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";

import UserLoginProvider from "../components/Providers/UserLoginProvider";
import LoginCard from "../components/UIComponents/Login/LoginCard";

function renderLoginCard() {
  return render(
    <UserLoginProvider>
      <LoginCard />
    </UserLoginProvider>
  );
}

describe( "LoginCard", () => {
  test( "that login card renders button based on user status", () => {
    renderLoginCard();
    const signInButton = screen.getByText( "LOG IN WITH INATURALIST" );
    expect( signInButton ).toBeTruthy();
    fireEvent.press( signInButton );
    // const signOutButton = screen.getByText( "SIGN OUT OF INATURALIST" );
    // TODO: test that pressing the sign-in button signs the user in
    // expect( signOutButton ).toBeTruthy();
  } );
} );
