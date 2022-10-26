// @flow

import * as React from "react";
import { View, TouchableOpacity } from "react-native";

import { viewStyles, textStyles } from "../../styles/social/social";
import i18n from "../../i18n";
import StyledText from "../UIComponents/StyledText";

type Props = {
  tab: string,
  toggleTab: Function
}

const SocialTabs = ( { tab, toggleTab }: Props ): React.Node => {
  const renderTab = selectedTab => (
    <TouchableOpacity onPress={toggleTab}>
      <StyledText style={[textStyles.photoSizeText, tab === selectedTab && textStyles.selectedPhotoSizeText]}>
        {i18n.t( `social.${selectedTab}` ).toLocaleUpperCase( )}
      </StyledText>
    </TouchableOpacity>
  );

  const renderIndicator = selectedTab => {
    if ( tab === selectedTab ) {
      return <View style={viewStyles.roundedIndicator} />;
    } else {
      return <View style={viewStyles.hiddenIndicator} />;
    }
  };

  return (
    <>
      <View style={viewStyles.photoTabs}>
        {renderTab( "square" )}
        {renderTab( "original" )}
      </View>
      <View style={viewStyles.photoTabs}>
        {renderIndicator( "square" )}
        {renderIndicator( "original" )}
      </View>
    </>
  );
};

export default SocialTabs;
