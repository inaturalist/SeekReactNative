import Realm, { ObjectSchema } from "realm";

class CommonNamesRealm extends Realm.Object {
  static schema: ObjectSchema = {
    name: "CommonNamesRealm",
    properties: {
      taxon_id: "int",
      locale: "string",
      name: "string"
    }
  };
}

export default CommonNamesRealm;
