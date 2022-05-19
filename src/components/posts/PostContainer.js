import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { postState } from '../../states/posts';
import Post from './Post';

function PostContainer() {
  const { state, contents: post } = useRecoilValueLoadable(postState);
  return (
    <>
      {state === 'loading' && <div>...Loading</div>}
      {state === 'hasError' && <div>...Error</div>}
      {state === 'hasValue' && <Post post={post} key={post.id} />}
    </>
  );
}

export default PostContainer;
