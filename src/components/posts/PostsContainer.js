import React, { useState } from 'react';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import Posts from './Posts';
import Pagination from './Pagination';

import { isModalOpenState } from '../../states/modal';
import { postsState } from '../../states/posts';

const Wrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
  overflow-x: none;
`;

function PostsContainer() {
  console.log('$PostsContainer');
  const { state, contents: posts } = useRecoilValueLoadable(postsState);
  // const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [postLength, setPostLength] = useState(1);

  const setIsModalOpen = useSetRecoilState(isModalOpenState);

  const onToggleModal = target => {
    console.log('POST MODAL OPEN');
    setIsModalOpen(prev => target);
  };

  // console.log(page);
  // const getPosts = async () => {
  //   const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  //   // TODO: 뒤에 파라미터로 페이지 번호와 페이지당 게시물 수를 넘겨야한다.
  //   const json = await response.json();
  //   setPosts(json);
  //   setPostLength(json.length);
  // };

  // useEffect(() => {
  //   getPosts();
  // }, []);
  console.log(posts);
  return (
    <Wrapper>
      <button type="button" onClick={() => onToggleModal('createPost')}>
        글쓰기
      </button>
      {state === 'loading' && <div>...Loading</div>}
      {state === 'hasError' && <div>...Error</div>}
      {state === 'hasValue' && (
        <>
          <ul style={{ margin: 0 }}>
            {posts.map(post => (
              <Posts key={post.id} post={post} onToggleModal={onToggleModal} />
            ))}
          </ul>
          {/* <Pagination
            total={posts.length}
            limit={20}
            page={page} // 현재페이지
            setPage={setPage}
          /> */}
        </>
      )}
    </Wrapper>
  );
}

export default React.memo(PostsContainer);
