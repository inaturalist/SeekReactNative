import React from "react";
import { render, screen } from "tests/jest-utils";

import NotificationsScreen from "../../../../components/notifications/Notifications";

const mockNavigate = {
  navigate: jest.fn()
};

jest.mock( "@react-navigation/native", () => {
  const actualNav = jest.requireActual( "@react-navigation/native" );
  return {
    ...actualNav,
    useNavigation: () => ( {
      ...mockNavigate,
      dispatch: jest.fn(),
      // To intercept on focus listener
      addListener: ( event, callback ) => {
        if ( event === "focus" ) {
          callback();
        }
      }
    } ),
    useRoute: () => ( {} ),
    useScrollToTop: () => jest.fn()
  };
} );

const mockNotifications = [
  {
    challengeIndex: 37,
    iconName: "badge_empty",
    index: 0,
    message: "notifications.view_challenges",
    nextScreen: "ChallengeDetails",
    seen: false,
    title: "notifications.new_challenge",
    viewed: false
  },
  {
    challengeIndex: 36,
    iconName: "badge_empty",
    index: 0,
    message: "notifications.view_challenges",
    nextScreen: "ChallengeDetails",
    seen: true,
    title: "notifications.new_challenge",
    viewed: true
  }
];

jest.mock(
  "../../../../components/Notifications/hooks/notificationHooks",
  () => ( {
    __esModule: true,
    default: jest.fn( () => mockNotifications )
  } )
);

const containerID = "notifications-screen-container";

describe( "NotificationsScreen", () => {
  test( "should render correctly", async () => {
    render( <NotificationsScreen /> );
    const container = await screen.findByTestId( containerID );
    expect( container ).toBeTruthy();
    expect( screen ).toMatchSnapshot();
  } );
} );
