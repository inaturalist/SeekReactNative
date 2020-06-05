// @flow

import React, { useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { colors } from "../../styles/global";
import styles from "../../styles/posting/postToiNat";
import i18n from "../../i18n";
import posting from "../../assets/posting";
import icons from "../../assets/icons";
import DateTimePicker from "../UIComponents/DateTimePicker";

type Props = {
  dateToDisplay: ?string,
  handleDatePicked: Function
}

const DatePicker = ( { dateToDisplay, handleDatePicked }: Props ) => {
  const [showModal, setShowModal] = useState( false );

  const openModal = () => setShowModal( true );
  const closeModal = () => setShowModal( false );

  return (
    <>
      <DateTimePicker
        datetime
        isDateTimePickerVisible={showModal}
        onDatePicked={handleDatePicked}
        toggleDateTimePicker={closeModal}
      />
      <TouchableOpacity
        onPress={() => openModal()}
        style={styles.thinCard}
      >
        <Image source={posting.date} style={styles.icon} />
        <View style={styles.row}>
          <Text style={styles.greenText}>
            {i18n.t( "posting.date" ).toLocaleUpperCase()}
          </Text>
          <Text style={styles.text}>{dateToDisplay}</Text>
        </View>
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
