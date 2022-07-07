import Realm from "realm";

class LoginRealm extends Realm.Object {}
LoginRealm.schema = {
  name: "LoginRealm",
  properties: {
    loginToken: { type: "string?" },
    username: { type: "string?" },
    profilePhoto: { type: "string?" },
    isAdmin: { type: "bool", default: false },
    observationCount: { type: "int", default: 0 }
  }
};

export default LoginRealm;
