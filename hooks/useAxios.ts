import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const useAxios = (url: string, method: string, payload?: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const controllerRef = useRef(new AbortController());

  const cancel = () => {
    controllerRef.current.abort();
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.request({
          data: payload,
          signal: controllerRef.current.signal,
          method,
          url,
        });

        setData(response.data);
      } catch (error: any) {
        setError(error?.message || 'Unknown error');
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  return { cancel, data, error, loaded };
};

export default useAxios;
