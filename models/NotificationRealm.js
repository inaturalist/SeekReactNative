class NotificationRealm {}
NotificationRealm.schema = {
  name: "NotificationRealm",
  primaryKey: "name",
  properties: {
    name: { type: "string", default: "" },
    title: { type: "string", default: "" },
    message: { type: "string", default: "" },
    iconName: "string?",
    receivedDate: "date?",
    index: { type: "int", default: 0 } // need a way to either save auto incrementing index or date for ordering notifications
  }
};

export default NotificationRealm;
