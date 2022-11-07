import { render, screen, fireEvent } from "@testing-library/react-native";

import UserLoginProvider from "../components/Providers/UserLoginProvider";
import INatSignOut from "../components/UIComponents/Login/iNatSignOut";

function renderButton( user ) {
  return render(
    <UserLoginProvider value={user}>
      <INatSignOut />
    </UserLoginProvider>
  );
}

test( "that sign out button renders", () => {
  renderButton();
  expect( screen.getByText( "SIGN OUT OF INATURALIST" ) ).toBeTruthy();
} );

test( "that sign out button press signs the user out", () => {
  const user = {
    login: "some_token",
    userProfile: {
      login: "some_name",
      icon: "some_photo"
    }
  };
  renderButton( user );
  fireEvent.press( screen.getByText( "SIGN OUT OF INATURALIST" ) );
  // TODO: test that the user is signed out
} );


