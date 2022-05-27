class UserSettingsRealm {}
UserSettingsRealm.schema = {
  name: "UserSettingsRealm",
  properties: {
    autoCapture: { type: "bool", default: false },
    localSeasonality: { type: "bool", default: false },
    scientificNames: { type: "bool", default: false },
    appVersion: { type: "string", default: "2.0.0" }
  }
};

export default UserSettingsRealm;
