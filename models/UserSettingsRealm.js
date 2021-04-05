class UserSettingsRealm {}
UserSettingsRealm.schema = {
  name: "UserSettingsRealm",
  properties: {
    autoCapture: { type: "bool", default: false },
    localSeasonality: { type: "bool", default: false },
    scientificNames: { type: "bool", default: false }
  }
};

export default UserSettingsRealm;
