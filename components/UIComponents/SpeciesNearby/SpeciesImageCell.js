import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import styles from "../../../styles/uiComponents/speciesNearby/speciesImageCell";
import icons from "../../../assets/icons";
import i18n from "../../../i18n";
import { capitalizeNames, setSpeciesId, setRoute } from "../../../utility/helpers";
import iconicTaxa from "../../../assets/iconicTaxa";
import { useSeenTaxa, useCommonName } from "../../../utility/customHooks";

type Props = {
  +item: Object
}

const SpeciesImageCell = ( { item }: Props ) => {
  const navigation = useNavigation( );
  const { navigate } = navigation;
  const route = useRoute( );
  const { name } = route;

  const seenTaxa = useSeenTaxa( item.id );
  const commonName = useCommonName( item.id );

  const photo = item.default_photo;

  const renderSpeciesImage = ( ) => {
    const extraPhotos = item.taxonPhotos || item.taxon_photos;
    let source = iconicTaxa[item.iconic_taxon_id];

    if ( photo.medium_url && photo.license_code ) {
      source = { uri: photo.medium_url };
    } else if ( extraPhotos ) {
      const licensed = extraPhotos.find( p => p.photo.license_code );
      if ( licensed ) {
        source = { uri: licensed.photo.medium_url };
      }
    }

    return <Image source={source} style={styles.cellImage} />;
  };

  const navToNextScreen = ( ) => {
    const speciesScreen = { screen: "Species", params: { ...route.params } };
    setSpeciesId( item.id );
    if ( name === "Match" ) {
      setRoute( "Match" );
      // full nav path for QuickActions
      navigate( "MainTab", speciesScreen );
    } else if ( name === "Species" ) {
      navigation.push( "MainTab", speciesScreen );
    } else {
      setRoute( "Home" );
      navigate( "Species", { ...route.params } );
    }
  };

  return (
    <TouchableOpacity onPress={navToNextScreen} style={styles.gridCell}>
      <View style={styles.cellImage}>
        {photo && renderSpeciesImage( )}
        {seenTaxa && <Image source={icons.speciesObserved} style={styles.checkbox} />}
      </View>
      <View style={styles.cellTitle}>
        <Text numberOfLines={3} style={styles.cellTitleText}>
          {i18n.locale === "de"
            ? capitalizeNames( commonName || item.name ).replace( /(- |-)/g, "-\n" )
            : capitalizeNames( commonName || item.name )}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SpeciesImageCell;
