import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";
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
    setSpeciesId( item.id );
    if ( name === "Species" ) {
      navigation.push( "Drawer", { screen: "Species", params: { ...route.params } } );
    } else {
      // Match is for common ancestor match screen with species nearby card
      setRoute( name === "Match" ? "Match" : "Home" );
      navigate( "Species", { ...route.params } );
    }
  };

  return (
    <TouchableOpacity onPress={navToNextScreen} style={styles.gridCell}>
      {photo && renderSpeciesImage( )}
      {seenTaxa && <Image source={icons.speciesObserved} style={styles.checkbox} />}
      <Text numberOfLines={3} style={styles.speciesNameText}>
        {i18n.locale === "de"
          ? capitalizeNames( commonName || item.name ).replace( /(- |-)/g, "-\n" )
          : capitalizeNames( commonName || item.name )}
      </Text>
    </TouchableOpacity>
  );
};

export default SpeciesImageCell;
