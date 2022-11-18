// @flow

import * as React from "react";
import {
  View,
  Image,
  TouchableOpacity
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/modals/deleteModal";
import { colors } from "../../styles/global";
import icons from "../../assets/icons";
import SpeciesCard from "../UIComponents/SpeciesCard";
import WhiteModal from "../UIComponents/Modals/WhiteModal";
import Button from "../UIComponents/Buttons/Button";
import StyledText from "../UIComponents/StyledText";

type Props = {
  closeModal: Function,
  deleteObservation: Function,
  itemToDelete: {
    iconicTaxonId: number,
    preferredCommonName: string,
    name: string,
    photo: Object,
    id: number
  }
};

const DeleteModal = ( {
  closeModal,
  deleteObservation,
  itemToDelete
}: Props ): React.Node => {
  const {
    id,
    photo,
    preferredCommonName,
    name,
    iconicTaxonId
  } = itemToDelete;

  const deleteObs = ( ) => {
    deleteObservation( id );
    closeModal( true );
  };

  return (
    <WhiteModal noButton>
      {/* $FlowFixMe */}
      <LinearGradient
        colors={[colors.grayGradientDark, colors.grayGradientLight]}
        style={viewStyles.flagHeader}
      >
        <View style={[viewStyles.flagTextContainer, viewStyles.row]}>
          <StyledText allowFontScaling={false} style={textStyles.buttonText}>
            {i18n.t( "delete.header" ).toLocaleUpperCase()}
          </StyledText>
          <TouchableOpacity
            onPress={closeModal}
            style={viewStyles.flagBackButton}
          >
            <Image source={icons.closeWhite} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={viewStyles.margin} />
      <SpeciesCard
        allowFontScaling={false}
        taxon={{
          preferredCommonName,
          name,
          iconicTaxonId
        }}
        photo={photo}
      />
      <View style={viewStyles.margin} />
      <StyledText allowFontScaling={false} style={textStyles.text}>{i18n.t( "delete.description" )}</StyledText>
      <View style={viewStyles.marginSmall} />
      <Button
        handlePress={deleteObs}
        text="delete.yes"
        large
      />
      <View style={viewStyles.marginSmall} />
      <Button
        handlePress={closeModal}
        text="delete.no"
        color={colors.grayGradientLight}
      />
      <View style={viewStyles.marginLarge} />
    </WhiteModal>
  );
};

export default DeleteModal;
