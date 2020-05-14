class NotificationRealm {}
NotificationRealm.schema = {
  name: "NotificationRealm",
  primaryKey: "index",
  properties: {
    title: { type: "string", default: "" },
    message: { type: "string", default: "" },
    iconName: "string?",
    nextScreen: { type: "string", default: "" },
    challengeIndex: { type: "int?", default: 0 },
    index: { type: "int", default: 0 },
    seen: { type: "bool", default: false },
    viewed: { type: "bool", default: false }
  }
};

export default NotificationRealm;
