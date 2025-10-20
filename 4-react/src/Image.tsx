import React, { useEffect, useState } from "react";

import { loadDoroAsync } from "./doroService";

const Image: React.FC = () => {
  const [doro, setDoro] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchDoro = async () => {
      const url = await loadDoroAsync();
      setDoro(url);
    };
    fetchDoro();
  }, [doro]);

  return <img src={doro} className={doro ? "loaded" : ""} alt="fallen-doro" />;
};

export default Image;
