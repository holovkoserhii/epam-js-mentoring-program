import { Alert } from "react-native";

import { BEARER_TOKEN } from "./constants";
//
export const getData = async (
  searchString,
  limit = 5,
  types = ["artist", "album"]
) => {
  const res = await fetch(
    `https://api.spotify.com/v1/search?type=${types.join(
      ","
    )}&limit=${limit}&q=${searchString}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: BEARER_TOKEN
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
    return;
  }
  return resJson;
};
