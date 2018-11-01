class BadgeRealm {}
BadgeRealm.schema = {
  name: "BadgeRealm",
  properties: {
    name: "string",
    earned: "bool",
    earnedDate: "date?",
    iconicTaxonName: "string?",
    iconicTaxonId: { type: "int", default: 0 },
    count: { type: "int", default: 0 },
    earnedIconName: "string?",
    unearnedIconName: "string?",
    infoText: "string?",
    index: { type: "int", default: 0 }
  }
};

export default BadgeRealm;
