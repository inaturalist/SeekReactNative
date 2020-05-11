import BadgeRealm from "./BadgeRealm";
import ChallengeRealm from "./ChallengeRealm";
import CommonNamesRealm from "./CommonNamesRealm";
import NotificationRealm from "./NotificationRealm";
import ObservationRealm from "./ObservationRealm";
import PhotoRealm from "./PhotoRealm";
import TaxonRealm from "./TaxonRealm";
import ReviewRealm from "./ReviewRealm";

export default {
  schema: [
    BadgeRealm,
    ChallengeRealm,
    CommonNamesRealm,
    NotificationRealm,
    ObservationRealm,
    PhotoRealm,
    ReviewRealm,
    TaxonRealm
  ],
  schemaVersion: 15,
  path: "db.realm"
};
