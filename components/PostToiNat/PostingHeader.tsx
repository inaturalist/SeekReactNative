import React, { useCallback, useState } from "react";
import {
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";

import posting from "../../assets/posting";
import styles from "../../styles/posting/postToiNat";
import SpeciesCard from "../UIComponents/SpeciesCard";
import SelectSpecies from "./SelectSpecies";

interface Taxon {
  name: string;
  iconicTaxonId?: number;
  preferredCommonName?: string;
  taxaId?: number;
}

interface ImageObject {
  uri: string;
}

interface Props {
  taxon: Taxon;
  image: ImageObject;
  updateTaxon: ( id: number, commonName: string, scientificName: string ) => void;
}

const PostingHeader = ( {
  taxon,
  image,
  updateTaxon,
}: Props ) => {
  const [showModal, setShowModal] = useState( false );

  const openModal = ( ) => setShowModal( true );
  const closeModal = useCallback( () => setShowModal( false ), [] );

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
