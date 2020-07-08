class PhotoRealm {}
PhotoRealm.schema = {
  name: "PhotoRealm",
  properties: {
    squareUrl: "string?",
    mediumUrl: "string?",
    backupUri: "string?",
    lastUpdated: "date?"
  }
};

export default PhotoRealm;
