import type { ObjectSchema } from "realm";
import Realm from "realm";

class ChallengeRealm extends Realm.Object {
  static schema: ObjectSchema = {
    name: "ChallengeRealm",
    primaryKey: "name",
    properties: {
      name: { type: "string", default: "" },
      description: { type: "string", default: "" },
      totalSpecies: { type: "int", default: 0 },
      backgroundName: "string?",
      earnedIconName: "string?",
      missions: "string[]",
      numbersObserved: "int[]",
      percentComplete: { type: "int", default: 0 },
      availableDate: "date?",
      startedDate: "date?",
      completedDate: "date?",
      photographer: "string?",
      action: { type: "string" },
      logo: { type: "string" },
      sponsorName: { type: "string" },
      // this is the dark version of the logo
      secondLogo: { type: "string" },
      badgeName: { type: "string" },
      index: { type: "int", default: 0 },
    },
  };
}

export default ChallengeRealm;
