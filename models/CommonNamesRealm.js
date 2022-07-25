import Realm from "realm";

class CommonNamesRealm extends Realm.Object {}
CommonNamesRealm.schema = {
  name: "CommonNamesRealm",
  properties: {
    taxon_id: "int",
    locale: "string",
    name: "string"
  }
};

export default CommonNamesRealm;
