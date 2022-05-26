import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { getPosts } from "../api/posts";
import { postsState } from "../atoms/posts";

export default function usePosts() {
  const [{ loading, data, error }, set] = useRecoilState(postsState);

  const fetchData = useCallback(async () => {
    set({ loading: true, data: null, error: null });
    try {
      const posts = await getPosts();
      set({ loading: false, data: posts, error: null });
    } catch (e) {
      set({ loading: false, data: null, error: e });
    }
  }, [set]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    loading,
    data,
    error,
    refetch: fetchData,
  };
}
