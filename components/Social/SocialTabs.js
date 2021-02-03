// @flow

import React, { } from "react";
import { View, TouchableOpacity, Text } from "react-native";

import styles from "../../styles/social/social";
import i18n from "../../i18n";

type Props = {
  tab: string,
  toggleTab: Function
}

const SocialTabs = ( { tab, toggleTab }: Props ) => {
  const renderTab = selectedTab => (
    <TouchableOpacity onPress={toggleTab}>
      <Text style={[styles.photoSizeText, tab === selectedTab && styles.selectedPhotoSizeText]}>
        {i18n.t( `social.${selectedTab}` ).toLocaleUpperCase( )}
      </Text>
    </TouchableOpacity>
  );

  const renderIndicator = selectedTab => {
    if ( tab === selectedTab ) {
      return <View style={styles.roundedIndicator} />;
    } else {
      return <View style={styles.hiddenIndicator} />;
    }
  };

  return (
    <>
      <View style={styles.photoTabs}>
        {renderTab( "square" )}
        {renderTab( "original" )}
      </View>
      <View style={styles.photoTabs}>
        {renderIndicator( "square" )}
        {renderIndicator( "original" )}
      </View>
    </>
  );
};

export default SocialTabs;
