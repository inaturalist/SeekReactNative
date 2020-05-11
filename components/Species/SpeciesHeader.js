import React, { useCallback } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  BackHandler
} from "react-native";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";

import i18n from "../../i18n";
import iconicTaxaNames from "../../utility/dictionaries/iconicTaxonDict";
import SpeciesPhotos from "./SpeciesPhotos";
import styles from "../../styles/species/species";
import icons from "../../assets/icons";

type Props = {
  photos: Array<Object>,
  taxon: Object,
  userPhoto: ?string,
  routeName: ?string
}

const SpeciesHeader = ( {
  routeName,
  photos,
  userPhoto,
  taxon
}: Props ) => {
  const { navigate } = useNavigation();
  const { params } = useRoute();

  const { commonName, scientificName, iconicTaxonId } = taxon;

  const backAction = useCallback( () => {
    if ( routeName ) {
      navigate( routeName, { ...params } );
    } else {
      navigate( "Home" );
    }
  }, [navigate, routeName, params] );

  useFocusEffect(
    useCallback( () => {
      const onBackPress = () => {
        backAction();
        return true; // following custom Android back behavior template in React Navigation
      };

      BackHandler.addEventListener( "hardwareBackPress", onBackPress );

      return () => BackHandler.removeEventListener( "hardwareBackPress", onBackPress );
    }, [backAction] )
  );

  return (
    <>
      <TouchableOpacity
        accessibilityLabel={i18n.t( "accessibility.back" )}
        accessible
        onPress={() => backAction()}
        style={styles.backButton}
      >
        <Image source={icons.backButton} />
      </TouchableOpacity>
      <SpeciesPhotos
        photos={photos}
        userPhoto={userPhoto}
      />
      <View style={styles.greenBanner}>
        {iconicTaxonId && (
          <Text style={styles.iconicTaxaText}>
            {i18n.t( iconicTaxaNames[iconicTaxonId] ).toLocaleUpperCase()}
          </Text>
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.commonNameText}>{commonName || scientificName}</Text>
        <Text style={styles.scientificNameText}>{scientificName}</Text>
      </View>
    </>
  );
};

export default SpeciesHeader;
