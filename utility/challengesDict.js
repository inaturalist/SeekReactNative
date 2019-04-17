const challenges = {
  april: {
    name: "challenges.connectivity",
    month: "challenges.april_2019",
    description: "challenges.april_description",
    totalSpecies: 10,
    homeBackgroundName: "img-homechallenge-april",
    backgroundName: "img-challengedetail-april",
    unearnedIconName: "badge_empty",
    earnedIconName: "badge_ourplanet_april",
    missions: ["challenges.mission_1_april"],
    availableDate: new Date( 2019, 3, 1 ),
    index: 0
  },
  may: {
    name: "challenges.biodiversity",
    month: "challenges.may_2019",
    description: "challenges.may_description",
    totalSpecies: 20,
    homeBackgroundName: "img-homechallenge-may",
    backgroundName: "img-challengedetail-may",
    unearnedIconName: "badge_empty",
    earnedIconName: "badge_ourplanet_may",
    missions: [
      "challenges.mission_1_may",
      "challenges.mission_2_may",
      "challenges.mission_3_may",
      "challenges.mission_4_may",
      "challenges.mission_5_may"
    ],
    availableDate: new Date( 2019, 4, 1 ),
    index: 1
  }
};

export default challenges;
