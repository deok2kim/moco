import React from "react";
import { useRecoilValueLoadable } from "recoil";
import { commentsState } from "../../atoms/comments";
import Error from "../commons/Error";
import Loader from "../Loader";
import CommentForm from "./CommentForm";
import Comments from "./Comments";

function CommentsContainer() {
  const { state, contents: comments } = useRecoilValueLoadable(commentsState);
  return (
    <>
      <CommentForm />
      {state === "loading" && <Loader type="spin" color="#FE9601" />}
      {state === "hasError" && <Error />}
      {state === "hasValue" && <Comments comments={comments} />}
    </>
  );
}

export default CommentsContainer;
