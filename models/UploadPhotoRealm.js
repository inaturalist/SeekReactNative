class UploadPhotoRealm {}
UploadPhotoRealm.schema = {
  name: "UploadPhotoRealm",
  properties: {
    id: "int?", // this is the observation id
    uri: "string", // the image saved to the user's camera roll
    uploadSucceeded: { type: "bool", default: false },
    uuid: "string?",
    notificationShown: { type: "bool", default: false },
    // this addresses edge case where the user can never complete upload
    // like if they deleted the photo from their camera roll
    // after posting to iNat
    uploadFailed: { type: "bool", default: false }
  }
};

export default UploadPhotoRealm;
