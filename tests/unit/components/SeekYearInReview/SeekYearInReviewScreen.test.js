import React from "react";
import { render, screen } from "@testing-library/react-native";

import SeekYearInReviewScreen from "../../../../components/SeekYearInReview/SeekYearInReviewScreen";
import {
  SpeciesDetailContext,
  AppOrientationContext,
  UserContext
} from "../../../../components/UserContext";

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
    useRoute: () => ( {} )
  };
} );

jest.mock(
  "../../../../components/SeekYearInReview/hooks/seekYearInReviewHooks",
  () => ( {
    __esModule: true,
    useUploadedObservationCount: jest.fn( () => 60 ),
    useFetchStats: jest.fn( () => ( {
      level: {
        count: 3,
        earned: true,
        earnedDate: "2022-11-16T16:43:25.157Z",
        earnedIconName: "levelbadge-3",
        iconicTaxonId: 0,
        iconicTaxonName: null,
        index: 1,
        infoText: "",
        intlName: "levels.cub",
        name: "Cub"
      },
      countBadgesThisYear: 10,
      observationsThisYear: [],
      topThreeSpeciesBadges: [
        {
          count: 24,
          earned: true,
          earnedDate: "2022-11-16T12:08:56.328Z",
          earnedIconName: "badge_plant_1",
          iconicTaxonId: 47126,
          iconicTaxonName: "taxon_picker.plants",
          index: 109,
          infoText: "badges.plant_1",
          intlName: "badges.name_plant_1",
          name: "1st Plant"
        },
        {
          count: 23,
          earned: true,
          earnedDate: "2022-11-16T16:43:42.920Z",
          earnedIconName: "badge_bird_1",
          iconicTaxonId: 3,
          iconicTaxonName: "taxon_picker.birds",
          index: 100,
          infoText: "badges.bird_1",
          intlName: "badges.name_bird_1",
          name: "1st Bird"
        },
        {
          count: 22,
          earned: true,
          earnedDate: "2022-11-16T16:43:48.679Z",
          earnedIconName: "badge_mammal_1",
          iconicTaxonId: 40151,
          iconicTaxonName: "taxon_picker.mammals",
          index: 103,
          infoText: "badges.mammal_1",
          intlName: "badges.name_mammal_1",
          name: "1st Mammal"
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
        { count: 17, month: 7 },
        { count: 18, month: 8 },
        { count: 19, month: 9 },
        { count: 20, month: 10 },
        { count: 21, month: 11 },
        { count: 22, month: 12 }
      ]
    } ) ),
    useCountObservationsForYear: jest.fn( () => 100 ),
    useFetchChallengesForYear: jest.fn( () => [] )
  } )
);

const renderScreen = () => {
  render(
    <UserContext.Provider value={{}} >
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
    renderScreen();
    await screen.findByTestId( containerID );
    expect( screen.queryByTestId( containerID ) ).toBeTruthy();
    // Create snapshot
    expect( screen ).toMatchSnapshot();
  } );

  test( "should show number of new observations for this year correctly", async () => {
    renderScreen();
    const newObservationsText = await screen.findByText( /100 new species/i );
    expect( newObservationsText ).toBeTruthy();
  } );

  test( "should show badge image correctly", async () => {
    // renderScreen();
    // TODO: Find and assert badge image
  } );

  test( "should show top three badges information correctly", async () => {
    renderScreen();
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
  } );

  test( "should show histogram correctly", async () => {
    // renderScreen();
    // TODO: Find and assert histogram
  } );

} );
