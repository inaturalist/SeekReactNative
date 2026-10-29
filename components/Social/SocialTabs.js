import { TouchableOpacity, View } from "react-native";

import i18n from "../../i18n";
import { textStyles, viewStyles } from "../../styles/social/social";
import StyledText from "../UIComponents/StyledText";

const SocialTabs = ( { tab, toggleTab } ) => {
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
