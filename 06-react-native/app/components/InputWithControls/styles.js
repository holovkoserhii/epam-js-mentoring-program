import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  searchView: {
    flexDirection: "column"
  },
  textInputsContainer: {
    flexDirection: "row"
  },
  buttonHolder: {
    flexDirection: "row",
    justifyContent: "center"
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
    marginRight: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  }
});
