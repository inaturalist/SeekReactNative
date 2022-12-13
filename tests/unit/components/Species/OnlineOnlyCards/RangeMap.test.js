import React from "react";
import { render, screen, fireEvent } from "tests/jest-utils";

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
  test( "should render correctly", async () => {
    render( <RangeMap /> );

    // renders the map
    await screen.findByTestId( containerID );
    // Create snapshot
    expect( screen ).toMatchSnapshot();
    screen.unmount();
  } );

  test( "should render the map with region as given in props", async () => {
    render( <RangeMap /> );

    // renders the map with location passed in navigation props
    await screen.findByTestId( mapID );
    const map = screen.getByTestId( mapID );
    // Expect location given by props
    expect( map.props.region.latitude ).toBe( 42.1234567 );
    expect( map.props.region.longitude ).toBe( 42.1234567 );
    screen.unmount();
  } );

  test( "should change map region to user's location when button is pressed", async () => {
    render( <RangeMap /> );

    // renders the user location button
    await screen.findByTestId( buttonID );
    const locationButton = screen.getByTestId( buttonID );
    expect( locationButton ).toBeTruthy();
    // Press the location button and expect the map to update
    fireEvent.press( locationButton );

    const map = screen.getByTestId( mapID );
    expect( map.props.region.latitude ).toBe( 42.42 );
    // Create snapshot
    expect( screen ).toMatchSnapshot();
    screen.unmount();
  } );
} );
