import ObservationRealm from "./ObservationRealm";
import BadgeRealm from "./BadgeRealm";
import TaxonRealm from "./TaxonRealm";
import PhotoRealm from "./PhotoRealm";

export default {
  schema: [
    BadgeRealm,
    ObservationRealm,
    TaxonRealm,
    PhotoRealm
  ],
  path: "db.realm",
  deleteRealmIfMigrationNeeded: true
};
