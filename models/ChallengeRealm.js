class ChallengeRealm {}
ChallengeRealm.schema = {
  name: "ChallengeRealm",
  primaryKey: "name",
  properties: {
    name: { type: "string", default: "" },
    description: { type: "string", default: "" },
    totalSpecies: { type: "int", default: 0 },
    backgroundName: "string?",
    earnedIconName: "string?",
    missions: { type: "string[]" },
    numbersObserved: { type: "int[]" },
    percentComplete: { type: "int", default: 0 },
    availableDate: { type: "date?" },
    startedDate: { type: "date?" },
    completedDate: { type: "date?" },
    photographer: { type: "string?" },
    action: { type: "string" },
    logo: { type: "string" },
    sponsorName: { type: "string" },
    // this is the dark version of the logo
    secondLogo: { type: "string" },
    badgeName: { type: "string" },
    index: { type: "int", default: 0 }
  }
};

export default ChallengeRealm;
