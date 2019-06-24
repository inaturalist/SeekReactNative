class ChallengeRealm {}
ChallengeRealm.schema = {
  name: "ChallengeRealm",
  primaryKey: "name",
  properties: {
    name: { type: "string", default: "" },
    month: { type: "string", default: "" },
    description: { type: "string", default: "" },
    totalSpecies: { type: "int", default: 0 },
    homeBackgroundName: "string?",
    backgroundName: "string?",
    unearnedIconName: "string?",
    earnedIconName: "string?",
    missions: { type: "string[]" },
    numbersObserved: { type: "int[]" },
    percentComplete: { type: "int", default: 0 },
    availableDate: { type: "date?" },
    startedDate: { type: "date?" },
    completedDate: { type: "date?" },
    started: { type: "bool", default: false },
    photographer: { type: "string" },
    action: { type: "string" },
    index: { type: "int", default: 0 }
  }
};

export default ChallengeRealm;
