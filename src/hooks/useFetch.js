import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (method, url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios({
          method: method.toLowerCase(),
          url,
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    console.log("hook data", data);
    fetchData();
  }, [method, url]);

  return { data, loading, error, setData };
};

export default useFetch;
