// src/hooks/useFetch.js
import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (url, token = null, method = "GET", body = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const config = {
          method,
          url,
          headers: {
            "Content-Type": "application/json",
          },
          data: body,
        };

        if (token) {
          config.headers["Authorization"] = `Token ${token}`;
        }

        const res = await axios(config);
        setData(res.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body, token]);

  return { data, error, loading };
};

export default useFetch;
