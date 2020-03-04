import React, { useState } from "react";
import { View, StatusBar } from "react-native";

import { Header } from "../components/Header";
import { InputWithControls } from "../components/InputWithControls";
import { SearchResults } from "../components/SearchResults";

const Search = ({ navigation }) => {
  const [resultsData, setResultsData] = useState([]);

  const onGoDetail = item => {
    navigation.navigate("Detail", { item });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: "#ecf0f1"
      }}
    >
      <StatusBar hidden={true} />
      <Header />
      <InputWithControls setResultsData={setResultsData} />
      {resultsData.length ? (
        <SearchResults resultsData={resultsData} onGoDetail={onGoDetail} />
      ) : null}
    </View>
  );
};

export default Search;
