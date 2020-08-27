import { useState, useEffect } from "react";

const useScrollPosition = () => {
  const [scrollPos, setScrollPos] = useState(window.pageYOffset);

  const onScroll = () => {
    setScrollPos(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  return scrollPos;
};

export default useScrollPosition;
