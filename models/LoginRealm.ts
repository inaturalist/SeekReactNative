import type { ObjectSchema } from "realm";
import Realm from "realm";

class LoginRealm extends Realm.Object {
  static schema: ObjectSchema = {
    name: "LoginRealm",
    properties: {
      loginToken: "string?",
      username: "string?",
      profilePhoto: "string?",
      isAdmin: { type: "bool", default: false },
      observationCount: { type: "int", default: 0 },
    },
  };
}

export default LoginRealm;
