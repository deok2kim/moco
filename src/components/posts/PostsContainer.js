import React, { useState } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import styled from "styled-components";
import Posts from "./Posts";
// import Pagination from "./Pagination";

// import { isModalOpenState } from "../../states/modal";
// import { postsState } from "../../states/posts";
// import { LoginState } from "../../states/users";
import Loader from "../Loader";
import usePosts from "../../hook/usePosts";

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

const Button = styled.button`
  margin: 1rem;
  width: 20%;
  border-radius: 5px;
  background-color: transparent;
  color: #06da25;
  border: 1px solid #06da25;
`;

function PostsContainer() {
  console.log("$PostsContainer!@#$");
  // const { state, contents: posts } = useRecoilValueLoadable(postsState);
  // const [posts, setPosts] = useState([]);
  // const [page, setPage] = useState(1);
  // const [postLength, setPostLength] = useState(1);

  // refac
  const { data, loading, error, refetch } = usePosts();

  // 로그인 상태
  // const isLoggedIn = useRecoilValue(LoginState);

  // const setIsModalOpen = useSetRecoilState(isModalOpenState);

  // const onToggleModal = (target) => {
  //   if (!isLoggedIn) {
  //     alert("로그인 후 이용해주세요.");
  //     return;
  //   }
  //   console.log("POST MODAL OPEN");
  //   setIsModalOpen((prev) => target);
  // };

  // console.log(data, loading, error, refetch);
  // if (loading) return <div>loading</div>;
  // if (error) return <div>error</div>;
  // if (data) return <div>data</div>;

  // console.log(posts);
  return (
    <Wrapper>
      {/* <Button onClick={() => onToggleModal("createPost")}>+ Add</Button>
      {state === "loading" && <Loader type="spin" color="#FE9601" />}
      {state === "hasError" && <div>...Error</div>}
      {state === "hasValue" && (
        <>
          <ul style={{ margin: 0 }}>
            {posts.map((post) => (
              <Posts
                key={post.index}
                post={post}
                onToggleModal={onToggleModal}
              />
            ))}
          </ul>
        </>
      )} */}
      {loading && <Loader type="spin" color="#FE9601" />}
      {error && <div>Error</div>}
      {data && <Posts posts={data} />}
    </Wrapper>
  );
}

export default React.memo(PostsContainer);
