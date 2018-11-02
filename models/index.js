import Realm from "realm";
import ObservationRealm from "./ObservationRealm";
import BadgeRealm from "./BadgeRealm";
import TaxonRealm from "./TaxonRealm";
import PhotoRealm from "./PhotoRealm";

export default new Realm( {
  schema: [
    ObservationRealm,
    BadgeRealm,
    TaxonRealm,
    PhotoRealm
  ]
} );
