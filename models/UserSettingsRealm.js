class UserSettingsRealm {}
UserSettingsRealm.schema = {
  name: "UserSettingsRealm",
  properties: {
    localSeasonality: { type: "bool", default: false },
    preferredLanguage: "string?",
    scientificNames: { type: "bool", default: false },
    autoCapture: { type: "bool", default: false }
  }
};

export default UserSettingsRealm;
