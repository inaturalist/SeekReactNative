import ObservationRealm from "./ObservationRealm";
import BadgeRealm from "./BadgeRealm";
import TaxonRealm from "./TaxonRealm";
import PhotoRealm from "./PhotoRealm";
import ChallengeRealm from "./ChallengeRealm";

export default {
  schema: [
    BadgeRealm,
    ObservationRealm,
    TaxonRealm,
    PhotoRealm,
    ChallengeRealm
  ],
  path: "db.realm"
};
