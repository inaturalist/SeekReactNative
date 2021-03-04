// @flow

import React, { useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { colors } from "../../../styles/global";
import styles from "../../../styles/posting/postToiNat";
import i18n from "../../../i18n";
import posting from "../../../assets/posting";
import icons from "../../../assets/icons";
import DateTimePicker from "../../UIComponents/DateTimePicker";
import { formatYearMonthDay } from "../../../utility/dateHelpers";

type Props = {
  dateToDisplay: ?string,
  handleDatePicked: ( ) => void
}

const DatePicker = ( { dateToDisplay, handleDatePicked }: Props ) => {
  const [showModal, setShowModal] = useState( false );

  const openModal = () => setShowModal( true );
  const closeModal = () => setShowModal( false );

  const date = dateToDisplay && formatYearMonthDay( dateToDisplay );

  const handlePicked = ( value ) => {
    handleDatePicked( value );
    closeModal();
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
            {i18n.t( "posting.date" ).toLocaleUpperCase()}
          </Text>
          <Text style={styles.text}>{date}</Text>
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
