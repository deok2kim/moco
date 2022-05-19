import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { postState } from '../../states/posts';
import Loader from '../Loader';
import Post from './Post';

function PostContainer() {
  const { state, contents: post } = useRecoilValueLoadable(postState);
  return (
    <>
      {state === 'loading' && (
        <Loader type="spin" color="#FE9601" size="5rem" />
      )}
      {state === 'hasError' && <div>...Error</div>}
      {state === 'hasValue' && <Post post={post} key={post.index} />}
    </>
  );
}

export default PostContainer;
