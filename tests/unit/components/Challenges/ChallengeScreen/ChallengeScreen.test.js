import React from "react";
import { render, screen } from "tests/jest-utils";

import ChallengeScreen from "../../../../../components/Challenges/ChallengeScreen/ChallengeScreen";

const mockChallenges = [
  { header: "challenges.in_progress", id: 0, type: "header" },
  {
    action: "seek_2023_challenges.october_2023_action_migration",
    availableDate: new Date( "2023-09-30T22:00:00.000Z" ),
    backgroundName: "img-challengedetail-october2023",
    badgeName: "seek_challenges.badge",
    completedDate: null,
    description: "seek_2023_challenges.october_2023_description_migration",
    earnedIconName: "badge_inaturalist_october2023",
    index: 47,
    logo: "iNatWhite",
    missions: [],
    name: "seek_2023_challenges.october_2023_challenge_name_migration",
    numbersObserved: [],
    percentComplete: 0,
    photographer: null,
    secondLogo: "iNat",
    sponsorName: "Seek",
    startedDate: new Date( "2022-12-08T12:38:04.813Z" ),
    totalSpecies: 5
  },
  {
    action: "seek_2021_challenges.september_2021_action",
    availableDate: new Date( "2023-08-31T22:00:00.000Z" ),
    backgroundName: "img-challengedetail-september2023",
    badgeName: "seek_challenges.badge",
    completedDate: null,
    description: "seek_2021_challenges.september_2021_description",
    earnedIconName: "badge_inaturalist_september2023",
    index: 46,
    logo: "iNatWhite",
    missions: [],
    name: "seek_2023_challenges.september_2023_challenge_name_equinox",
    numbersObserved: [],
    percentComplete: 50,
    photographer: null,
    secondLogo: "iNat",
    sponsorName: "Seek",
    startedDate: new Date( "2022-12-08T12:59:06.180Z" ),
    totalSpecies: 10
  },
  {
    header: "challenges.not_started",
    id: 1,
    type: "header"
  },
  {
    action: "seek_challenges.action_dec_2020",
    availableDate: new Date( "2023-11-30T23:00:00.000Z" ),
    backgroundName: "img-challengedetail-december2023",
    badgeName: "seek_challenges.badge",
    completedDate: null,
    description: "seek_2023_challenges.december_2023_description_ecology",
    earnedIconName: "badge_inaturalist_december2023",
    index: 49,
    logo: "iNatWhite",
    missions: [],
    name: "seek_2023_challenges.december_2023_challenge_name_ecology",
    numbersObserved: [],
    percentComplete: 0,
    photographer: null,
    secondLogo: "iNat",
    sponsorName: "Seek",
    startedDate: null,
    totalSpecies: 10
  },
  {
    action: "seek_2023_challenges.august_2023_action_insect",
    availableDate: new Date( "2023-07-31T22:00:00.000Z" ),
    backgroundName: "img-challengedetail-august2023",
    badgeName: "seek_challenges.badge",
    completedDate: null,
    description: "seek_2023_challenges.august_2023_description_insect",
    earnedIconName: "badge_inaturalist_august2023",
    index: 45,
    logo: "iNatWhite",
    missions: [],
    name: "seek_2023_challenges.august_2023_challenge_name_insect",
    numbersObserved: [],
    percentComplete: 0,
    photographer: null,
    secondLogo: "iNat",
    sponsorName: "Seek",
    startedDate: null,
    totalSpecies: 10
  },
  {
    header: "challenges.completed",
    id: 2,
    type: "header"
  },
  {
    action: "challenges.action_october",
    availableDate: new Date( "2019-09-30T22:00:00.000Z" ),
    backgroundName: "img-challengedetail-october",
    badgeName: "challenges.badge_name_october",
    completedDate: new Date( "2022-12-09T12:38:04.813Z" ),
    description: "challenges.october_description",
    earnedIconName: "badge_ourplanet_october",
    index: 5,
    logo: "op",
    missions: [],
    name: "challenges.hotspots",
    numbersObserved: [],
    percentComplete: 100,
    photographer: "challenges.photographer_october",
    secondLogo: "wwfop",
    sponsorName: "Our Planet",
    startedDate: new Date( "2022-12-08T12:38:04.813Z" ),
    totalSpecies: 5
  },
  {
    action: "challenges.action_september",
    availableDate: new Date( "2019-08-31T22:00:00.000Z" ),
    backgroundName: "img-challengedetail-september",
    badgeName: "challenges.badge_name_september",
    completedDate: new Date( "2022-12-09T12:38:04.813Z" ),
    description: "challenges.september_description",
    earnedIconName: "badge_ourplanet_september",
    index: 4,
    logo: "op",
    missions: [],
    name: "challenges.flow",
    numbersObserved: [],
    percentComplete: 100,
    photographer: "challenges.photographer_september",
    secondLogo: "wwfop",
    sponsorName: "Our Planet",
    startedDate: new Date( "2022-12-08T12:38:04.813Z" ),
    totalSpecies: 10
  }
];

jest.mock(
  "../../../../../components/Challenges/hooks/challengeHooks",
  () => ( {
    __esModule: true,
    useFetchChallenges: jest.fn( () => mockChallenges )
  } )
);

const renderScreen = () => {
  return render(
    <ChallengeScreen />
  );
};

const containerID = "challenge-screen-container";

describe( "ChallengeScreen", () => {
  test( "should render correctly", async () => {
    jest.useFakeTimers().setSystemTime( new Date( 2020, 5, 15 ) );
    renderScreen();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();

    const container = await screen.findByTestId( containerID );
    expect( container ).toBeTruthy();

    // Create snapshot
    expect( screen ).toMatchSnapshot();
  } );
} );
