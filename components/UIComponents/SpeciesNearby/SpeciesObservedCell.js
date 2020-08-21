import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";

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
  const isFocused = useIsFocused();
  const commonName = useCommonName( item.taxon.id, isFocused );

  const seenTaxa = useSeenTaxa( item.taxon.id, isFocused );
  const currentUserPhoto = useUserPhoto( seenTaxa, isFocused );

  const displayName = commonName || item.taxon.name;

  const { taxon } = item;

  return (
    <TouchableOpacity
      style={styles.gridCell}
      onPress={() => {
        setRoute( "ChallengeDetails" );
        setSpeciesId( item.taxon.id );
        navigate( "Species" );
      }}
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
            <Text numberOfLines={3} style={styles.cellTitleText}>
              {i18n.locale === "de"
                ? capitalizeNames( displayName ).replace( /(- |-)/g, "-\n" )
                : capitalizeNames( displayName )}
            </Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

export default SpeciesObservedCell;
