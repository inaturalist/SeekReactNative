class ChallengeRealm {}
ChallengeRealm.schema = {
  name: "ChallengeRealm",
  primaryKey: "name",
  properties: {
    name: { type: "string", default: "" },
    month: { type: "string", default: "" },
    totalSpecies: { type: "int", default: 0 },
    unearnedIconName: "string?",
    earnedIconName: "string?",
    mission1: { type: "string", default: "" },
    mission2: { type: "string", default: "" },
    description: { type: "string", default: "" },
    earned: { type: "bool", default: false },
    percentComplete: { type: "int", default: 0 },
    index: { type: "int", default: 0 }
  }
};

export default ChallengeRealm;
