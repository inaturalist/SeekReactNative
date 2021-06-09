class PhotoRealm {}
PhotoRealm.schema = {
  name: "PhotoRealm",
  properties: {
    mediumUrl: "string?",
    backupUri: "string?",
    lastUpdated: "date?"
  }
};

export default PhotoRealm;
