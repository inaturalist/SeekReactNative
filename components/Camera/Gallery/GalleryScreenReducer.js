// // @flow

// import React, { useReducer, useEffect, useCallback } from "react";
// import {
//   Platform,
//   View,
//   StatusBar,
//   SafeAreaView
// } from "react-native";
// import CameraRoll from "@react-native-community/cameraroll";
// import { useNavigation } from "@react-navigation/native";

// import { checkCameraRollPermissions } from "../../../utility/androidHelpers.android";
// import styles from "../../../styles/camera/gallery";
// import GalleryHeader from "./GalleryHeader";
// import GalleryContainer from "./GalleryContainer";

// const GalleryScreen = () => {
//   const navigation = useNavigation();

//   // eslint-disable-next-line no-shadow
//   const [state, dispatch] = useReducer( ( state, action ) => {
//     switch ( action.type ) {
//       case "ALBUM_SELECTED":
//         return {
//           album: action.album,
//           photos: [],
//           error: null,
//           hasNextPage: true,
//           lastCursor: null,
//           stillLoading: true
//         };
//       case "FETCHING_PHOTOS":
//         return { ...state, stillLoading: true };
//       case "LOAD_MORE_PHOTOS":
//         return {
//           ...state,
//           photos: action.photos,
//           stillLoading: false,
//           hasNextPage: action.pageInfo.has_next_page,
//           lastCursor: action.pageInfo.end_cursor
//         };
//       case "ERROR":
//         console.log( action.type, "action type", action.error );
//         return { ...state, error: action.error };
//       default:
//         throw new Error();
//     }
//   }, {
//     album: null,
//     photos: [],
//     error: null,
//     hasNextPage: true,
//     lastCursor: null,
//     stillLoading: false
//   } );

//   const {
//     album,
//     photos,
//     error,
//     hasNextPage,
//     lastCursor,
//     stillLoading
//   } = state;

//   const appendPhotos = useCallback( ( data, pageInfo ) => {
//     console.log( data.length, photos.length );
//     if ( photos.length === 0 && data.length === 0 && !pageInfo.has_next_page ) {
//       dispatch( { type: "ERROR", error: "photos" } );
//     } else {
//       const updatedPhotos = photos.concat( data );
//       dispatch( { type: "LOAD_MORE_PHOTOS", photos: updatedPhotos, pageInfo } );
//     }
//   }, [photos] );

//   const fetchPhotos = useCallback( ( photoOptions ) => {
//     if ( hasNextPage && !stillLoading ) {
//       dispatch( { type: "FETCHING_PHOTOS", stillLoading: true } );
//       console.log( "fetching photos" );
//     }
//     CameraRoll.getPhotos( photoOptions ).then( ( results ) => {
//       appendPhotos( results.edges, results.page_info );
//     } ).catch( () => dispatch( { type: "ERROR", error: "photos" } ) );
//   }, [appendPhotos, hasNextPage, stillLoading] );

//   const setPhotoParams = useCallback( () => {
//     console.log( "setting photo params" );
//     const photoOptions = {
//       first: 28, // only 28 at a time can display
//       assetType: "Photos",
//       groupTypes: ( album === null ) ? "All" : "Album"
//       // this is required in RN 0.59+,
//     };

//     if ( album ) { // append for cases where album isn't null
//       // $FlowFixMe
//       photoOptions.groupName = album;
//     }

//     if ( lastCursor ) {
//       // $FlowFixMe
//       photoOptions.after = lastCursor;
//     }

//     fetchPhotos( photoOptions );
//   }, [album, lastCursor, fetchPhotos] );

//   const updateAlbum = ( newAlbum ) => {
//     dispatch( { type: "ALBUM_SELECTED", album: newAlbum !== "All" ? newAlbum : null } );
//   };

//   useEffect( () => {
//     const unsub = navigation.addListener( "focus", () => {
//       if ( Platform.OS === "android" ) {
//         const requestAndroidPermissions = async () => {
//           const permission = await checkCameraRollPermissions();
//           if ( permission === true ) {
//             setPhotoParams();
//           } else {
//             dispatch( { type: "ERROR", error: "gallery" } );
//           }
//         };
//         requestAndroidPermissions();
//       } else {
//         setPhotoParams();
//       }
//     } );

//     return () => unsub;
//   }, [navigation, setPhotoParams] );

//   console.log( error, "error", photos.length, "photo length", album );
//   // console.log( album,
//   //   photos.length,
//   //   error,
//   //   hasNextPage, "next page",
//   //   lastCursor, "last cursor",
//   //   stillLoading, "state in reducer" );

//   return (
//     <View style={styles.background}>
//       <SafeAreaView style={styles.safeViewTop} />
//       <StatusBar barStyle="dark-content" />
//       <GalleryHeader updateAlbum={updateAlbum} />
//       <GalleryContainer
//         setPhotoParams={setPhotoParams}
//         error={error}
//         photos={photos}
//       />
//     </View>
//   );
// };

// export default GalleryScreen;
