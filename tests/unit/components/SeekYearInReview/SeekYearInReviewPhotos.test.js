import React from "react";
import { render, screen, fireEvent } from "tests/jest-utils";

import SeekYearInReviewPhotos from "../../../../components/SeekYearInReview/SeekYearInReviewPhotos";

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
    date: new Date( "2022-12-02T10:19:54.000Z" ),
    latitude: 42,
    longitude: 42,
    taxon: {
      ancestorIds: [1, 2, 3],
      defaultPhoto: {
        backupUri: "some_uri",
        lastUpdated: null,
        mediumUrl: "some_medium_url"
      },
      iconicTaxonId: 1,
      id: 4242,
      name: "some_name_1",
      preferredCommonName: "some_common_name_1"
    },
    uuidString: "some_uuid_2"
  },
  {
    date: new Date( "2022-12-01T10:19:54.000Z" ),
    latitude: 42,
    longitude: 42,
    taxon: {
      ancestorIds: [1, 2, 3],
      defaultPhoto: {
        backupUri: "some_uri",
        lastUpdated: null,
        mediumUrl: "some_medium_url"
      },
      iconicTaxonId: 1,
      id: 4242,
      name: "some_name_2",
      preferredCommonName: null
    },
    uuidString: "some_uuid_2"
  },
  {
    date: new Date( "2022-12-03T10:19:54.000Z" ),
    latitude: 42,
    longitude: 42,
    taxon: {
      ancestorIds: [1, 2, 3],
      defaultPhoto: {
        backupUri: "some_uri",
        lastUpdated: null,
        mediumUrl: "some_medium_url"
      },
      iconicTaxonId: 1,
      id: 4242,
      name: "some_name_3",
      preferredCommonName: null
    },
    uuidString: "some_uuid_2"
  }
];

jest.mock( "../../../../utility/customHooks", () => {
  const actual = jest.requireActual( "../../../../utility/customHooks" );
  return {
    ...actual,
    __esModule: true,
    useSeenTaxa: jest.fn( () => mockObservations[0] ),
    useUserPhoto: jest.fn( () => ( {
        uri: "some_uri"
    } ) )
  };
} );

const renderPhotos = () => {
  return render(
    <SeekYearInReviewPhotos observations={mockObservations} />
  );
};

const containerID = "year-in-review-photos-container";

const scrollEventData = {
  nativeEvent: {
    contentOffset: {
      x: 500
    },
    contentSize: {
      // Dimensions of the scrollable content
      height: 500,
      width: 100
    },
    layoutMeasurement: {
      // Dimensions of the device
      height: 100,
      width: 100
    }
  }
};

describe( "SeekYearInReviewPhotos", () => {
  test( "should render correctly", async () => {
    renderPhotos();

    const container = await screen.findByTestId( containerID );
    expect( container ).toBeTruthy();
    // First obs photo should be visible
    const description1 = await screen.findByText( /some_common_name_1/ );
    expect( description1 ).toBeTruthy();
    // Right arrow should be visible
    const rightArrow = await screen.findByTestId( "right-arrow" );
    expect( rightArrow ).toBeTruthy();
    // Second obs photo should not be visible
    const description2 = screen.queryByText( /some_name_3/ );
    expect( description2 ).toBeNull();

    // TODO: errors out on CI because it uses local timezone to display the date string in the photo description
    // expect( screen ).toMatchSnapshot();
  } );

  test( "should show third photo after scroll", async () => {
    renderPhotos();

    // Scroll list to second photo
    const horizontalScroll = await screen.findByTestId( "horizontal-scroll" );
    fireEvent.scroll( horizontalScroll, scrollEventData );

    const description2 = await screen.findAllByText( /some_name_3/ );
    expect( description2 ).toBeTruthy();
  } );

  test( "should navigate to species detail on photo press", async () => {
    renderPhotos();

    const description1 = await screen.findByText( /some_common_name_1/ );
    fireEvent.press( description1 );

    expect( mockNavigate.navigate ).toHaveBeenCalledWith( "Species" );
  } );
} );
