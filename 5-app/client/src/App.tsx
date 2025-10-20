import "./App.css";
import React, { useState, type ReactNode } from "react";
import Image from "./Image";

const maxDoroCount = 4;

function App(): React.ReactElement {
  const [imgs, setImgs] = useState<Array<ReactNode>>([]);

  const isDoroMax = () => imgs.length === maxDoroCount;
  const addImage = () => {
    if (!isDoroMax()) {
      const img = <Image />;
      setImgs((prevImgs) => [...prevImgs, img]);
    }
  };

  return (
    <div className="wrapper">
      <button
        type="button"
        className={isDoroMax() ? "bg-red" : ""}
        onClick={addImage}
      >
        {isDoroMax() ? "There are too many doros!" : "Load THE image!"}
      </button>
      {imgs.map((component, i) => {
        return <div key={i}>{component}</div>;
      })}
    </div>
  );
}

export default App;
