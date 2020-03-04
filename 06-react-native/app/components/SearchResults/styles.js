import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
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
  }
});
