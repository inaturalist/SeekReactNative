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

describe( "RangeMap", () => {
  test( "should render correctly", () => {
    render( <RangeMap /> );
    // renders the map
    screen.findByTestId( "range-map-container" );
    // Create snapshot
    expect( screen ).toMatchSnapshot();
  } );
} );
