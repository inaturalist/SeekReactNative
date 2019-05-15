import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/posting/postStatus";
import LoadingWheel from "../LoadingWheel";
import { colors } from "../../styles/global";
import posting from "../../assets/posting";

type Props = {
  loading: boolean,
  postingSuccess: boolean,
  togglePostModal: Function
};

const PostStatus = ( { loading, postingSuccess, togglePostModal }: Props ) => {
  let headerText;
  let image;
  let extraText;

  if ( loading ) {
    headerText = i18n.t( "posting.posting" ).toLocaleUpperCase();
    image = <LoadingWheel color={colors.seekiNatGreen} />;
  } else if ( !loading && postingSuccess ) {
    headerText = i18n.t( "posting.posting_success" ).toLocaleUpperCase();
    image = <Image source={posting.iNatuploading} />;
  } else {
    headerText = i18n.t( "posting.posting_failure" ).toLocaleUpperCase();
    image = <Image source={posting.uploadfail} />;
    extraText = <Text style={styles.text}>{i18n.t( "posting.internet" )}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={[
        styles.header,
        ( !loading && !postingSuccess ) && { color: colors.seekTeal }
      ]}
      >
        {headerText}
      </Text>
      <View style={{ marginTop: 54 }} />
      {image}
      {extraText}
      {!loading ? (
        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={() => togglePostModal()}
            style={[
              styles.greenButton,
              ( !loading && !postingSuccess ) && { backgroundColor: colors.seekTeal }
            ]}
          >
            <Text style={styles.buttonText}>
              {i18n.t( "posting.ok" ).toLocaleUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default PostStatus;
