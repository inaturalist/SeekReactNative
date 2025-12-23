import Realm, { ObjectSchema } from "realm";

class TaxonRealm extends Realm.Object {
  static schema: ObjectSchema = {
    name: "TaxonRealm",
    primaryKey: "id",
    properties: {
      name: { type: "string", default: "" },
      id: { type: "int", default: 0 },
      preferredCommonName: "string?", // remove this
      defaultPhoto: "PhotoRealm?", // this should be a PhotoRealm object, but that type is causing errors
      iconicTaxonId: { type: "int", default: 0 },
      ancestorIds: "int[]",
    },
  };
}

export default TaxonRealm;
