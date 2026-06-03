import React, { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import { RadioButton, RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button";
import Realm from "realm";

import i18n from "../../i18n";
import realmConfig from "../../models";
import { colors } from "../../styles/global";
import { textStyles, viewStyles } from "../../styles/settings";
import { baseTextStyles } from "../../styles/textStyles";
import { useLocationPermission } from "../../utility/customHooks";
import { updateUserSetting } from "../../utility/settingsHelpers";
import StyledText from "../UIComponents/StyledText";

const SpeciesDetail = ( ) => {
  const granted = useLocationPermission( );
  const [seasonality, setSeasonality] = useState<boolean | null>( null );

  const radioButtons = [
    { label: i18n.t( "settings.seasonality_option_1" ), value: 0 },
    { label: i18n.t( "settings.seasonality_option_2" ), value: 1 },
  ];

  const updateIndex = async ( i: number ) => {
    const newValue = i !== 0;
    if ( newValue === seasonality ) {
      return;
    }
    const value = await updateUserSetting( "localSeasonality", newValue );
    setSeasonality( value );
  };

  useEffect( ( ) => {
    let isCurrent = true;

    const fetchUserSettings = async ( ) => {
      const realm = await Realm.open( realmConfig );
      const userSettings = realm.objects( "UserSettingsRealm" );
      if ( isCurrent ) {
        setSeasonality( userSettings[0].localSeasonality );
      }
    };
    fetchUserSettings( );
    return ( ) => {
      isCurrent = false;
    };
  }, [] );

  // probably need to add a check here for iOS permissions too
  if ( Platform.OS === "android" && granted === false ) {
    return null;
  }

  return (
    <View style={viewStyles.margin}>
      <StyledText style={baseTextStyles.header}>{i18n.t( "settings.species_detail" ).toLocaleUpperCase()}</StyledText>
      <View style={viewStyles.marginSmall} />
      <StyledText style={baseTextStyles.buttonGray}>{i18n.t( "settings.seasonality" ).toLocaleUpperCase()}</StyledText>
      <View style={viewStyles.radioButtonSmallMargin}>
        {radioButtons.map( ( obj, i ) => (
          <RadioButton
            key={`${obj.label}${i}`}
            style={viewStyles.radioMargin}
          >
            <RadioButtonInput
              obj={obj}
              index={i}
              isSelected={( i === 1 && seasonality ) || ( i === 0 && !seasonality )}
              onPress={updateIndex}
              borderWidth={1}
              buttonInnerColor={colors.seekForestGreen}
              buttonOuterColor={colors.seekForestGreen}
              buttonSize={12}
              buttonOuterSize={20}
              accessible
              accessibilityLabel={radioButtons[i].value.toString( )}
            />
            <RadioButtonLabel
              obj={obj}
              index={i}
              onPress={updateIndex}
              labelHorizontal
              labelStyle={[baseTextStyles.body, textStyles.seasonalityRadioButtonText]}
              accessible
              accessibilityLabel={radioButtons[i].label}
            />
          </RadioButton>
        ) )}
      </View>
    </View>
  );
};

export default SpeciesDetail;
