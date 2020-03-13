import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Search from "../screens/Search";
import Detail from "../screens/Detail";
import Share from "../screens/Share";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        // headerMode="none"
      >
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Share" component={Share} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
