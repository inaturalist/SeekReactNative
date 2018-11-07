import ObservationRealm from "./ObservationRealm";
import BadgeRealm from "./BadgeRealm";
import TaxonRealm from "./TaxonRealm";
import PhotoRealm from "./PhotoRealm";

export default {
  schema: [
    ObservationRealm,
    BadgeRealm,
    TaxonRealm,
    PhotoRealm
  ],
  path: "db.realm",
  deleteRealmIfMigrationNeeded: true
};
