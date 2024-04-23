import React from "react";
import HomeStack from "./src/navigators/HomeStack";
import AppProviders from "./src/context/AppProviders";

export default function App() {
  return (
    <AppProviders>
      <HomeStack />
    </AppProviders>
  );
}
