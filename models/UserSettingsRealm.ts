import Realm from "realm";

class UserSettingsRealm extends Realm.Object<UserSettingsRealm> {
  autoCapture!: boolean;
  localSeasonality!: boolean;
  scientificNames!: boolean;
  appVersion!: string;

  static schema: Realm.ObjectSchema = {
    name: "UserSettingsRealm",
    properties: {
      autoCapture: { type: "bool", default: false },
      localSeasonality: { type: "bool", default: false },
      scientificNames: { type: "bool", default: false },
      appVersion: { type: "string", default: "2.0.0" }
    }
  };
}

export default UserSettingsRealm;
