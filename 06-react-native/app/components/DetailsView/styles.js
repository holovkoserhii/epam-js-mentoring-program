import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  detailContainer: {
    flex: 1,
    backgroundColor: "#ecf0f1"
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

export default styles;
