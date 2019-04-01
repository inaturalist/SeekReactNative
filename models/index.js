import BadgeRealm from "./BadgeRealm";
import ChallengeRealm from "./ChallengeRealm";
import CommonNamesRealm from "./CommonNamesRealm";
import NotificationRealm from "./NotificationRealm";
import ObservationRealm from "./ObservationRealm";
import PhotoRealm from "./PhotoRealm";
import TaxonRealm from "./TaxonRealm";
import badgesDict from "../utility/badgesDict";

export default {
  schema: [
    BadgeRealm,
    ChallengeRealm,
    CommonNamesRealm,
    NotificationRealm,
    ObservationRealm,
    PhotoRealm,
    TaxonRealm
  ],
  schemaVersion: 5,
  // migration: ( oldRealm, newRealm ) => {
  //   if ( oldRealm.schemaVersion < 5 ) {
  //     const oldBadges = oldRealm.objects( "BadgeRealm" );
  //     const newBadges = newRealm.objects( "BadgeRealm" );

  //     for ( let i = 0; i < oldBadges.length; i += 1 ) {
  //       newBadges[i].name = badgesDict
  //     }
  //   }
  // },
  path: "db.realm"
};
