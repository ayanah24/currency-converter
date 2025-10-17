import { useEffect, useState } from "react";

function useCurrencyInfo(base = "usd") {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true); 
// 'loading' is a boolean state used to indicate whether the API call is currently in progress.
//which prevents blank screen and undefined errors 

  useEffect(() => {
    if (!base) return;
    const curr = base.toLowerCase();

    const url = `https://open.er-api.com/v6/latest/${curr}`; 

    setLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (json && json.result === "success") {
          setData(json.rates);
        } else {
          console.warn("Invalid currency data for:", curr);
          setData({});
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setData({});
      })
      .finally(() => setLoading(false));
  }, [base]);

  return { data, loading };
}

export default useCurrencyInfo;
