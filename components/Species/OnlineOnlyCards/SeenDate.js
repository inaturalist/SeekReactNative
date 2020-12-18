// @flow
import React from "react";
import { View, Image, Text } from "react-native";

import styles from "../../../styles/species/species";
import icons from "../../../assets/icons";
import i18n from "../../../i18n";

type Props = {
  +seenDate: ?string
}

const SeenDate = ( { seenDate }: Props ) => (
  <View style={[
    styles.row,
    styles.rowMargin,
    styles.textContainer
  ]}
  >
    <Image source={icons.checklist} style={styles.checkmark} />
    <Text style={styles.text}>{i18n.t( "species_detail.seen_on", { date: seenDate } )}</Text>
  </View>
);

export default SeenDate;
