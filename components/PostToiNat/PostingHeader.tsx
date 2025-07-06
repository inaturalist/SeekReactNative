import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  Modal
} from "react-native";

import styles from "../../styles/posting/postToiNat";
import posting from "../../assets/posting";
import SelectSpecies from "./SelectSpecies";
import SpeciesCard from "../UIComponents/SpeciesCard";

interface Taxon {
  name: string;
  iconicTaxonId?: number;
  preferredCommonName?: string;
}

interface ImageObject {
  uri: string;
}

interface Props {
  taxon: Taxon;
  image: ImageObject;
  updateTaxon: Function;
}

const PostingHeader = ( {
  taxon,
  image,
  updateTaxon
}: Props ) => {
  const [showModal, setShowModal] = useState( false );

  const openModal = ( ) => setShowModal( true );
  const closeModal = ( ) => setShowModal( false );

  return (
    <>
      <Modal
        onRequestClose={closeModal}
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
        onPress={openModal}
        style={styles.card}
      >
        <SpeciesCard
          taxon={taxon}
          handlePress={openModal}
          photo={{ uri: image.uri }}
        />
        <Image
          source={posting.edit}
          style={styles.editIcon}
        />
      </TouchableOpacity>
    </>
  );
};

export default PostingHeader;
