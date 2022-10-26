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
    missions: ["challenges.mission_1_august"],
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
    missions: ["challenges.mission_1_september"],
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
    missions: ["challenges.mission_1_october"],
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
    missions: ["challenges.mission_1_november"],
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
    missions: ["challenges.mission_1_december"],
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
    missions: ["natgeo_challenges.mar_2021_mission_1"],
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
    missions: ["seek_2021_challenges.august_2021_mission_1"],
    availableDate: ( new Date( 2021, 7, 1 ): Date ),
    action: "seek_2021_challenges.august_2021_action"
  },
  sept2021: {
    name: "seek_2021_challenges.september_2021_challenge_name",
    description: "seek_2021_challenges.september_2021_description",
    totalSpecies: 10,
    backgroundName: "img-challengedetail-september2021",
    earnedIconName: "badge_inaturalist_september2021",
    missions: ["seek_2021_challenges.september_2021_mission_1"],
    availableDate: ( new Date( 2021, 8, 1 ): Date ),
    action: "seek_2021_challenges.september_2021_action"
  },
  oct2021: {
    name: "seek_2021_challenges.october_2021_challenge_name",
    description: "seek_2021_challenges.october_2021_description",
    totalSpecies: 4,
    backgroundName: "img-challengedetail-october2021",
    earnedIconName: "badge_inaturalist_october2021",
    missions: ["seek_2021_challenges.october_2021_mission_1"],
    availableDate: ( new Date( 2021, 9, 1 ): Date ),
    action: "seek_2021_challenges.october_2021_action"
  },
  nov2021: {
    name: "seek_2021_challenges.november_2021_challenge_name_flight_challenge",
    description:
      "seek_2021_challenges.november_2021_description_ability_to_fly",
    totalSpecies: 5,
    backgroundName: "img-challengedetail-november2021",
    earnedIconName: "badge_inaturalist_november2021",
    missions: ["seek_2021_challenges.november_2021_mission_1"],
    availableDate: ( new Date( 2021, 10, 1 ): Date ),
    action: "seek_2021_challenges.november_2021_action_were_they_flighted"
  },
  dec2021: {
    name: "seek_2021_challenges.december_2021_challenge_name_vertebrate_challenge",
    description:
      "seek_2021_challenges.december_2021_description_vertebrate_animals_have",
    totalSpecies: 2,
    backgroundName: "img-challengedetail-december2021",
    earnedIconName: "badge_inaturalist_december2021",
    missions: ["seek_2021_challenges.december_2021_mission_1"],
    availableDate: ( new Date( 2021, 11, 1 ): Date ),
    action: "seek_2021_challenges.december_2021_action_think_about_predators"
  },
  jan2022: {
    name: "seek_2022_challenges.january_2022_challenge_name_vertebrate_water",
    description:
      "seek_2022_challenges.january_2022_description_mammals_fishes_birds",
    totalSpecies: 2,
    backgroundName: "img-challengedetail-january2022",
    earnedIconName: "badge_inaturalist_january2022",
    missions: ["seek_2022_challenges.january_2022_mission_1"],
    availableDate: ( new Date( 2022, 0, 1 ): Date ),
    action: "seek_2022_challenges.january_2022_action_water_habitat"
  },
  feb2022: {
    name: "seek_2022_challenges.february_2022_challenge_name_life_on_edges",
    description:
      "seek_2022_challenges.february_2022_description_transitions_between_habitats",
    totalSpecies: 2,
    backgroundName: "img-challengedetail-february2022",
    earnedIconName: "badge_inaturalist_february2022",
    missions: ["seek_2022_challenges.february_2022_mission_1"],
    availableDate: ( new Date( 2022, 1, 1 ): Date ),
    action: "seek_2022_challenges.february_2022_action_which_species_excited"
  },
  mar2022: {
    name: "seek_2022_challenges.march_2022_challenge_name_non_flowering_seed",
    description:
      "seek_2022_challenges.march_2022_description_reproduce_from_non_flowers",
    totalSpecies: 3,
    backgroundName: "img-challengedetail-march2022",
    earnedIconName: "badge_inaturalist_march2022",
    missions: ["seek_2022_challenges.march_2022_mission_1"],
    availableDate: ( new Date( 2022, 2, 1 ): Date ),
    action: "seek_2022_challenges.march_2022_action_find_wild_or_intentional"
  },
  apr2022: {
    name: "seek_2022_challenges.april_2022_challenge_name_wildflower",
    description:
      "seek_2022_challenges.april_2022_description_many_flowers_have_colors_shapes",
    totalSpecies: 10,
    backgroundName: "img-challengedetail-april2022",
    earnedIconName: "badge_inaturalist_april2022",
    missions: ["seek_2022_challenges.april_2022_mission_1"],
    availableDate: ( new Date( 2022, 3, 1 ): Date ),
    action: "seek_2022_challenges.april_2022_action_pollen_visible_anther"
  },
  may2022: {
    name: "seek_2022_challenges.may_2022_challenge_name_bee",
    description:
      "seek_2022_challenges.may_2022_description_not_all_bees_make_honey",
    totalSpecies: 3,
    backgroundName: "img-challengedetail-may2022",
    earnedIconName: "badge_my_garden_may2022",
    missions: ["seek_2022_challenges.may_2022_mission_1"],
    availableDate: ( new Date( 2022, 4, 1 ): Date ),
    action: "seek_2022_challenges.may_2022_action_see_bees",
    badgeName: "challenges.badge_name_my_garden_2022"
  },
  june2022: {
    name: "seek_2022_challenges.june_2022_challenge_name_wildflower",
    description:
      "seek_2022_challenges.june_2022_description_most_fruits_and_seeds",
    totalSpecies: 4,
    backgroundName: "img-challengedetail-june2022",
    earnedIconName: "badge_my_garden_june2022",
    missions: [
      "seek_2022_challenges.june_2022_mission_1",
      "seek_2022_challenges.june_2022_mission_2"
    ],
    availableDate: ( new Date( 2022, 5, 1 ): Date ),
    action: "seek_2022_challenges.june_2022_action_busy_pollinators",
    badgeName: "challenges.badge_name_my_garden_2022"
  },
  july2022: {
    name: "seek_2022_challenges.july_2022_challenge_name_exoskeleton",
    description:
      "seek_2022_challenges.july_2022_description_insects_crustaceans",
    totalSpecies: 5,
    backgroundName: "img-challengedetail-july2022",
    earnedIconName: "badge_inaturalist_july2022",
    missions: ["seek_2022_challenges.july_2022_mission_1"],
    availableDate: ( new Date( 2022, 6, 1 ): Date ),
    action: "seek_2022_challenges.july_2022_action_molted_exoskeleton"
  },
  august2022: {
    name: "seek_2022_challenges.august_2022_challenge_name_seed_dispersal",
    description:
      "seek_2022_challenges.august_2022_description_seeds_are_a_lifestage",
    totalSpecies: 6,
    backgroundName: "img-challengedetail-august2022",
    earnedIconName: "badge_inaturalist_august2022",
    missions: [
      "seek_2022_challenges.august_2022_mission_1",
      "seek_2022_challenges.august_2022_mission_2"
    ],
    availableDate: ( new Date( 2022, 7, 1 ): Date ),
    action:
      "seek_2022_challenges.august_2022_action_largest_species_seed_dispersing"
  },
  september2022: {
    name: "seek_2022_challenges.september_2022_challenge_name_photosynthesis",
    description:
      "seek_2022_challenges.september_2022_description_plants_convert_light",
    totalSpecies: 5,
    backgroundName: "img-challengedetail-september2022",
    earnedIconName: "badge_inaturalist_september2022",
    missions: ["seek_2022_challenges.september_2022_mission_1"],
    availableDate: ( new Date( 2022, 8, 1 ): Date ),
    action: "seek_2022_challenges.september_2022_action_photosynthesis"
  },
  october2022: {
    name: "seek_2022_challenges.october_2022_challenge_name_parasite",
    description:
      "seek_2022_challenges.october_2022_description_parasitic_organisms",
    totalSpecies: 3,
    backgroundName: "img-challengedetail-october2022",
    earnedIconName: "badge_inaturalist_october2022",
    missions: ["seek_2022_challenges.october_2022_mission_1"],
    availableDate: ( new Date( 2022, 9, 1 ): Date ),
    action: "seek_2022_challenges.october_2022_action_parasites"
  },
  november2022: {
    name: "seek_2022_challenges.november_2022_challenge_name_urban_nature",
    description:
      "seek_2022_challenges.november_2022_description_some_species_well_adapted",
    totalSpecies: 4,
    backgroundName: "img-challengedetail-november2022",
    earnedIconName: "badge_inaturalist_november2022",
    missions: ["seek_2022_challenges.november_2022_mission_1"],
    availableDate: ( new Date( 2022, 10, 1 ): Date ),
    action: "seek_2022_challenges.november_2022_action_change_location"
  },
  december2022: {
    name: "seek_2022_challenges.december_2022_challenge_name_decomposers",
    description: "seek_challenges.oct_2020_description",
    totalSpecies: 7,
    backgroundName: "img-challengedetail-october2020",
    earnedIconName: "badge_inaturalist_december2022",
    missions: [
      "seek_challenges.mission_1_oct_2020",
      "seek_challenges.mission_2_oct_2020",
      "seek_challenges.mission_3_oct_2020",
      "seek_challenges.mission_4_oct_2020"
    ],
    availableDate: ( new Date( 2022, 11, 1 ): Date ),
    action: "seek_challenges.action_oct_2020"
  },
  january2023: {
    name: "seek_2023_challenges.january_2023_challenge_name_habitats",
    description: "seek_challenges.nov_2020_description",
    totalSpecies: 5,
    backgroundName: "img-challengedetail-november2020",
    earnedIconName: "badge_inaturalist_january2023",
    missions: [
      "seek_challenges.mission_1_nov_2020",
      "seek_challenges.mission_2_nov_2020",
      "seek_challenges.mission_3_nov_2020",
      "seek_challenges.mission_4_nov_2020"
    ],
    availableDate: ( new Date( 2023, 0, 1 ): Date ),
    action: "seek_challenges.action_nov_2020"
  },
  february2023: {
    name: "seek_2023_challenges.february_2023_challenge_name_climate_change",
    description:
      "seek_2023_challenges.february_2023_description_climate_change",
    totalSpecies: 20,
    backgroundName: "img-challengedetail-december",
    earnedIconName: "badge_inaturalist_february2023",
    missions: ["challenges.mission_1_december"],
    availableDate: ( new Date( 2023, 1, 1 ): Date ),
    action: "seek_2023_challenges.february_2023_action_climate_change"
  },
  march2023: {
    name: "seek_2023_challenges.march_2023_challenge_name_lakes_ponds",
    description: "challenges.september_description",
    totalSpecies: 10,
    backgroundName: "img-challengedetail-september",
    earnedIconName: "badge_inaturalist_march2023",
    missions: ["challenges.mission_1_september"],
    availableDate: ( new Date( 2023, 2, 1 ): Date ),
    action: "challenges.action_september"
  },
  april2023: {
    name: "seek_2023_challenges.april_2023_challenge_name_nature",
    description: "seek_2023_challenges.april_2023_description_nature",
    totalSpecies: 10,
    backgroundName: "img-challengedetail-april",
    earnedIconName: "badge_inaturalist_april2023",
    missions: ["challenges.mission_1_april"],
    availableDate: ( new Date( 2023, 3, 1 ): Date ),
    action: "seek_2023_challenges.april_2023_action_nature"
  },
  may2023: {
    name: "seek_2023_challenges.may_2023_challenge_name_protected_areas",
    description: "seek_2023_challenges.may_2023_description_protected_areas",
    totalSpecies: 20,
    backgroundName: "img-challengedetail-may",
    earnedIconName: "badge_inaturalist_may2023",
    missions: [
      "challenges.mission_1_may",
      "challenges.mission_2_may",
      "challenges.mission_3_may",
      "challenges.mission_4_may",
      "challenges.mission_5_may"
    ],
    availableDate: ( new Date( 2023, 4, 1 ): Date ),
    action: "challenges.action_may"
  },
  june2023: {
    name: "seek_2023_challenges.june_2023_challenge_name_plant_eaters",
    description: "seek_challenges.sept_2020_description",
    totalSpecies: 13,
    backgroundName: "img-challengedetail-september2020",
    earnedIconName: "badge_inaturalist_june2023",
    missions: [
      "seek_challenges.mission_1_sept_2020",
      "seek_challenges.mission_2_sept_2020",
      "seek_challenges.mission_3_sept_2020"
    ],
    availableDate: ( new Date( 2023, 5, 1 ): Date ),
    action: "seek_challenges.action_sept_2020"
  },
  july2023: {
    name: "seek_2023_challenges.july_2023_challenge_name_food_web",
    description: "seek_2023_challenges.july_2023_description_plant_eaters",
    totalSpecies: 13,
    backgroundName: "img-challengedetail-june",
    earnedIconName: "badge_inaturalist_july2023",
    missions: [
      "challenges.mission_1_june",
      "challenges.mission_2_june",
      "challenges.mission_3_june",
      "challenges.mission_4_june"
    ],
    availableDate: ( new Date( 2023, 6, 1 ): Date ),
    action: "seek_2023_challenges.july_2023_action_plant_eaters"
  },
  august2023: {
    name: "seek_2023_challenges.august_2023_challenge_name_insect",
    description: "seek_2023_challenges.august_2023_description_insect",
    totalSpecies: 10,
    backgroundName: "img-challengedetail-august",
    earnedIconName: "badge_inaturalist_august2023",
    missions: ["challenges.mission_1_august"],
    availableDate: ( new Date( 2023, 7, 1 ): Date ),
    action: "seek_2023_challenges.august_2023_action_insect"
  },
  september2023: {
    name: "seek_2023_challenges.september_2023_challenge_name_equinox",
    description: "seek_2021_challenges.september_2021_description",
    totalSpecies: 10,
    backgroundName: "img-challengedetail-september2021",
    earnedIconName: "badge_inaturalist_september2023",
    missions: ["seek_2021_challenges.september_2021_mission_1"],
    availableDate: ( new Date( 2023, 8, 1 ): Date ),
    action: "seek_2021_challenges.september_2021_action"
  },
  october2023: {
    name: "seek_2023_challenges.october_2023_challenge_name_migration",
    description: "seek_2023_challenges.october_2023_description_migration",
    totalSpecies: 5,
    backgroundName: "img-challengedetail-october",
    earnedIconName: "badge_inaturalist_october2023",
    missions: ["challenges.mission_1_october"],
    availableDate: ( new Date( 2023, 9, 1 ): Date ),
    action: "seek_2023_challenges.october_2023_action_migration"
  },
  november2023: {
    name: "seek_2023_challenges.november_2023_challenge_name_trees",
    description: "seek_2023_challenges.november_2023_description_trees",
    totalSpecies: 10,
    backgroundName: "img-challengedetail-november",
    earnedIconName: "badge_inaturalist_november2023",
    missions: ["challenges.mission_1_november"],
    availableDate: ( new Date( 2023, 10, 1 ): Date ),
    action: "seek_2023_challenges.november_2023_action_trees"
  },
  december2023: {
    name: "seek_2023_challenges.december_2023_challenge_name_ecology",
    description: "seek_2023_challenges.december_2023_description_ecology",
    totalSpecies: 10,
    backgroundName: "img-challengedetail-december2020",
    earnedIconName: "badge_inaturalist_december2023",
    missions: [
      "seek_challenges.mission_1_dec_2020",
      "seek_challenges.mission_2_dec_2020",
      "seek_challenges.mission_3_dec_2020",
      "seek_challenges.mission_4_dec_2020"
    ],
    availableDate: ( new Date( 2023, 11, 1 ): Date ),
    action: "seek_challenges.action_dec_2020"
  }
};

export default challenges;
