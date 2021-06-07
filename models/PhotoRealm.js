class PhotoRealm {}
PhotoRealm.schema = {
  name: "PhotoRealm",
  properties: {
    // squareUrl is not being used and can be removed next migration
    squareUrl: "string?",
    mediumUrl: "string?",
    backupUri: "string?",
    lastUpdated: "date?"
  }
};

export default PhotoRealm;
