import React from "react";
import HomePage from "./components/pages/HomePage";
import { MatchProvider } from "./context/MatchContext";

function App() {
  return (
    <MatchProvider>
      <HomePage />
    </MatchProvider>
  );
}

export default App;
