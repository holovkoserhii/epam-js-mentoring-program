import React from "react";
import { View, Text } from "react-native";
import { QRCode } from "react-native-custom-qr-codes-expo";

import styles from "./styles";
import { NO_PHOTO } from "./../../config/constants";

const QrWithPhoto = ({ item, children }) => {
  const thumbnail = item?.images?.[0]?.url ?? NO_PHOTO;
  const url = item?.external_urls?.spotify ?? false;

  const name = item?.name ?? "";
  return (
    <View style={styles.detailContainer}>
      {children}
      <View style={styles.detailImageContainer}>
        <Text style={styles.detailItemTitle}>{name}</Text>
        <QRCode content={url} logo={{ uri: thumbnail }} />
      </View>
    </View>
  );
};

export default QrWithPhoto;
