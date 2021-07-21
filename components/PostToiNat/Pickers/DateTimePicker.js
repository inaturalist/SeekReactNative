// @flow

import React, { useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import type { Node } from "react";

import { colors } from "../../../styles/global";
import styles from "../../../styles/posting/postToiNat";
import i18n from "../../../i18n";
import posting from "../../../assets/posting";
import icons from "../../../assets/icons";
import DateTimePicker from "../../UIComponents/DateTimePicker";

type Props = {
  dateToDisplay: ?string,
  handleDatePicked: ( Date ) => void
}

const DatePicker = ( { dateToDisplay, handleDatePicked }: Props ): Node => {
  const [showModal, setShowModal] = useState( false );

  const openModal = ( ) => setShowModal( true );
  const closeModal = ( ) => setShowModal( false );

  const displayDate = ( ) => dateToDisplay || "";

  const handlePicked = ( value ) => {
    handleDatePicked( value );
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
          <Text style={styles.greenText}>
            {i18n.t( "posting.date" ).toLocaleUpperCase( )}
          </Text>
          <Text style={styles.text}>{displayDate( )}</Text>
        </View>
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

export default DatePicker;
