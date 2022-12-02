import React from "react";
import { render, screen, fireEvent } from "tests/jest-utils";

import SeekYearInReviewMap from "../../../../components/SeekYearInReview/SeekYearInReviewMap";

const mockNavigate = {
  navigate: jest.fn()
};

jest.mock( "@react-navigation/native", () => {
  const actualNav = jest.requireActual( "@react-navigation/native" );
  return {
    ...actualNav,
    useNavigation: () => ( {
      ...mockNavigate,
      dispatch: jest.fn()
    } ),
    useRoute: () => ( {} )
  };
} );

const mockObservations = [
    {
        latitude: 42,
        longitude: -42,
        taxon: {},
        uuidString: "some-uuid1"
    },
    {
        latitude: -42,
        longitude: 42,
        taxon: {},
        uuidString: "some-uuid2"
    },
    {
        latitude: 42,
        longitude: 42,
        taxon: {},
        uuidString: "some-uuid3"
    }
];

const year = 2022;

const renderMap = () => {
  return render( <SeekYearInReviewMap year={year} observations={mockObservations} /> );
};

describe( "SeekYearInReviewMap", () => {
  test( "should render correctly", async () => {
    renderMap();

    const mapScreenButton = await screen.findByText( "VIEW OBSERVATIONS MAP" );
    expect( mapScreenButton ).toBeTruthy();

    expect( screen ).toMatchSnapshot();
  } );

  test( "should show observation markers", async () => {
    renderMap();

    const obs1Marker = await screen.findByTestId( "some-uuid1" );
    expect( obs1Marker ).toBeTruthy();
    expect( obs1Marker.props.coordinate.latitude ).toBe( 42 );
    expect( obs1Marker.props.coordinate.longitude ).toBe( -42 );
    const obs2Marker = await screen.findByTestId( "some-uuid2" );
    expect( obs2Marker ).toBeTruthy();
    expect( obs2Marker.props.coordinate.latitude ).toBe( -42 );
    expect( obs2Marker.props.coordinate.longitude ).toBe( 42 );
    const obs3Marker = await screen.findByTestId( "some-uuid3" );
    expect( obs3Marker ).toBeTruthy();
    expect( obs3Marker.props.coordinate.latitude ).toBe( 42 );
    expect( obs3Marker.props.coordinate.longitude ).toBe( 42 );
  } );

  test( "should call navigation to map screen", async () => {
    renderMap();

    const mapScreenButton = await screen.findByText( "VIEW OBSERVATIONS MAP" );
    fireEvent.press( mapScreenButton );

    expect( mockNavigate.navigate ).toHaveBeenCalledWith(
      "SeekYearInReviewMapScreen",
      expect.anything()
    );
  } );
} );
