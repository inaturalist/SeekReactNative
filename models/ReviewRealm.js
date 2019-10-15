class ReviewRealm {}
ReviewRealm.schema = {
  name: "ReviewRealm",
  properties: {
    date: "date",
    timesSeen: { type: "int", default: 0 }
  }
};

export default ReviewRealm;
