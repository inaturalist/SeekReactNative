import Share from "react-native-share";

const openShareDialog = ( url ) => {
  const shareOptions = {
    title: "Seek by iNaturalist",
    subject: "Seek by iNaturalist",
    message: "Check out my latest Seek observation",
    url: "https://www.inaturalist.org/observations/33042354"
  };

  Share.open( shareOptions )
    .then( res => console.log( res ) )
    .catch( err => err && console.log( err ) );
};

export {
  openShareDialog
};
