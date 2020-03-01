import * as React from "react";
import {
  Alert,
  Button,
  Text,
  TextInput,
  View,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import Constants from "expo-constants";
import { Linking } from "expo";
import { QRCode } from "react-native-custom-qr-codes-expo";

// You can import from local files
import AssetExample from "./components/AssetExample";

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";

const back =
  "https://img.favpng.com/19/13/6/logo-organization-photography-brand-png-favpng-NdpBCztQKB1TvXknxeySryMsk.jpg";
const noPhoto = "https://www.freeiconspng.com/uploads/no-image-icon-11.PNG";

// ##########################
// API DOCUMENTATION
// https://developer.spotify.com/console/get-search-item/
// https://developer.spotify.com/documentation/web-api/reference/search/search/

// you can get VALID token here - https://developer.spotify.com/console/get-current-user/
const bearerToken =
  "Bearer BQDDfSzUeMeMiIPzxcTRth76tXsbMkKpNAY66DcjBwNz9DSotIrSmujUl0GY-WpDeflEnvHEVNF4zy03fVXj-mLSVomFkOQmmpGsltXsSHEHpE-G73z312QzOx-8GHRsL-E5RwS3e26CVfJCGaHOBIr3Cwa8qDqvDQgGKAeX85h8weZETGSd-YCStDxKxJ8zFjgkTKEGTCuiOdT4QLk1s5T0-lzTGHco60oIlGPXGfJbmy4ifsmaFzs0sHzZDVDxCfha5gNeu7xg-TLJaoq61xMB30AuFg";
// ##########################

const SCENES = {
  MAIN: 1,
  DETAIL: 2,
  MODAL: 3
};

function Item(props) {
  const { id, images, name, type, onGoDetail } = props;
  const thumbnail = (images && images[0] && images[0].url) || noPhoto;

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
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "Metal",
      activeScene: SCENES.MAIN,
      selectedId: false,
      data: []
    };
  }

  onChangeText = val => {
    this.setState({
      searchString: val
    });
  };

  getSomeData = async searchString => {
    const res = await fetch(
      `https://api.spotify.com/v1/search?type=artist,album&q=${searchString}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: bearerToken
        }
      }
    );
    const resJson = await res.json();

    // error handler
    const error = resJson.error;
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!error) {
      const { status, message } = error;
      Alert.alert(
        `error code: ${JSON.stringify(status)}`,
        JSON.stringify(message)
      );
      return this.state.data;
    }

    const items = resJson.artists.items;
    return items;
  };

  onPressSearch = async () => {
    const { searchString } = this.state;
    const result = await this.getSomeData(searchString);

    this.setState({
      data: result
    });
  };

  onPressClear = () => {
    this.setState({
      data: [],
      searchString: ""
    });
  };

  onGoMain = () => {
    this.setState({
      activeScene: SCENES.MAIN
    });
  };

  onGoModal = () => {
    this.setState({
      activeScene: SCENES.MODAL
    });
  };

  onGoDetail = id => {
    this.setState({
      activeScene: SCENES.DETAIL,
      selectedId: id
    });
  };

  render() {
    const { searchString, activeScene, selectedId, data } = this.state;

    const selectedItem = data.find(item => item.id === selectedId);
    const url =
      (selectedItem &&
        selectedItem.external_urls &&
        selectedItem.external_urls.spotify) ||
      false;
    const followers =
      (selectedItem &&
        selectedItem.followers &&
        selectedItem.followers.total) ||
      0;
    const genres =
      (selectedItem && selectedItem.genres && selectedItem.genres.join(", ")) ||
      "";
    const thumbnail =
      (selectedItem &&
        selectedItem.images &&
        selectedItem.images[0] &&
        selectedItem.images[0].url) ||
      noPhoto;
    const name = (selectedItem && selectedItem.name) || "";
    const popularity = (selectedItem && selectedItem.popularity) || 0;
    const type = (selectedItem && selectedItem.type) || "";

    return (
      <SafeAreaView style={styles.containerSafe}>
        {activeScene === SCENES.MAIN && (
          <View style={styles.container}>
            <View style={styles.title}>
              <Text>Awesome inc.</Text>
            </View>

            <View style={styles.searchView}>
              <TextInput
                style={styles.searchInput}
                onChangeText={text => this.onChangeText(text)}
                placeholder={"please type something for search..."}
                value={searchString}
              />
              <TouchableOpacity
                onPress={this.onPressSearch}
                style={styles.searchButton}
              >
                <Image
                  style={{ width: 30, height: 30 }}
                  source={{ uri: "https://img.icons8.com/color/2x/search.png" }}
                />
              </TouchableOpacity>
              <Button title="🔪" onPress={this.onPressClear} color="black" />
            </View>

            <FlatList
              data={data}
              renderItem={({ item }) => (
                <Item
                  id={item.id}
                  images={item.images}
                  name={item.name}
                  type={item.type}
                  onGoDetail={() => this.onGoDetail(item.id)}
                />
              )}
              keyExtractor={item => item.id}
            />
          </View>
        )}

        {activeScene === SCENES.DETAIL && (
          <View style={styles.detailContainer}>
            <TouchableOpacity onPress={this.onGoMain} style={styles.backButton}>
              <Image style={{ width: 40, height: 40 }} source={{ uri: back }} />
            </TouchableOpacity>

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

            <Button
              title={`open "${name}"`}
              onPress={() => Linking.openURL(url)}
              style={styles.button}
            />

            <Button
              title={`share qr code for "${name}"`}
              onPress={this.onGoModal}
              style={styles.button}
            />
          </View>
        )}

        {activeScene === SCENES.MODAL && (
          <View style={styles.detailContainer}>
            <TouchableOpacity
              onPress={() => this.onGoDetail(selectedId)}
              style={styles.backButton}
            >
              <Image style={{ width: 40, height: 40 }} source={{ uri: back }} />
            </TouchableOpacity>

            <View style={styles.detailImageContainer}>
              <Text style={styles.detailItemTitle}>{name}</Text>
              <QRCode content={url} logo={{ url: thumbnail }} />
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#ecf0f1"
  },
  containerSafe: {
    flex: 1
  },
  title: {
    alignItems: "center",
    marginBottom: 10
  },
  searchView: {
    flexDirection: "row"
  },
  searchInput: {
    height: 40,
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10
  },
  searchButton: {
    borderWidth: 1,
    borderColor: "black",
    marginLeft: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    flexDirection: "row",
    borderWidth: 1,
    padding: 5,
    marginVertical: 2
  },
  itemDescription: {
    justifyContent: "space-around",
    paddingLeft: 10
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold"
  },
  itemType: {
    fontSize: 14
  },
  detailContainer: {
    flex: 1,
    backgroundColor: "#ecf0f1"
  },
  backButton: {
    borderWidth: 1,
    borderColor: "black",
    width: 40,
    height: 40,
    margin: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  detailImageContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  detailItemTitle: {
    fontSize: 20,
    fontWeight: "bold"
  },
  detailItem: {
    fontSize: 18,
    paddingVertical: 5,
    paddingLeft: 10
  }
});
