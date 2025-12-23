import Realm, { ObjectSchema } from "realm";

class ObservationRealm extends Realm.Object {
  static schema: ObjectSchema = {
    name: "ObservationRealm",
    primaryKey: "uuidString",
    properties: {
      uuidString: "string?",
      date: "date?",
      taxon: "TaxonRealm?",
      latitude: { type: "float", optional: true, default: 0.0 },
      longitude: { type: "float", optional: true, default: 0.0 },
    },
  };
}

export default ObservationRealm;
