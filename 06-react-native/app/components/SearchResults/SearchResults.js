import React from "react";

import { FlatList, View, Text } from "react-native";

import ResultsItem from "./ResultsItem";

const SearchResults = ({ resultsData, onGoDetail }) => (
  <FlatList
    data={resultsData}
    renderItem={({ item }) => (
      <ResultsItem
        images={item.images}
        name={item.name}
        type={item.type}
        onGoDetail={() => onGoDetail(item)}
      />
    )}
    keyExtractor={item => item.id}
  />
);

export default SearchResults;
