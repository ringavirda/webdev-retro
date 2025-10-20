import React, { ReactNode, useState } from "react";

import Image from "./Image";

const maxDoroCount = 4;

const App: React.FC = () => {
  const [imgs, setImgs] = useState<Array<ReactNode>>([]);

  const isDoroMax = () => imgs.length === maxDoroCount;
  const addImage = () => {
    if (!isDoroMax()) {
      const img = React.createElement(Image);
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
};

export default App;
