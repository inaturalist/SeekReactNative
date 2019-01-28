import ObservationRealm from "./ObservationRealm";
import BadgeRealm from "./BadgeRealm";
import TaxonRealm from "./TaxonRealm";
import PhotoRealm from "./PhotoRealm";
import ChallengeRealm from "./ChallengeRealm";
import NotificationRealm from "./NotificationRealm";

export default {
  schema: [
    BadgeRealm,
    ObservationRealm,
    TaxonRealm,
    PhotoRealm,
    ChallengeRealm,
    NotificationRealm
  ],
  path: "db.realm"
};
