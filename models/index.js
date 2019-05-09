import BadgeRealm from "./BadgeRealm";
import ChallengeRealm from "./ChallengeRealm";
import CommonNamesRealm from "./CommonNamesRealm";
import NotificationRealm from "./NotificationRealm";
import ObservationRealm from "./ObservationRealm";
import PhotoRealm from "./PhotoRealm";
import TaxonRealm from "./TaxonRealm";
import LoginRealm from "./LoginRealm";

export default {
  schema: [
    BadgeRealm,
    ChallengeRealm,
    CommonNamesRealm,
    LoginRealm,
    NotificationRealm,
    ObservationRealm,
    PhotoRealm,
    TaxonRealm
  ],
  schemaVersion: 6,
  path: "db.realm"
};
