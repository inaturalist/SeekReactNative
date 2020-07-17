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
import { capitalizeNames, setSpeciesId } from "../../../utility/helpers";
import iconicTaxa from "../../../assets/iconicTaxa";
import { useCommonName, useSeenTaxa, useUserPhoto } from "../../../utility/customHooks";

type Props = {
  +item: Object
}

const SpeciesObservedCell = ( { item }: Props ) => {
  const { navigate } = useNavigation();
  const isFocused = useIsFocused();
  const commonName = useCommonName( item.taxon.id );
  const seenTaxa = useSeenTaxa( item.taxon.id, isFocused );
  const currentUserPhoto = useUserPhoto( seenTaxa, isFocused );

  const { taxon } = item;

  return (
    <TouchableOpacity
      style={styles.gridCell}
      onPress={() => {
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
          </ImageBackground>
          <View style={styles.cellTitle}>
            <Text numberOfLines={3} style={styles.cellTitleText}>
              {i18n.locale === "de"
                ? capitalizeNames( commonName ).replace( /(- |-)/g, "-\n" )
                : capitalizeNames( commonName )}
            </Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

export default SpeciesObservedCell;
