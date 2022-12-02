import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import SeekYearInReviewScreen from "../../../../components/SeekYearInReview/SeekYearInReviewScreen";
import {
  SpeciesDetailContext,
  AppOrientationContext,
  UserContext
} from "../../../../components/UserContext";
import {
  useFetchStats,
  useFetchChallengesForYear
} from "../../../../components/SeekYearInReview/hooks/seekYearInReviewHooks";
import { useUploadedObservationCount } from "../../../../utility/customHooks";

const mockNavigate = {
  navigate: jest.fn( )
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
    useRoute: () => ( {} )
  };
} );

const mockState = {
  level: {
    count: 3,
    earned: true,
    earnedDate: new Date( "2022-11-16T16:43:25.157Z" ),
    earnedIconName: "levelbadge-3",
    iconicTaxonId: 0,
    iconicTaxonName: null,
    index: 1,
    infoText: "",
    intlName: "levels.cub",
    name: "Cub"
  },
  countBadgesThisYear: 10,
  observationsThisYear: [
    {
      "latitude": 42,
      "longitude": -42,
      "taxon": {},
      "uuidString": "some-uuid1"
    },
    {
      "latitude": -42,
      "longitude": 42,
      "taxon": {},
      "uuidString": "some-uuid2"
    },
    {
      "latitude": 42,
      "longitude": 42,
      "taxon": {},
      "uuidString": "some-uuid3"
    }
  ],
  topThreeSpeciesBadges: [
    {
      count: 5,
      earned: true,
      earnedDate: new Date( "2022-11-16T12:08:56.328Z" ),
      earnedIconName: "badge_plant_1",
      iconicTaxonId: 47126,
      iconicTaxonName: "taxon_picker.plants",
      index: 109,
      infoText: "badges.plant_1",
      intlName: "badges.name_plant_1",
      name: "1st Plant",
      observationsThisYear: 24
    },
    {
      count: 5,
      earned: true,
      earnedDate: new Date( "2022-11-16T16:43:42.920Z" ),
      earnedIconName: "badge_bird_1",
      iconicTaxonId: 3,
      iconicTaxonName: "taxon_picker.birds",
      index: 100,
      infoText: "badges.bird_1",
      intlName: "badges.name_bird_1",
      name: "1st Bird",
      observationsThisYear: 23
    },
    {
      count: 5,
      earned: true,
      earnedDate: new Date( "2022-11-16T16:43:48.679Z" ),
      earnedIconName: "badge_mammal_1",
      iconicTaxonId: 40151,
      iconicTaxonName: "taxon_picker.mammals",
      index: 103,
      infoText: "badges.mammal_1",
      intlName: "badges.name_mammal_1",
      name: "1st Mammal",
      observationsThisYear: 22
    }
  ],
  randomObservations: [],
  histogram: [
    { count: 11, month: 1 },
    { count: 12, month: 2 },
    { count: 13, month: 3 },
    { count: 14, month: 4 },
    { count: 15, month: 5 },
    { count: 16, month: 6 },
    { count: 18, month: 7 },
    { count: 18, month: 8 },
    { count: 19, month: 9 },
    { count: 20, month: 10 },
    { count: 21, month: 11 },
    { count: 22, month: 12 }
  ]
};

const mockChallenges = {
  challengeBadges: [
    {
      "action": "challenges.action_april",
      "availableDate": new Date( "2019-03-31T22:00:00.000Z" ),
      "backgroundName": "img-challengedetail-april",
      "badgeName": "challenges.badge_name_april",
      "completedDate": new Date( "2022-04-31T22:00:00.000Z" ),
      "description": "challenges.april_description",
      "earnedIconName": "badge_ourplanet_april",
      "index": 0,
      "logo": "op",
      "missions": [],
      "name": "challenges.connectivity",
      "numbersObserved": [],
      "percentComplete": 100,
      "photographer": "challenges.photographer_april",
      "secondLogo": "wwfop",
      "sponsorName": "Our Planet",
      "startedDate": new Date( "2022-03-31T22:00:00.000Z" ),
      "totalSpecies": 10
    },
    {
      "action": "challenges.action_may",
      "availableDate": new Date( "2019-04-30T22:00:00.000Z" ),
      "backgroundName": "img-challengedetail-may",
      "badgeName": "challenges.badge_name_may",
      "completedDate": new Date( "2022-04-31T22:00:00.000Z" ),
      "description": "challenges.may_description",
      "earnedIconName": "badge_ourplanet_may",
      "index": 1,
      "logo": "op",
      "missions": [],
      "name": "challenges.biodiversity",
      "numbersObserved": [],
      "percentComplete": 100,
      "photographer": "challenges.photographer_may",
      "secondLogo": "wwfop",
      "sponsorName": "Our Planet",
      "startedDate": new Date( "2022-03-31T22:00:00.000Z" ),
      "totalSpecies": 20
    },
    {
      "action": "challenges.action_june",
      "availableDate": new Date( "2019-05-31T22:00:00.000Z" ),
      "backgroundName": "img-challengedetail-june",
      "badgeName": "challenges.badge_name_june",
      "completedDate": new Date( "2022-04-31T22:00:00.000Z" ),
      "description": "challenges.june_description",
      "earnedIconName": "badge_ourplanet_june",
      "index": 2,
      "logo": "op",
      "missions": [],
      "name": "challenges.productivity",
      "numbersObserved": [],
      "percentComplete": 100,
      "photographer": "challenges.photographer_june",
      "secondLogo": "wwfop",
      "sponsorName": "Our Planet",
      "startedDate": new Date( "2022-03-31T22:00:00.000Z" ),
      "totalSpecies": 13
    }
  ],
  challengeCount: 3
};

jest.mock(
  "../../../../components/SeekYearInReview/hooks/seekYearInReviewHooks",
  () => ( {
    __esModule: true,
    useFetchStats: jest.fn( () => mockState ),
    useCountObservationsForYear: jest.fn( () => 100 ),
    useFetchChallengesForYear: jest.fn( () => mockChallenges )
  } )
);

jest.mock(
  "../../../../utility/customHooks",
  () => {
    const actual = jest.requireActual( "../../../../utility/customHooks" );
    return {
      ...actual,
      __esModule: true,
      useUploadedObservationCount: jest.fn( () => 60 ),
      useSpeciesCount: jest.fn( () => 55 )
    };
  }
);

const renderScreen = ( {
      login
    } = {
      login: "test"
    } ) => {
  return render(
    <UserContext.Provider value={{ login }} >
      <AppOrientationContext.Provider value={{}} >
        <SpeciesDetailContext.Provider value={{}} >
          <SeekYearInReviewScreen />
        </SpeciesDetailContext.Provider>
      </AppOrientationContext.Provider>
    </UserContext.Provider>
  );
};

const containerID = "seek-yir-screen-container";

describe( "SeekYearInReviewScreen", () => {
  test( "should render correctly", async () => {
    const {unmount} = renderScreen();

    const container = await screen.findByTestId( containerID );
    expect( container ).toBeTruthy();
    // Should show observations section
    const observationsBanner = await screen.findByText( "OBSERVATIONS" );
    expect( observationsBanner ).toBeTruthy();
    // Should show observations map section
    const observationsText = await screen.findByText( "OBSERVATIONS MAP" );
    expect( observationsText ).toBeTruthy();
    // Should show iNaturalist section
    const iNatText = await screen.findByText( "INATURALIST" );
    expect( iNatText ).toBeTruthy();
    const iNatText2 = await screen.findByText( "Thank you for contributing to our community!" );
    expect( iNatText2 ).toBeTruthy();
    // Should show the donate section
    const donateText1 = await screen.findByText( /Thank you for using Seek!/ );
    expect( donateText1 ).toBeTruthy();
    const donateText2 = await screen.findByText( /As a small team, we greatly appreciate/ );
    expect( donateText2 ).toBeTruthy();
    const donateButton = await screen.findByText( "DONATE" );
    expect( donateButton ).toBeTruthy();
    // Create snapshot
    expect( screen ).toMatchSnapshot();

    unmount();
  } );

  test( "should show number of new observations for this year correctly", async () => {
    const { unmount } = renderScreen();

    const newObservationsText = await screen.findByText( /100 new species/i );
    expect( newObservationsText ).toBeTruthy();

    unmount();
  } );

  test( "should show level modal after tap", async () => {
    const { unmount } = renderScreen();

    const newObservationsText = await screen.findByText( /100 new species/i );
    fireEvent.press( newObservationsText );

    const levelBadge = await screen.findByText( /cub/i );
    expect( levelBadge ).toBeTruthy();

    unmount();
  } );

  test( "should show top three badges information correctly", async () => {
    const { unmount } = renderScreen();

    const plantsBadge = await screen.findByLabelText( "1 plant!" );
    expect( plantsBadge ).toBeTruthy();
    const birdsBadge = await screen.findByLabelText( "1 bird!" );
    expect( birdsBadge ).toBeTruthy();
    const mammalsBadge = await screen.findByLabelText( "1 mammal!" );
    expect( mammalsBadge ).toBeTruthy();
    const plantCount = await screen.findByText( "24" );
    expect( plantCount ).toBeTruthy();
    const birdsCount = await screen.findByText( "23" );
    expect( birdsCount ).toBeTruthy();
    const mammalsCount = await screen.findByText( "22" );
    expect( mammalsCount ).toBeTruthy();
    const plants = await screen.findByText( /plants/i );
    expect( plants ).toBeTruthy();
    const birds = await screen.findByText( /birds/i );
    expect( birds ).toBeTruthy();
    const mammals = await screen.findByText( /mammals/i );
    expect( mammals ).toBeTruthy();

    unmount();
  } );

  test( "should not show top three badges information if there are no badges", async () => {
    useFetchStats.mockReturnValue( { ...mockState, topThreeSpeciesBadges: [] } );
    const { unmount } = renderScreen();
    await screen.findByTestId( containerID );

    const topThreeBanner = screen.queryByText( /Top Species/i );
    expect( topThreeBanner ).toBeNull();
    const plantsBadge = screen.queryByLabelText( "1 plant!" );
    expect( plantsBadge ).toBeNull();
    const plantCount = screen.queryByText( "24" );
    expect( plantCount ).toBeNull();
    const plants = screen.queryByText( /plants/i );
    expect( plants ).toBeNull();

    unmount();
    useFetchStats.mockReturnValue( mockState );
  } );

  test( "should not show small observations map section with observations without coordinates", async () => {
    useFetchStats.mockReturnValue( {
      ...mockState,
      observationsThisYear: [
        {
          latitude: undefined,
          longitude: undefined,
          taxon: {},
          uuidString: "some-uuid1"
        }
      ]
    } );
    const { unmount } = renderScreen();
    await screen.findByTestId( containerID );

    const text = await screen.queryByText( "OBSERVATIONS MAP" );
    expect( text ).toBeNull();

    unmount();
    useFetchStats.mockReturnValue( mockState );
  } );

  test( "should not show iNaturalist section without login", async () => {
    const { unmount } = renderScreen( { login: null } );
    await screen.findByTestId( containerID );

    const text = await screen.queryByText( "INATURALIST" );
    expect( text ).toBeNull();

    unmount();
  } );

  test( "should show count of uploaded observations correctly", async () => {
    const { unmount } = renderScreen();
    await screen.findByTestId( containerID );

    const observationCount = await screen.findByText( "60" );
    expect( observationCount ).toBeTruthy();

    unmount();
  } );

  test( "should not show uploaded observations text without uploaded observations", async () => {
    useUploadedObservationCount.mockReturnValue( 0 );
    const { unmount } = renderScreen();
    await screen.findByTestId( containerID );

    const uploadedCountText = await screen.queryByText( "60" );
    expect( uploadedCountText ).toBeNull();

    unmount();
    useUploadedObservationCount.mockReturnValue( 60 );
  } );

  test( "should show count of challenge badges correctly", async () => {
    const { unmount } = renderScreen();
    await screen.findByTestId( containerID );

    const challengesCountText = await screen.findByText( "3" );
    expect( challengesCountText ).toBeTruthy();

    unmount();
  } );

  test( "should not show challenges section without completed challenges", async () => {
    useFetchChallengesForYear.mockReturnValue( {
      challengeBadges: [],
      challengeCount: 0
    } );
    const { unmount } = renderScreen();
    await screen.findByTestId( containerID );

    const challengesBanner = await screen.queryByText( "CHALLENGES" );
    expect( challengesBanner ).toBeNull();

    unmount();
    useFetchChallengesForYear.mockReturnValue( mockChallenges );
  } );

  test( "should navigate to donate screen from button", async () => {
    const { unmount } = renderScreen();
    await screen.findByTestId( containerID );

    const donateButton = await screen.findByText( "DONATE" );
    fireEvent.press( donateButton );

    const navigateSpy = jest.spyOn( mockNavigate, "navigate" );
    expect( navigateSpy ).toHaveBeenCalledWith( "Donation", {"utmCampaign": "2022-year-in-review"} );

    unmount();
  } );
} );
