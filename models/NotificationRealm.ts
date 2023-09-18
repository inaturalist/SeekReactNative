import Realm, { ObjectSchema } from "realm";

class NotificationRealm extends Realm.Object {
  static schema: ObjectSchema = {
    name: "NotificationRealm",
    primaryKey: "index",
    properties: {
      title: { type: "string", default: "" },
      message: { type: "string", default: "" },
      iconName: "string?",
      nextScreen: { type: "string", default: "" },
      challengeIndex: { type: "int", optional: true, default: 0 },
      index: { type: "int", default: 0 },
      seen: { type: "bool", default: false },
      // this is true so past notifications don't show as unviewed
      // it will be marked false when new notification is created
      viewed: { type: "bool", default: true }
    }
  };
}

export default NotificationRealm;
