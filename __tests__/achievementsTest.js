import React from "react";

import { render } from "react-native-testing-library";
import AchievementsScreen from "../components/Achievements/AchievementsScreen";

describe( "Achievements Screen", () => {
  test( "renders correctly", () => {
    const tree = render( <AchievementsScreen /> );
    expect( tree ).toMatchSnapshot();
  } );
} );
