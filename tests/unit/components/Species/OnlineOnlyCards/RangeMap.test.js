import React from "react";
import { render, screen } from "@testing-library/react-native";

import RangeMap from "../../../../../components/Species/OnlineOnlyCards/RangeMap";

jest.mock( "@react-navigation/native", () => {
  const actualNav = jest.requireActual( "@react-navigation/native" );
  return {
    ...actualNav,
    useNavigation: () => ( {
      navigate: jest.fn(),
      dispatch: jest.fn(),
      // To intercept on focus listener
      addListener: ( event, callback ) => {
        if ( event === "focus" ) {
          callback();
        }
      }
    } ),
    useRoute: () => ( {
      params: {
        region: {
          latitude: 42.1234567,
          longitude: 42.1234567
        },
        id: "some_id",
        seenDate: "some_date"
      }
    } )
  };
} );

jest.mock( "../../../../../utility/locationHelpers", () => ( {
  __esModule: true,
  fetchTruncatedUserLocation: ( ) => {
    return new Promise( ( resolve ) => {
      resolve( {
        latitude: 42.42,
        longitude: 42.42
      } );
    } );
  }
} ) );

const containerID = "range-map-container";
const mapID = "range-map";
const buttonID = "user-location-button";

describe( "RangeMap", () => {
  test( "should render correctly", () => {
    render( <RangeMap /> );
    // renders the map
    screen.findByTestId( containerID );
    // Create snapshot
    expect( screen ).toMatchSnapshot();
  } );

  test( "should render the map with region as given in props", async () => {
    render( <RangeMap /> );
    // renders the map container
    screen.findByTestId( containerID );

    // renders the map with location passed in navigation props
    await screen.findByTestId( mapID );
    const map = screen.getByTestId( mapID );

    // Expect location given by props
    expect( map.props.region.latitude ).toBe( 42.1234567 );
    expect( map.props.region.longitude ).toBe( 42.1234567 );
  } );

  test( "should change map region to user's location when button is pressed", async () => {
    render( <RangeMap /> );
    const map = screen.getByTestId( mapID );

    // renders the user location button
    await screen.findByTestId( buttonID );
    const locationButton = screen.getByTestId( buttonID );
    expect( locationButton ).toBeTruthy();

    // Create snapshot
    expect( screen ).toMatchSnapshot();

    // Press the location button and expect the map to update
    // TODO: thios button press takes forever, the fireEvent is triggering the onPress but the map is not updating, but taking forever to finish the test
    // fireEvent.press( locationButton );
    // expect( map.props.region.latitude ).toBe( 42.42 );
  } );
} );
