const i18n = require( "../i18n" );

const challenges = {
  april: {
    month: i18n.t( "challenges.april" ),
    name: i18n.t( "challenges.connectivity" ),
    totalSpecies: 22,
    unearnedIconName: "",
    earnedIconName: "",
    index: 0,
    mission1: i18n.t( "challenges.mission_1_april" ),
    mission2: i18n.t( "challenges.mission_2_april" ),
    description: i18n.t( "challenges.april_description" )
  },
  may: {
    month: i18n.t( "challenges.may" ),
    name: i18n.t( "challenges.diversity" ),
    totalSpecies: 17,
    unearnedIconName: "",
    earnedIconName: "",
    index: 1,
    mission1: i18n.t( "challenges.mission_1_may" ),
    mission2: i18n.t( "challenges.mission_2_may" ),
    mission3: i18n.t( "challenges.mission_3_may" ),
    mission4: i18n.t( "challenges.mission_4_may" ),
    mission5: i18n.t( "challenges.mission_5_may" ),
    description: i18n.t( "challenges.may_description" )
  }
};

export default challenges;
