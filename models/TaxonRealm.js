class TaxonRealm {}
TaxonRealm.schema = {
  name: "TaxonRealm",
  primaryKey: "id",
  properties: {
    name: { type: "string", default: "" },
    id: { type: "int", default: 0 },
    preferredCommonName: "string?",
    defaultPhoto: { type: "PhotoRealm?" }, // this should be a PhotoRealm object, but that type is causing errors
    iconicTaxonId: { type: "int", default: 0 },
    ancestorIds: { type: "int[]" }
  }
};

export default TaxonRealm;
