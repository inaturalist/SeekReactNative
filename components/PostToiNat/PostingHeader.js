// @flow

import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  Modal
} from "react-native";

import { colors } from "../../styles/global";
import styles from "../../styles/posting/postToiNat";
import icons from "../../assets/icons";
import SelectSpecies from "./SelectSpecies";
import SpeciesCard from "../UIComponents/SpeciesCard";

type Props = {
  taxon: Object,
  image: Object,
  updateTaxon: Function
}

const PostingHeader = ( {
  taxon,
  image,
  updateTaxon
}: Props ) => {
  const [showModal, setShowModal] = useState( false );

  const openModal = () => setShowModal( true );
  const closeModal = () => setShowModal( false );

  return (
    <>
      <Modal
        onRequestClose={() => setShowModal( false )}
        visible={showModal}
      >
        <SelectSpecies
          image={image.uri}
          seekId={taxon}
          toggleSpeciesModal={closeModal}
          updateTaxon={updateTaxon}
        />
      </Modal>
      <TouchableOpacity
        onPress={() => openModal()}
        style={styles.card}
      >
        <SpeciesCard
          taxon={taxon}
          handlePress={() => openModal()}
          photo={{ uri: image.uri }}
        />
        {/* $FlowFixMe */}
        <Image
          source={icons.backButton}
          tintColor={colors.seekForestGreen}
          style={[styles.buttonIcon, styles.rotate]}
        />
      </TouchableOpacity>
    </>
  );
};

export default PostingHeader;
