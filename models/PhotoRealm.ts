import Realm, { ObjectSchema } from "realm";

class PhotoRealm extends Realm.Object {
  static schema: ObjectSchema = {
    name: "PhotoRealm",
    properties: {
      mediumUrl: "string?",
      backupUri: "string?",
      lastUpdated: "date?"
    }
  };
}

export default PhotoRealm;
