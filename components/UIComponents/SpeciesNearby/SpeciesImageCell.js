import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import styles from "../../../styles/uiComponents/speciesNearby/speciesImageCell";
import i18n from "../../../i18n";
import { capitalizeNames, setSpeciesId, setRoute } from "../../../utility/helpers";
import iconicTaxa from "../../../assets/iconicTaxa";

type Props = {
  +item: Object,
  +fetchiNatData: ?Function
}

const SpeciesImageCell = ( { item, fetchiNatData }: Props ) => {
  const { navigate } = useNavigation();
  const route = useRoute();
  const { name } = route;

  const renderSpeciesImage = () => {
    const photo = item.default_photo;
    const extraPhotos = item.taxonPhotos || item.taxon_photos;
    let uri;

    if ( photo.medium_url && photo.license_code ) {
      uri = photo.medium_url;
    } else if ( extraPhotos ) {
      const licensed = extraPhotos.find( p => p.photo.license_code );
      if ( licensed ) {
        uri = licensed.photo.medium_url;
      }
    }

    return (
      <Image source={{ uri }} style={styles.cellImage} />
    );
  };

  return (
    <TouchableOpacity
      onPress={() => {
        setSpeciesId( item.id );
        if ( name === "Match" ) {
          setRoute( "Match" );
          // full nav path for QuickActions
          navigate( "MainTab", { screen: "Species", params: { ...route.params } } );
        } else if ( name === "Species" ) {
          fetchiNatData();
        } else {
          setRoute( "Home" );
          navigate( "Species", { ...route.params } );
        }
      }}
      style={styles.gridCell}
    >
      <ImageBackground
        source={iconicTaxa[item.iconic_taxon_id]}
        style={styles.cellImage}
        imageStyle={styles.cellImage}
      >
        {item.default_photo && renderSpeciesImage()}
      </ImageBackground>
      <View style={styles.cellTitle}>
        <Text numberOfLines={3} style={styles.cellTitleText}>
          {i18n.locale === "de"
            ? capitalizeNames( item.preferred_common_name || item.name ).replace( /(- |-)/g, "-\n" )
            : capitalizeNames( item.preferred_common_name || item.name )}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SpeciesImageCell;
