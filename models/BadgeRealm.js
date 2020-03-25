class BadgeRealm {}
BadgeRealm.schema = {
  name: "BadgeRealm",
  primaryKey: "name",
  properties: {
    name: { type: "string", default: "" },
    intlName: { type: "string", default: "" },
    earned: { type: "bool", default: false },
    earnedDate: "date?",
    iconicTaxonName: "string?",
    iconicTaxonId: { type: "int", default: 0 },
    count: { type: "int", default: 0 },
    earnedIconName: "string?",
    infoText: "string?",
    index: { type: "int", default: 0 }
  }
};

export default BadgeRealm;
