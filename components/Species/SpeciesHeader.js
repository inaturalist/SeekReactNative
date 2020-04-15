import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import i18n from "../../i18n";
import iconicTaxaNames from "../../utility/dictionaries/iconicTaxonDict";
import SpeciesPhotos from "./SpeciesPhotos";
import styles from "../../styles/species/species";
import icons from "../../assets/icons";
import { setRoute } from "../../utility/helpers";

type Props = {
  photos: Array<Object>,
  commonName: ?string,
  scientificName: ?string,
  userPhoto: ?string,
  routeName: ?string,
  iconicTaxonId: ?number
}

const SpeciesHeader = ( {
  routeName,
  photos,
  userPhoto,
  iconicTaxonId,
  commonName,
  scientificName
}: Props ) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <>
      <TouchableOpacity
        accessibilityLabel={i18n.t( "accessibility.back" )}
        accessible
        onPress={() => {
          if ( routeName === "Match" ) {
            navigation.navigate( routeName, { ...route.params } );
          } else if ( routeName === "Species" ) {
            setRoute( "Home" );
            navigation.navigate( "Home" );
          } else if ( routeName ) {
            navigation.navigate( routeName );
          } else {
            navigation.navigate( "Home" );
          }
        }}
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
