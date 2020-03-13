import React from "react";
import { DetailsView } from "./../components/DetailsView";
import { BackButton } from "./../components/BackButton";

const Detail = ({ navigation, route }) => {
  const onGoSearch = () => navigation.navigate("Search");
  const onGoModal = item => navigation.navigate("Share", { item });

  const { item } = route.params;

  return (
    <DetailsView item={item} onGoModal={onGoModal}>
      <BackButton onGoBack={onGoSearch} />
    </DetailsView>
  );
};

export default Detail;
