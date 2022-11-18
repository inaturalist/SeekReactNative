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
          latitude: 42,
          longitude: 42
        },
        id: "some_id",
        seenDate: "some_date"
      }
    } )
  };
} );

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

  test( "should render a location button when location in props", async () => {
    render( <RangeMap /> );
    // renders the map container
    screen.findByTestId( containerID );

    // renders the map with location passed in navigation props
    screen.findByTestId( mapID );
    const map = screen.getByTestId( mapID );
    expect( map.props.region.latitude ).toBe( 42 );

    // renders the user location button
    await screen.findByTestId( buttonID );
    const locationButton = screen.getByTestId( buttonID );
    expect( locationButton ).toBeTruthy();

    // Create snapshot
    expect( screen ).toMatchSnapshot();

    // Press the location button and expect the map to update
    // TODO: this is not working, the fireEvent is triggering the onPress but the map is not updating, but taking forever to finish the test
    // fireEvent.press( locationButton );
    // expect( map.props.region.latitude ).toBe( 42.42 );
  } );
} );
