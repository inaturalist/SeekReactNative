// @flow

import * as StoreReview from "react-native-store-review";
import Realm from "realm";
import { Platform, Alert, Linking } from "react-native";

import i18n from "../i18n";
import { isWithinPastYear } from "./dateHelpers";
import { fetchAccessToken } from "./loginHelpers";
import realmConfig from "../models/index";

const createPlayStoreRatingAlert = () => {
  const url = "https://play.google.com/store/apps/details?id=org.inaturalist.seek";

  Alert.alert(
    i18n.t( "review.title" ),
    i18n.t( "review.rate" ),
    [{
      text: i18n.t( "review.later" ),
      style: "default"
    },
    {
      text: i18n.t( "review.rate_now" ),
      onPress: () => {
        Linking.canOpenURL( url )
          .then( ( supported ) => {
            if ( !supported ) {
              return null;
            }
            return Linking.openURL( url );
          } ).catch( ( err ) => console.error( "An error occurred", err ) );
      }
    }]
  );
};

const updateReviews = ( realm, reviews ) => {
  realm.write( () => {
    if ( reviews.length === 0 ) {
      realm.create( "ReviewRealm", {
        date: new Date(),
        timesSeen: 1
      } );
    } else {
      reviews[0].timesSeen += 1;
    }
  } );
  if ( Platform.OS === "android" ) {
    createPlayStoreRatingAlert();
  } else {
    StoreReview.requestReview();
  }
};

const deleteReviews = ( realm, reviews ) => {
  realm.write( () => {
    realm.delete( reviews );
  } );
};

const showAppStoreReview = () => {
  Realm.open( realmConfig )
    .then( ( realm ) => {
      const reviews = realm.objects( "ReviewRealm" );

      if ( reviews.length > 0 ) {
        const withinYear = isWithinPastYear( reviews[0].date );
        if ( withinYear && StoreReview.isAvailable ) {
          if ( reviews[0].timesSeen < 3 ) {
            updateReviews( realm, reviews );
          }
        } else if ( StoreReview.isAvailable ) {
          deleteReviews( realm, reviews );
          updateReviews( realm, reviews );
        }
      } else if ( StoreReview.isAvailable ) {
        updateReviews( realm, reviews );
      }
    } ).catch( () => {
      console.log( "couldn't show review modal" );
    } );
};

const showPlayStoreReview = async () => {
  const login = await fetchAccessToken();

  if ( login ) {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const reviews = realm.objects( "ReviewRealm" );

        if ( reviews.length > 0 ) {
          const withinYear = isWithinPastYear( reviews[0].date );
          if ( withinYear ) {
            if ( reviews[0].timesSeen < 3 ) {
              updateReviews( realm, reviews );
            }
          } else {
            deleteReviews( realm, reviews );
            updateReviews( realm, reviews );
          }
        } else {
          updateReviews( realm, reviews );
        }
      } ).catch( ( e ) => {
        console.log( "couldn't show review modal", e );
      } );
  }
};

export {
  showAppStoreReview,
  showPlayStoreReview
};
