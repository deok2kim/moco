import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import Posts from "./Posts";
// import Pagination from "./Pagination";

import { isModalOpenState } from "../../states/modal";
import Loader from "../Loader";
import usePosts from "../../hook/usePosts";
import { postIdState } from "../../atoms/posts";
import Error from "../commons/Error";

const Wrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
  overflow-x: none;
  display: flex;
  flex-direction: column;
  ::-webkit-scrollbar {
    display: none;
  }
`;

function PostsContainer() {
  const setIsModalOpen = useSetRecoilState(isModalOpenState);
  const setPostId = useSetRecoilState(postIdState);
  const { data, loading, error, refetch } = usePosts();

  const onToggleModalForPost = ({ target, postId }) => {
    setIsModalOpen((prev) => target);
    setPostId(postId);
  };

  return (
    <Wrapper>
      {loading && <Loader type="spin" color="#FE9601" />}
      {error && <Error />}
      {data && (
        <Posts posts={data} onToggleModalForPost={onToggleModalForPost} />
      )}
    </Wrapper>
  );
}

export default React.memo(PostsContainer);
