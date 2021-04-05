import * as React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "../../../styles/uiComponents/speciesNearby/speciesObservedCell";
import i18n from "../../../i18n";
import icons from "../../../assets/icons";
import { capitalizeNames, setSpeciesId, setRoute } from "../../../utility/helpers";
import iconicTaxa from "../../../assets/iconicTaxa";
import { useCommonName, useSeenTaxa, useUserPhoto } from "../../../utility/customHooks";

type Props = {
  +item: Object
}

const SpeciesObservedCell = ( { item }: Props ) => {
  const { navigate } = useNavigation();
  const { taxon } = item;
  const commonName = useCommonName( taxon.id );

  const seenTaxa = useSeenTaxa( taxon.id );
  const currentUserPhoto = useUserPhoto( seenTaxa );

  const navToSpeciesDetails = () => {
    setRoute( "ChallengeDetails" );
    setSpeciesId( taxon.id );
    navigate( "Species" );
  };

  return (
    <TouchableOpacity
      style={styles.gridCell}
      onPress={navToSpeciesDetails}
    >
      {currentUserPhoto && (
        <>
          <ImageBackground
            source={iconicTaxa[taxon.iconicTaxonId]}
            style={styles.cellImage}
            imageStyle={styles.cellImage}
          >
            <Image source={{ uri: currentUserPhoto.uri }} style={styles.cellImage} />
            <Image source={icons.speciesObserved} style={styles.checkbox} />
          </ImageBackground>
          <View style={styles.cellTitle}>
            <Text numberOfLines={3} style={[styles.cellTitleText, !commonName && styles.scientificName]}>
            {commonName
              ? i18n.locale === "de" ? capitalizeNames( commonName ).replace( /(- |-)/g, "-\n" ) : capitalizeNames( commonName )
              : taxon.name}
            </Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

export default SpeciesObservedCell;
