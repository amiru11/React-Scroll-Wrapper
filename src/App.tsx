import * as React from "react";
import "./styles.scss";

import ScrollWrapper from "./components/ScrollWrapper";

export default function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
      <h2>Dragable Scroll Wrapper Element</h2>
      <ScrollWrapper />
    </div>
  );
}
