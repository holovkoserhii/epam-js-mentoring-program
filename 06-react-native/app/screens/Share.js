import React from "react";

import { QrWithPhoto } from "./../components/QrWithPhoto";
import { BackButton } from "./../components/BackButton";

const Share = ({ navigation, route }) => {
  const { item } = route.params;
  const onGoDetail = () => navigation.navigate("Detail", { item });
  return (
    <QrWithPhoto item={item}>
      <BackButton onGoBack={onGoDetail} />
    </QrWithPhoto>
  );
};

export default Share;
