import { useState, useEffect } from "react";

function useLocalStorage({ key, value = null }) {
  const initialValue = localStorage.getItem(key) || value;
  const [myThing, setMyThing] = useState(initialValue);

  useEffect(
    function storeInLocalStorage() {
      if (myThing === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, myThing);
      }
    },
    [key, myThing]
  );
  return [myThing, setMyThing];
}

export default useLocalStorage;
