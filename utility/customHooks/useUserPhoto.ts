import { useState, useEffect, useCallback } from "react";
import RNFS from "react-native-fs";
import { Platform } from "react-native";

import { dirPictures } from "../dirStorage";

const useUserPhoto = ( item: {
  taxon: {
    defaultPhoto?: {
      backupUri?: string,
      mediumUrl?: string,
      lastUpdated?: Date;
    }
  },
  uuidString?: string
 } | null ): { uri: string } => {
   const [photo, setPhoto] = useState<{ uri: string } | null>( null );

   const checkForSeekV2Photos = useCallback( ( isCurrent ) => {
     if ( !item ) {
       return;
     }
     const { taxon } = item;
     const { defaultPhoto } = taxon;
     if ( !defaultPhoto ) {
       return;
     }

     const { backupUri, mediumUrl } = defaultPhoto;
     if ( backupUri ) {
       if ( Platform.OS === "ios" ) {
         const uri = backupUri.split( "Pictures/" );
         const backupFilepath = `${dirPictures}/${uri[1]}`;
         if ( isCurrent ) {
           setPhoto( { uri: backupFilepath } );
         }
       } else {
         RNFS.readFile( backupUri, { encoding: "base64" } ).then( ( encodedData ) => {
           if ( isCurrent ) {
             setPhoto( { uri: `data:image/jpeg;base64,${encodedData}` } );
           }
         } ).catch( ( e ) => console.log( "Error reading backupUri file in hooks:", e ) );
       }
     } else if ( mediumUrl ) {
       if ( isCurrent ) {
         setPhoto( { uri: mediumUrl } );
       }
     }
   }, [item] );

   const checkV1 = useCallback( async ( uuidString: string, isCurrent ) => {
     const seekv1Photos = `${RNFS.DocumentDirectoryPath}/large`;
     const photoPath = `${seekv1Photos}/${uuidString}`;

     try {
       const isv1Photo = await RNFS.exists( photoPath );

       if ( isv1Photo ) {
         RNFS.readFile( photoPath, { encoding: "base64" } ).then( ( encodedData ) => {
           if ( isCurrent ) {
             setPhoto( { uri: `data:image/jpeg;base64,${encodedData}` } );
           }
         } ).catch( () => checkForSeekV2Photos() );
       } else {
         // this is the one being fetched in test device
         checkForSeekV2Photos( isCurrent );
       }
     } catch ( e ) {
       console.log( e, "error checking for v1 photo existence" );
     }
   }, [checkForSeekV2Photos] );

   useEffect( () => {
     let isCurrent = true;
     if ( item !== null ) {
       if ( Platform.OS === "ios" ) {
         checkV1( item.uuidString, isCurrent );
       } else {
         checkForSeekV2Photos( isCurrent );
       }
     } else {
       setPhoto( null );
     }
     return () => {
       isCurrent = false;
     };
   }, [checkForSeekV2Photos, checkV1, item] );

   return photo;
 };

export { useUserPhoto };
