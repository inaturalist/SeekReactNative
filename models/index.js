import BadgeRealm from "./BadgeRealm";
import ChallengeRealm from "./ChallengeRealm";
import CommonNamesRealm from "./CommonNamesRealm";
import NotificationRealm from "./NotificationRealm";
import ObservationRealm from "./ObservationRealm";
import PhotoRealm from "./PhotoRealm";
import TaxonRealm from "./TaxonRealm";

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
  schemaVersion: 8,
  path: "db.realm"
};
