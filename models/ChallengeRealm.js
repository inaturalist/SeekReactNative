class ChallengeRealm {}
ChallengeRealm.schema = {
  name: "ChallengeRealm",
  primaryKey: "name",
  properties: {
    name: { type: "string", default: "" },
    month: { type: "string", default: "" },
    description: { type: "string", default: "" },
    totalSpecies: { type: "int", default: 0 },
    unearnedIconName: "string?",
    earnedIconName: "string?",
    missions: { type: "string[]" },
    numbersObserved: { type: "int[]" },
    percentComplete: { type: "int", default: 0 },
    started: { type: "bool", default: false },
    completed: { type: "bool", default: false },
    index: { type: "int", default: 0 }
  }
};

export default ChallengeRealm;
