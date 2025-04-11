import { useEffect } from "react";

const useKeyboardEnter = (ref, callback) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === "Enter") {
        event.preventDefault();
        callback?.();
      }
    };

    const node = ref?.current;
    if (node) {
      node.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (node) {
        node.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [ref, callback]);
};

export default useKeyboardEnter;
