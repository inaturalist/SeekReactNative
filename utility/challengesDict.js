const challenges = {
  april: {
    name: "challenges.connectivity",
    month: "challenges.april_2019",
    description: "challenges.april_description",
    totalSpecies: 4, // change this back to 20 before release
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
    totalSpecies: 17,
    unearnedIconName: "badge_empty",
    earnedIconName: "",
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
