import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFetch = (
  url,
  options = {
    method: 'GET',
  }
) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const { data } = await axios(url, options);
      setData(data.data);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const repeat = useCallback(async (options) => {
    try {
      const { data } = await axios(url, options);
      setData((prev) => {
        const new_data = [...prev, ...data.data];
        // remove duplicates
        // ! some issue with the page formula in the backend, +- 1 element is repeated
        const unique = new_data.filter(
          (v, i, a) => a.findIndex((t) => t._id === v._id) === i
        );
        return unique;
      });
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return { data, error, loading, repeat, setData };
};

export default useFetch;
