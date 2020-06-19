// @flow

import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image
} from "react-native";

import i18n from "../../../i18n";
import styles from "../../../styles/camera/arCamera";
import icons from "../../../assets/icons";
import rankDict from "../../../utility/dictionaries/rankDict";
import { getTaxonCommonName } from "../../../utility/helpers";
import { CameraContext } from "../../UserContext";

type Props = {
  +ranks: Object
}

const ARCameraHeader = ( { ranks }: Props ) => {
  const rankToRender = Object.keys( ranks )[0] || null;
  const [commonName, setCommonName] = useState( null );
  const { scientificNames } = useContext( CameraContext );
  let id = null;

  if ( rankToRender && !scientificNames ) {
    id = ranks[rankToRender][0].taxon_id;
  } else {
    id = null;
  }

  const rankList = ["kingdom", "phylum", "class", "order", "family", "genus", "species"];

  useEffect( () => {
    if ( id ) { // only update when id changes to avoid camera stutter on Android
      getTaxonCommonName( id ).then( ( name ) => {
        setCommonName( name );
      } );
    }
  }, [id] );

  return (
    <View style={styles.header}>
      {( ranks && rankToRender ) && (
        <>
          <View style={styles.greenButton}>
            <Text style={styles.greenButtonText}>
              {i18n.t( rankDict[rankToRender] ).toLocaleUpperCase()}
            </Text>
          </View>
          <Text style={styles.predictions}>
            {( scientificNames || !commonName )
              ? ranks[rankToRender][0].name
              : commonName}
          </Text>
          <View style={styles.dotRow}>
            {rankList.map( ( rank, index ) => (
              <Image
                key={rank}
                source={rankToRender && rankList.includes( rankToRender, index )
                  ? icons.greenDot
                  : icons.whiteDot}
                style={styles.dots}
              />
            ) )}
          </View>
        </>
      )}
    </View>
  );
};

export default ARCameraHeader;
