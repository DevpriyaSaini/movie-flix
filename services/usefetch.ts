import { useEffect, useState, useCallback } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<Error | null>(null);

 const fetchData = useCallback(async () => {
  try {
    setLoading(true);
    setError(null);

    console.log("Calling fetchFunction..."); // 👀 log before
    const result = await fetchFunction();
    console.log("Fetched result:", result); // 👀 log after
    setData(result);

  } catch (err) {
    console.error("Fetch failed:", err);
    setError(err as Error);
  } finally {
    console.log("Fetch finished ✅");
    setLoading(false);
  }
}, [fetchFunction]);

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
