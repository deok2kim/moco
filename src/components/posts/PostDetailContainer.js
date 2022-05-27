import React from "react";
import { useRecoilValue } from "recoil";
import { postIdState } from "../../atoms/posts";
import usePost from "../../hook/usePost";
import Error from "../commons/Error";
import Loader from "../Loader";
import Post from "./PostDetail";

function PostDetailContainer() {
  const postId = useRecoilValue(postIdState);
  const { loading, data, error, refetch } = usePost({ id: postId });

  return (
    <>
      {loading && <Loader type="spin" color="#FE9601" />}
      {error && <Error />}
      {data && <Post post={data} />}
    </>
  );
}

export default PostDetailContainer;
