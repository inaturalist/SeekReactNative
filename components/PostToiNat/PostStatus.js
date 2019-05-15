import React from "react";
import {
  View,
  TouchableOpacity,
  Text
} from "react-native";

import styles from "../../styles/posting/postStatus";
import LoadingWheel from "../LoadingWheel";
import { colors } from "../../styles/global";

const PostStatus = () => (
  <View style={styles.container}>
    <Text style={styles.header}>
      post modal
    </Text>
    <LoadingWheel color={colors.seekiNatGreen} />
  </View>
);

export default PostStatus;
