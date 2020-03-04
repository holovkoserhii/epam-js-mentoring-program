import React from "react";

import { View, TouchableOpacity, Image, Text } from "react-native";

import styles from "./styles";
import { NO_PHOTO } from "../../config/constants";

const ResultsItem = ({ images, name, type, onGoDetail }) => {
  const thumbnail = (images && images[0] && images[0].url) || NO_PHOTO;
  return (
    <TouchableOpacity onPress={onGoDetail} style={styles.item}>
      <View>
        <Image style={{ width: 70, height: 70 }} source={{ uri: thumbnail }} />
      </View>
      <View style={styles.itemDescription}>
        <Text style={styles.itemTitle}>{name}</Text>
        <Text style={styles.itemType}>type: {type}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ResultsItem;
