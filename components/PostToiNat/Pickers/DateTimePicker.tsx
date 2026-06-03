import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  View,
} from "react-native";

import icons from "../../../assets/icons";
import posting from "../../../assets/posting";
import i18n from "../../../i18n";
import styles from "../../../styles/posting/postToiNat";
import { baseTextStyles } from "../../../styles/textStyles";
import DateTimePicker from "../../UIComponents/DateTimePicker";
import StyledText from "../../UIComponents/StyledText";

interface Props {
  dateToDisplay: string | null;
  handleDatePicked: ( date: Date ) => void;
}

const DatePicker = ( { dateToDisplay, handleDatePicked }: Props ) => {
  const [showModal, setShowModal] = useState( false );

  const openModal = ( ) => setShowModal( true );
  const closeModal = ( ) => setShowModal( false );

  const displayDate = ( ) => dateToDisplay || "";

  const handlePicked = ( date: Date ) => {
    handleDatePicked( date );
    closeModal( );
  };

  return (
    <>
      <DateTimePicker
        datetime
        isDateTimePickerVisible={showModal}
        onDatePicked={handlePicked}
        toggleDateTimePicker={closeModal}
      />
      <TouchableOpacity
        onPress={openModal}
        style={styles.thinCard}
      >
        <Image source={posting.date} />
        <View style={styles.row}>
          <StyledText style={baseTextStyles.postSectionHeader}>
            {i18n.t( "posting.date" ).toLocaleUpperCase( )}
          </StyledText>
          <StyledText style={[baseTextStyles.body, styles.text]}>{displayDate( )}</StyledText>
        </View>
        <Image
          source={icons.backButton}
          style={[styles.buttonIcon, styles.rotate]}
        />
      </TouchableOpacity>
    </>
  );
};

export default DatePicker;
