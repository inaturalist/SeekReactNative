class ObservationRealm {}
ObservationRealm.schema = {
  name: "ObservationRealm",
  primaryKey: "uuidString",
  properties: {
    uuidString: { type: "string?" },
    date: "date?",
    taxon: { type: "TaxonRealm?" },
    latitude: { type: "float", default: 0.0 },
    longitude: { type: "float", default: 0.0 },
    placeName: "string?"
  }
};

export default ObservationRealm;
