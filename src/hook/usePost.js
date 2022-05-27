import { useCallback } from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getPost } from "../api/posts";
import { postState } from "../atoms/posts";

export default function usePost({ id }) {
  const [{ loading, data, error }, set] = useRecoilState(postState);

  const fetchData = useCallback(async () => {
    set({ loading: true, data: null, error: null });
    try {
      const post = await getPost(id);
      set({ loading: false, data: post, error: null });
    } catch (e) {
      set({ loading: false, data: null, error: e });
    }
  }, [id, set]);

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
