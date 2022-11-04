import { render } from "@testing-library/react-native";

import UserLoginProvider from "../components/Providers/UserLoginProvider";
import INatSignOut from "../components/UIComponents/Login/iNatSignOut";

function renderButton() {
  return render(
    <UserLoginProvider>
      <INatSignOut />
    </UserLoginProvider>
  );
}

test( "that sign out button renders", () => {
  renderButton();
} );
