import React from "react";
import { View, Text, Image, Button } from "react-native";
import { Linking } from "expo";

import styles from "./styles";
import { NO_PHOTO } from "./../../config/constants";

const DetailsView = ({ item, onGoModal, children }) => {
  const followers = item?.followers?.total ?? 0;
  const genres = item?.genres?.join(", ") ?? "";
  const name = item?.name ?? "";
  const popularity = item?.popularity ?? 0;
  const type = item?.type ?? "";
  const thumbnail = item?.images?.[0]?.url ?? NO_PHOTO;
  const url = item?.external_urls?.spotify ?? false;

  return (
    <View style={styles.detailContainer}>
      {children}
      <Text style={styles.detailItem}>type: {type}</Text>
      <View style={styles.detailImageContainer}>
        <Text style={styles.detailItemTitle}>name: {name}</Text>
        <Image
          style={{ width: 300, height: 300 }}
          source={{ uri: thumbnail }}
        />
      </View>
      <Text style={styles.detailItem}>Genres: {genres}</Text>
      <Text style={styles.detailItem}>Popularity: {popularity}</Text>
      <Text style={styles.detailItem}>Followers: {followers}</Text>
      <Button title={`open "${name}"`} onPress={() => Linking.openURL(url)} />
      <Text style={styles.detailItem}></Text>
      <Button
        title={`share qr code for "${name}"`}
        onPress={() => onGoModal(item)}
      />
    </View>
  );
};

export default DetailsView;
