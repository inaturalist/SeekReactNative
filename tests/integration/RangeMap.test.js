import { fireEvent, render, screen } from "@testing-library/react-native";

import RangeMap from "../../components/Species/OnlineOnlyCards/RangeMap";

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
  test( "should render a location button when user has a location", async () => {
    render( <RangeMap /> );
    // renders the map container
    screen.findByTestId( "range-map-container" );

    // renders the map with location passed in navigation props
    screen.findByTestId( "range-map" );
    const map = screen.getByTestId( "range-map" );
    expect( map.props.region.latitude ).toBe( 42 );

    // renders the user location button
    await screen.findByTestId( "user-location-button" );
    const locationButton = screen.getByTestId( "user-location-button" );
    expect( locationButton ).toBeTruthy();

    // Create snapshot
    expect( screen ).toMatchSnapshot();

    // Press the location button and expect the map to update
    // TODO: this is not working, the fireEvent is triggering the onPress but the map is not updating, but taking forever to finish the test
    // fireEvent.press( locationButton );
    // expect( map.props.region.latitude ).toBe( 42.42 );
  } );
} );
