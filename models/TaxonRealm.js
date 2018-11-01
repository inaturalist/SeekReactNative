class TaxonRealm {}
TaxonRealm.schema = {
  name: "TaxonRealm",
  primaryKey: "id",
  properties: {
    name: { type: "string", default: "" },
    id: { type: "int", default: 0 },
    preferredCommonName: "string",
    defaultPhoto: { type: "PhotoRealm" },
    iconicTaxonId: { type: "int", default: 0 }
  }
};

export default TaxonRealm;
