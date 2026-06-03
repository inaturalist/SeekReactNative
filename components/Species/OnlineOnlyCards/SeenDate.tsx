import * as React from "react";
import { Image, View } from "react-native";

import icons from "../../../assets/icons";
import i18n from "../../../i18n";
import { viewStyles } from "../../../styles/species/species";
import { baseTextStyles } from "../../../styles/textStyles";
import { useAppOrientation } from "../../Providers/AppOrientationProvider";
import StyledText from "../../UIComponents/StyledText";

interface Props {
  readonly loading: boolean;
  readonly seenDate: string | null;
}

const SeenDate = ( { loading, seenDate }: Props ) => {
  const { isLandscape } = useAppOrientation( );
  return !loading ? (
    <View style={[viewStyles.row, viewStyles.textContainer, isLandscape && viewStyles.largerTextContainer]}>
      <Image source={icons.checklist} style={viewStyles.checkmark} />
      <StyledText style={baseTextStyles.body}>{i18n.t( "species_detail.seen_on", { date: seenDate } )}</StyledText>
    </View>
  ) : null;
};

export default SeenDate;
