import { useEffect, useState } from "react";

export const useFetch = (url, initialValue) => {
  const [result, setResult] = useState(initialValue);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
      });
  }, []);

  return result;
};
