import Realm, { ObjectSchema } from "realm";

class ReviewRealm extends Realm.Object {
  static schema: ObjectSchema = {
    name: "ReviewRealm",
    properties: {
      date: "date",
      timesSeen: { type: "int", default: 0 },
    },
  };
}

export default ReviewRealm;
