class CommonNamesRealm {}
CommonNamesRealm.schema = {
  name: "CommonNamesRealm",
  primaryKey: "taxonId",
  properties: {
    taxonId: { type: "int", default: 0 },
    locale: { type: "string", default: "" },
    name: { type: "string?", default: "" }
  }
};

export default CommonNamesRealm;
