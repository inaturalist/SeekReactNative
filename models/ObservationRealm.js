class ObservationRealm {}
ObservationRealm.schema = {
  name: "ObservationRealm",
  primaryKey: "uuidString",
  properties: {
    uuidString: { type: "string?" },
    date: { type: "date?" },
    taxon: { type: "TaxonRealm?" },
    latitude: { type: "float?", default: 0.0 },
    longitude: { type: "float?", default: 0.0 }
  }
};

export default ObservationRealm;
