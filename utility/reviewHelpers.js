// @flow

import * as StoreReview from "react-native-store-review";
import Realm from "realm";

import { isWithinPastYear } from "./dateHelpers";
import realmConfig from "../models/index";

const updateReviews = ( realm, reviews ) => {
  realm.write( ( ) => {
    if ( reviews.length === 0 ) {
      realm.create( "ReviewRealm", {
        date: new Date(),
        timesSeen: 1
      } );
    } else {
      reviews[0].timesSeen += 1;
    }
  } );
  StoreReview.requestReview( );
};

const deleteReviews = ( realm, reviews ) => {
  realm.write( () => {
    realm.delete( reviews );
  } );
};

const showStoreReview = ( ) => {
  Realm.open( realmConfig ).then( ( realm ) => {
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
  } ).catch( ( ) => {
    console.log( "couldn't show review modal" );
  } );
};

export {
  showStoreReview
};
