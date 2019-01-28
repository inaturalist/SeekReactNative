class NotificationRealm {}
NotificationRealm.schema = {
  name: "NotificationRealm",
  primaryKey: "index",
  properties: {
    title: { type: "string", default: "" },
    message: { type: "string", default: "" },
    iconName: "string?",
    index: { type: "int", default: 0 }
  }
};

export default NotificationRealm;
