import React, { useState, useEffect } from "react";

import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
  Keyboard
} from "react-native";
import { CheckBox } from "react-native-elements";

import { getData } from "../../config/api";
import styles from "./styles";

const InputWithControls = ({ setResultsData }) => {
  const [searchInputValue, setSearchsearchInputValue] = useState("Metal");
  const [limitInputValue, setLimitInputValue] = useState("2");
  const [typesInputValue, setTypesInputValue] = useState([
    {
      id: 0,
      title: "album",
      checked: true
    },
    {
      id: 1,
      title: "artist",
      checked: true
    },
    {
      id: 2,
      title: "playlist",
      checked: false
    },
    {
      id: 3,
      title: "track",
      checked: false
    }
  ]);

  const onChangeText = value => setSearchsearchInputValue(value);
  const onChangeLimit = value => setLimitInputValue(value);

  const toggleCheckbox = id => {
    const changedCheckbox = { ...typesInputValue.find(cb => cb.id === id) };
    const unChangedCheckboxes = typesInputValue.filter(cb => cb.id !== id);
    setTypesInputValue(
      [
        ...unChangedCheckboxes,
        { ...changedCheckbox, checked: !changedCheckbox.checked }
      ].sort((a, b) => a.id - b.id)
    );
  };
  const onPressSearch = async () => {
    const result = await getData(
      searchInputValue,
      limitInputValue,
      typesInputValue.filter(typeObj => typeObj.checked).map(type => type.title)
    );
    const data = Object.values(result)
      .map(o => o.items)
      .flat();
    setResultsData(data);
    Keyboard.dismiss();
  };

  useEffect(() => {
    onPressSearch();
  }, []);

  const onPressClear = () => {
    setSearchsearchInputValue("");
    setLimitInputValue("");
    setTypesInputValue([
      {
        id: 0,
        title: "album",
        checked: false
      },
      {
        id: 1,
        title: "artist",
        checked: false
      },
      {
        id: 2,
        title: "playlist",
        checked: false
      },
      {
        id: 3,
        title: "track",
        checked: false
      }
    ]);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.searchView}>
      <View style={styles.textInputsContainer}>
        <TextInput
          style={styles.searchInput}
          onChangeText={onChangeText}
          placeholder={"please type something for search..."}
          value={searchInputValue}
        />
        <TextInput
          style={styles.searchInput}
          onChangeText={onChangeLimit}
          placeholder={"please type search limit (max 50)..."}
          value={limitInputValue}
          keyboardType="phone-pad"
        />
      </View>
      <View>
        {typesInputValue.map(checkbox => (
          <CheckBox
            title={checkbox.title}
            key={checkbox.id}
            checked={checkbox.checked}
            onPress={() => toggleCheckbox(checkbox.id)}
          />
        ))}
      </View>
      <View style={styles.buttonHolder}>
        <TouchableOpacity onPress={onPressSearch} style={styles.searchButton}>
          <Image
            style={{ width: 30, height: 30 }}
            source={{ uri: "https://img.icons8.com/color/2x/search.png" }}
          />
        </TouchableOpacity>
        <Button title="🔪" onPress={onPressClear} color="black" />
      </View>
    </View>
  );
};

export default InputWithControls;
