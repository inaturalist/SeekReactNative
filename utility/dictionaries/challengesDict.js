// @flow

const challenges = {
  april: {
    name: "challenges.connectivity",
    description: "challenges.april_description",
    totalSpecies: 10,
    backgroundName: "img-challengedetail-april",
    earnedIconName: "badge_ourplanet_april",
    missions: ["challenges.mission_1_april"],
    availableDate: ( new Date( 2019, 3, 1 ): Date ),
    photographer: "challenges.photographer_april",
    action: "challenges.action_april",
    badgeName: "challenges.badge_name_april"
  },
  may: {
    name: "challenges.biodiversity",
    description: "challenges.may_description",
    totalSpecies: 20,
    backgroundName: "img-challengedetail-may",
    earnedIconName: "badge_ourplanet_may",
    missions: [
      "challenges.mission_1_may",
      "challenges.mission_2_may",
      "challenges.mission_3_may",
      "challenges.mission_4_may",
      "challenges.mission_5_may"
    ],
    availableDate: ( new Date( 2019, 4, 1 ): Date ),
    photographer: "challenges.photographer_may",
    action: "challenges.action_may",
    badgeName: "challenges.badge_name_may"
  },
  june: {
    name: "challenges.productivity",
    description: "challenges.june_description",
    totalSpecies: 13,
    backgroundName: "img-challengedetail-june",
    earnedIconName: "badge_ourplanet_june",
    missions: [
      "challenges.mission_1_june",
      "challenges.mission_2_june",
      "challenges.mission_3_june",
      "challenges.mission_4_june"
    ],
    availableDate: ( new Date( 2019, 5, 1 ): Date ),
    photographer: "challenges.photographer_june",
    action: "challenges.action_june",
    badgeName: "challenges.badge_name_june"
  },
  august: {
    name: "challenges.farming",
    description: "challenges.august_description",
    totalSpecies: 10,
    backgroundName: "img-challengedetail-august",
    earnedIconName: "badge_ourplanet_august",
    missions: [
      "challenges.mission_1_august"
    ],
    availableDate: ( new Date( 2019, 7, 1 ): Date ),
    photographer: "challenges.photographer_august",
    action: "challenges.action_august",
    badgeName: "challenges.badge_name_august"
  },
  september: {
    name: "challenges.flow",
    description: "challenges.september_description",
    totalSpecies: 10,
    backgroundName: "img-challengedetail-september",
    earnedIconName: "badge_ourplanet_september",
    missions: [
      "challenges.mission_1_september"
    ],
    availableDate: ( new Date( 2019, 8, 1 ): Date ),
    photographer: "challenges.photographer_september",
    action: "challenges.action_september",
    badgeName: "challenges.badge_name_september"
  },
  october: {
    name: "challenges.hotspots",
    description: "challenges.october_description",
    totalSpecies: 5,
    backgroundName: "img-challengedetail-october",
    earnedIconName: "badge_ourplanet_october",
    missions: [
      "challenges.mission_1_october"
    ],
    availableDate: ( new Date( 2019, 9, 1 ): Date ),
    photographer: "challenges.photographer_october",
    action: "challenges.action_october",
    badgeName: "challenges.badge_name_october"
  },
  november: {
    name: "challenges.resilience",
    description: "challenges.november_description",
    totalSpecies: 10,
    backgroundName: "img-challengedetail-november",
    earnedIconName: "badge_ourplanet_november",
    missions: [
      "challenges.mission_1_november"
    ],
    availableDate: ( new Date( 2019, 10, 1 ): Date ),
    photographer: "challenges.photographer_november",
    action: "challenges.action_november_2019",
    badgeName: "challenges.badge_name_november"
  },
  december: {
    name: "challenges.ice",
    description: "challenges.december_description",
    totalSpecies: 20,
    backgroundName: "img-challengedetail-december",
    earnedIconName: "badge_ourplanet_december",
    missions: [
      "challenges.mission_1_december"
    ],
    availableDate: ( new Date( 2019, 11, 1 ): Date ),
    photographer: "challenges.photographer_december",
    action: "challenges.action_december",
    badgeName: "challenges.badge_name_december"
  },
  april2020: {
    name: "seek_challenges.citizen_science",
    description: "seek_challenges.april_2020_description",
    totalSpecies: 10,
    backgroundName: "img-challengedetail-april2020",
    earnedIconName: "badge_inaturalist_april2020",
    missions: ["challenges.mission_1_april"],
    availableDate: ( new Date( 2020, 3, 1 ): Date ),
    action: "seek_challenges.action_april_2020"
  },
  may2020: {
    name: "seek_challenges.backyard",
    description: "seek_challenges.may_2020_description",
    totalSpecies: 10,
    backgroundName: "img-challengedetail-may2020",
    earnedIconName: "badge_inaturalist_may2020",
    missions: [
      "seek_challenges.mission_1_may_2020",
      "seek_challenges.mission_2_may_2020",
      "seek_challenges.mission_3_may_2020",
      "seek_challenges.mission_4_may_2020"
    ],
    availableDate: ( new Date( 2020, 4, 1 ): Date ),
    action: "seek_challenges.action_may_2020"
  },
  june2020: {
    name: "seek_challenges.resilience",
    description: "seek_challenges.june_2020_description",
    totalSpecies: 6,
    backgroundName: "img-challengedetail-june2020",
    earnedIconName: "badge_inaturalist_june2020",
    missions: [
      "seek_challenges.mission_1_june_2020",
      "seek_challenges.mission_2_june_2020",
      "seek_challenges.mission_3_june_2020"
    ],
    availableDate: ( new Date( 2020, 5, 1 ): Date ),
    action: "seek_challenges.action_june_2020"
  },
  july2020: {
    name: "seek_challenges.river",
    description: "seek_challenges.july_2020_description",
    totalSpecies: 6,
    backgroundName: "img-challengedetail-july2020",
    earnedIconName: "badge_inaturalist_july2020",
    missions: [
      "seek_challenges.mission_1_july_2020",
      "seek_challenges.mission_2_july_2020",
      "seek_challenges.mission_3_july_2020"
    ],
    availableDate: ( new Date( 2020, 6, 1 ): Date ),
    action: "seek_challenges.action_july_2020"
  },
  aug2020: {
    name: "seek_challenges.pollinator",
    description: "seek_challenges.aug_2020_description",
    totalSpecies: 6,
    backgroundName: "img-challengedetail-august2020",
    earnedIconName: "badge_inaturalist_august2020",
    missions: [
      "seek_challenges.mission_1_aug_2020",
      "seek_challenges.mission_2_aug_2020",
      "seek_challenges.mission_3_aug_2020",
      "seek_challenges.mission_4_aug_2020"
    ],
    availableDate: ( new Date( 2020, 7, 1 ): Date ),
    action: "seek_challenges.action_aug_2020"
  },
  sept2020: {
    name: "seek_challenges.herbivore",
    description: "seek_challenges.sept_2020_description",
    totalSpecies: 13,
    backgroundName: "img-challengedetail-september2020",
    earnedIconName: "badge_inaturalist_september2020",
    missions: [
      "seek_challenges.mission_1_sept_2020",
      "seek_challenges.mission_2_sept_2020",
      "seek_challenges.mission_3_sept_2020"
    ],
    availableDate: ( new Date( 2020, 8, 1 ): Date ),
    action: "seek_challenges.action_sept_2020"
  },
  oct2020: {
    name: "seek_challenges.scavenger",
    description: "seek_challenges.oct_2020_description",
    totalSpecies: 7,
    backgroundName: "img-challengedetail-october2020",
    earnedIconName: "badge_inaturalist_october2020",
    missions: [
      "seek_challenges.mission_1_oct_2020",
      "seek_challenges.mission_2_oct_2020",
      "seek_challenges.mission_3_oct_2020",
      "seek_challenges.mission_4_oct_2020"
    ],
    availableDate: ( new Date( 2020, 9, 1 ): Date ),
    action: "seek_challenges.action_oct_2020"
  },
  nov2020: {
    name: "seek_challenges.adaptation",
    description: "seek_challenges.nov_2020_description",
    totalSpecies: 5,
    backgroundName: "img-challengedetail-november2020",
    earnedIconName: "badge_inaturalist_november2020",
    missions: [
      "seek_challenges.mission_1_nov_2020",
      "seek_challenges.mission_2_nov_2020",
      "seek_challenges.mission_3_nov_2020",
      "seek_challenges.mission_4_nov_2020"
    ],
    availableDate: ( new Date( 2020, 10, 1 ): Date ),
    action: "seek_challenges.action_nov_2020"
  },
  dec2020: {
    name: "seek_challenges.ecosystem",
    description: "seek_challenges.dec_2020_description",
    totalSpecies: 10,
    backgroundName: "img-challengedetail-december2020",
    earnedIconName: "badge_inaturalist_december2020",
    missions: [
      "seek_challenges.mission_1_dec_2020",
      "seek_challenges.mission_2_dec_2020",
      "seek_challenges.mission_3_dec_2020",
      "seek_challenges.mission_4_dec_2020"
    ],
    availableDate: ( new Date( 2020, 11, 1 ): Date ),
    action: "seek_challenges.action_dec_2020"
  },
  mar2021: {
    name: "natgeo_challenges.mar_2021_challenge_name",
    description: "natgeo_challenges.mar_2021_description",
    totalSpecies: 10,
    backgroundName: "img-challengedetail-march2021",
    earnedIconName: "badge_natgeo_march2021",
    missions: [
      "natgeo_challenges.mar_2021_mission_1"
    ],
    availableDate: ( new Date( 2021, 2, 1 ): Date ),
    action: "natgeo_challenges.mar_2021_action",
    badgeName: "natgeo_challenges.mar_2021_badge_name",
    photographer: "natgeo_challenges.mar_2021_photographer"
  },
  apr2021: {
    name: "natgeo_challenges.apr_2021_challenge_name",
    description: "natgeo_challenges.apr_2021_description",
    totalSpecies: 10,
    backgroundName: "img-challengedetail-april2021",
    earnedIconName: "badge_natgeo_april2021",
    missions: [
      "natgeo_challenges.apr_2021_mission_1",
      "natgeo_challenges.apr_2021_mission_2",
      "natgeo_challenges.apr_2021_mission_3"
    ],
    availableDate: ( new Date( 2021, 3, 1 ): Date ),
    action: "natgeo_challenges.apr_2021_action",
    badgeName: "natgeo_challenges.apr_2021_badge_name",
    photographer: "natgeo_challenges.apr_2021_photographer"
  },
  may2021: {
    name: "natgeo_challenges.may_2021_challenge_name",
    description: "natgeo_challenges.may_2021_description",
    totalSpecies: 7,
    backgroundName: "img-challengedetail-may2021",
    earnedIconName: "badge_natgeo_may2021",
    missions: [
      "natgeo_challenges.may_2021_mission_1",
      "natgeo_challenges.may_2021_mission_2"
    ],
    availableDate: ( new Date( 2021, 4, 1 ): Date ),
    action: "natgeo_challenges.may_2021_action",
    badgeName: "natgeo_challenges.may_2021_badge_name",
    photographer: "natgeo_challenges.may_2021_photographer"
  },
  june2021: {
    name: "natgeo_challenges.june_2021_challenge_name",
    description: "natgeo_challenges.june_2021_description",
    totalSpecies: 8,
    backgroundName: "img-challengedetail-june2021",
    earnedIconName: "badge_natgeo_june2021",
    missions: [
      "natgeo_challenges.june_2021_mission_1",
      "natgeo_challenges.june_2021_mission_2",
      "natgeo_challenges.june_2021_mission_3",
      "natgeo_challenges.june_2021_mission_4",
      "natgeo_challenges.june_2021_mission_5",
      "natgeo_challenges.june_2021_mission_6",
      "natgeo_challenges.june_2021_mission_7"
    ],
    availableDate: ( new Date( 2021, 5, 1 ): Date ),
    action: "natgeo_challenges.june_2021_action",
    badgeName: "natgeo_challenges.june_2021_badge_name",
    photographer: "natgeo_challenges.june_2021_photographer"
  },
  aug2021: {
    name: "seek_2021_challenges.august_2021_challenge_name",
    description: "seek_2021_challenges.august_2021_description",
    totalSpecies: 5,
    backgroundName: "img-challengedetail-august2021",
    earnedIconName: "badge_inaturalist_august2021",
    missions: [
      "seek_2021_challenges.august_2021_mission_1"
    ],
    availableDate: ( new Date( 2021, 7, 1 ): Date ),
    action: "seek_2021_challenges.august_2021_action"
  },
  sept2021: {
    name: "seek_2021_challenges.september_2021_challenge_name",
    description: "seek_2021_challenges.september_2021_description",
    totalSpecies: 10,
    backgroundName: "img-challengedetail-september2021",
    earnedIconName: "badge_inaturalist_september2021",
    missions: [
      "seek_2021_challenges.september_2021_mission_1"
    ],
    availableDate: ( new Date( 2021, 8, 1 ): Date ),
    action: "seek_2021_challenges.september_2021_action"
  },
  oct2021: {
    name: "seek_2021_challenges.october_2021_challenge_name",
    description: "seek_2021_challenges.october_2021_description",
    totalSpecies: 4,
    backgroundName: "img-challengedetail-october2021",
    earnedIconName: "badge_inaturalist_october2021",
    missions: [
      "seek_2021_challenges.october_2021_mission_1"
    ],
    availableDate: ( new Date( 2021, 9, 1 ): Date ),
    action: "seek_2021_challenges.october_2021_action"
  },
  nov2021: {
    name: "seek_2021_challenges.november_2021_challenge_name_flight_challenge",
    description: "seek_2021_challenges.november_2021_description_ability_to_fly",
    totalSpecies: 5,
    backgroundName: "img-challengedetail-november2021",
    earnedIconName: "badge_inaturalist_november2021",
    missions: [
      "seek_2021_challenges.november_2021_mission_1"
    ],
    availableDate: ( new Date( 2021, 10, 1 ): Date ),
    action: "seek_2021_challenges.november_2021_action_were_they_flighted"
  },
  dec2021: {
    name: "seek_2021_challenges.december_2021_challenge_name_vertebrate_challenge",
    description: "seek_2021_challenges.december_2021_description_vertebrate_animals_have",
    totalSpecies: 2,
    backgroundName: "img-challengedetail-december2021",
    earnedIconName: "badge_inaturalist_december2021",
    missions: [
      "seek_2021_challenges.december_2021_mission_1"
    ],
    availableDate: ( new Date( 2021, 11, 1 ): Date ),
    action: "seek_2021_challenges.december_2021_action_think_about_predators"
  },
  jan2022: {
    name: "seek_2022_challenges.january_2022_challenge_name_vertebrate_water",
    description: "seek_2022_challenges.january_2022_description_mammals_fishes_birds",
    totalSpecies: 2,
    backgroundName: "img-challengedetail-january2022",
    earnedIconName: "badge_inaturalist_january2022",
    missions: [
      "seek_2022_challenges.january_2022_mission_1"
    ],
    availableDate: ( new Date( 2022, 0, 1 ): Date ),
    action: "seek_2022_challenges.january_2022_action_water_habitat"
  }
  // feb2022: {
  //   name: "seek_2022_challenges.february_2022_challenge_name_life_on_edges",
  //   description: "seek_2022_challenges.february_2022_description_transitions_between_habitats",
  //   totalSpecies: 2,
  //   backgroundName: "img-challengedetail-february2022",
  //   earnedIconName: "badge_inaturalist_february2022",
  //   missions: [
  //     "seek_2022_challenges.february_2022_mission_1"
  //   ],
  //   availableDate: ( new Date( 2022, 1, 1 ): Date ),
  //   action: "seek_2022_challenges.february_2022_action_which_species_excited"
  // }
};

export default challenges;
