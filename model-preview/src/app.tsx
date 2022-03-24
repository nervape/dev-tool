import { useState } from "react";
import logo from "./logo.svg";
import "./app.less";
import ModelPreview from "./component/model-preview";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="app">
      <ModelPreview></ModelPreview>
    </div>
  );
}

export default App;
