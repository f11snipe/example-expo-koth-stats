import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export type ApiDataType = 'Box' | 'Player' | 'Game' | 'GamePlayer';

export interface BoxData {
  os: string;
}

export interface PlayerData {
  level: number;
  avatar: string;
  username: string;
  country: string;
}

export interface ApiData<T> {
  id: string | number;
  type: ApiDataType;
  attributes: T;
};

export interface ApiListResponse<T> {
  data: ApiData<T>[];
}

export interface ApiSingleResponse<T> {
  data: ApiData<T>;
}

export type ApiPlayerList = ApiListResponse<PlayerData>;
export type ApiPlayerSingle = ApiSingleResponse<PlayerData>;

export interface AxiosProps {
  url: string;
  method: string;
  payload?: string;
}

const useAxios = <T>(url: string, method: string, payload?: string) => {
  const [data, setData] = useState<T|null>(null);
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
