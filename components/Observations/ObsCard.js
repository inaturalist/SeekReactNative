// @flow

import React, { Component } from "react";
import {
  Image,
  TouchableOpacity,
  Platform,
  ScrollView
} from "react-native";
import RNFS from "react-native-fs";
import { withNavigation } from "react-navigation";

import { setSpeciesId, setRoute, getTaxonCommonName } from "../../utility/helpers";
import styles from "../../styles/observations/obsCard";
import icons from "../../assets/icons";
import { dirPictures } from "../../utility/dirStorage";
import SpeciesCard from "../UIComponents/SpeciesCard";

type Props = {
  +navigation: any,
  +item: Object,
  +openModal: Function,
  +updateItemScrolledId: Function,
  +itemScrolledId: ?number
}

type State = {
  photo: ?Object,
  commonName?: ?string,
  focusedScreen: boolean
}

class ObservationCard extends Component<Props, State> {
  scrollView: ?any

  constructor() {
    super();

    this.state = {
      photo: null,
      commonName: null,
      focusedScreen: true
    };
  }

  componentDidMount() {
    const seekv1Photos = `${RNFS.DocumentDirectoryPath}/large`;
    if ( Platform.OS === "ios" && seekv1Photos ) {
      this.checkForSeekV1Photos( seekv1Photos );
    } else {
      this.checkForSeekV2Photos();
    }
    this.localizeCommonName();
  }

  componentDidUpdate( prevProps: Object ) {
    const { itemScrolledId } = this.props;

    if ( prevProps.itemScrolledId !== itemScrolledId && itemScrolledId !== null ) {
      this.scrollLeft();
    }
  }

  componentWillUnmount() {
    this.setState( { focusedScreen: false } );
  }

  setPhoto( photo: Object ) {
    this.setState( { photo } );
  }

  checkForSeekV1Photos( seekv1Photos: string ) {
    const { item } = this.props;
    const { focusedScreen } = this.state;

    const photoPath = `${seekv1Photos}/${item.uuidString}`;

    if ( focusedScreen ) {
      RNFS.stat( photoPath ).then( () => {
        RNFS.readFile( photoPath, { encoding: "base64" } ).then( ( encodedData ) => {
          this.setPhoto( { uri: `data:image/jpeg;base64,${encodedData}` } );
        } ).catch( () => {
          this.checkForSeekV2Photos();
        } );
      } ).catch( () => {
        this.checkForSeekV2Photos();
      } );
    }
  }

  checkForSeekV2Photos() {
    const { item } = this.props;
    const { focusedScreen } = this.state;
    const { defaultPhoto } = item.taxon;
    const { backupUri, mediumUrl } = item.taxon.defaultPhoto;

    if ( defaultPhoto && focusedScreen ) {
      if ( backupUri ) {
        const uri = backupUri.split( "Pictures/" ); // should work for both iOS and Android
        const backupFilepath = `${dirPictures}/${uri[1]}`;
        RNFS.readFile( backupFilepath, { encoding: "base64" } ).then( ( encodedData ) => {
          this.setPhoto( { uri: `data:image/jpeg;base64,${encodedData}` } );
        } ).catch( () => this.setPhoto( { uri: backupFilepath } ) );
      } else if ( mediumUrl ) {
        this.setPhoto( { uri: mediumUrl } );
      }
    }
  }

  localizeCommonName() {
    const { item } = this.props;

    getTaxonCommonName( item.taxon.id ).then( ( commonName ) => {
      if ( commonName ) {
        this.setState( { commonName } );
      }
    } );
  }

  scrollLeft() {
    const { item, itemScrolledId, updateItemScrolledId } = this.props;

    if ( this.scrollView && itemScrolledId !== item.taxon.id ) {
      this.scrollView.scrollTo( {
        x: 0, y: 0, duration: 300
      } );

      updateItemScrolledId( null );
    }
  }

  render() {
    const {
      navigation,
      item,
      openModal,
      updateItemScrolledId
    } = this.props;
    const { photo, commonName } = this.state;
    const { taxon } = item;

    return (
      <ScrollView
        ref={( ref ) => { this.scrollView = ref; }}
        contentContainerStyle={styles.card}
        horizontal
        onScrollBeginDrag={() => updateItemScrolledId( taxon.id )}
        showsHorizontalScrollIndicator={false}
      >
        <SpeciesCard
          commonName={commonName}
          handlePress={() => {
            setSpeciesId( taxon.id );
            setRoute( "MyObservations" );
            navigation.navigate( "Species" );
          }}
          iconicTaxonId={taxon.iconicTaxonId}
          photo={photo}
          scientificName={taxon.name}
        />
        <TouchableOpacity
          onPress={() => openModal(
            item.taxon.id,
            photo,
            commonName,
            taxon.name,
            taxon.iconicTaxonId
          )}
          style={styles.deleteButton}
        >
          <Image source={icons.delete} />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default withNavigation( ObservationCard );
