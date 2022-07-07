import Realm from "realm";

class PhotoRealm extends Realm.Object {}
PhotoRealm.schema = {
  name: "PhotoRealm",
  properties: {
    mediumUrl: "string?",
    backupUri: "string?",
    lastUpdated: "date?"
  }
};

export default PhotoRealm;
