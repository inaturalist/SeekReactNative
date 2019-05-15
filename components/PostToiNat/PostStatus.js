import React from "react";
import {
  View,
  TouchableOpacity,
  Text
} from "react-native";

import styles from "../../styles/posting/postStatus";
import LoadingWheel from "../LoadingWheel";
import { colors } from "../../styles/global";

type Props = {
  loading: boolean,
  togglePostModal: Function
};

const PostStatus = ( { loading, togglePostModal }: Props ) => (
  <View style={styles.container}>
    <Text style={styles.header}>
      post modal
    </Text>
    <View style={{ marginTop: 54 }} />
    <LoadingWheel color={colors.seekiNatGreen} />
    {!loading ? (
      <View style={styles.bottom}>
        <TouchableOpacity
          onPress={() => togglePostModal()}
          style={styles.greenButton}
        >
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>
    ) : null}
  </View>
);

export default PostStatus;
