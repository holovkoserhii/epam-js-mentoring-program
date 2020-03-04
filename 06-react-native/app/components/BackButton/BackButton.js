import React from "react";
import { TouchableOpacity, Image } from "react-native";

import { BACK } from "./../../config/constants";
import styles from "./styles";

const BackButton = ({ onGoBack }) => (
  <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
    <Image style={{ width: 40, height: 40 }} source={{ uri: BACK }} />
  </TouchableOpacity>
);

export default BackButton;
