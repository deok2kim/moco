import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
// import styled from 'styled-components';
import { commentsState } from '../../states/posts';
import CommentForm from './CommentForm';
import Comments from './Comments';

function CommentsContainer() {
  console.log('$CommentsContainer');
  const { state, contents: comments } = useRecoilValueLoadable(commentsState);
  console.log(state, comments);
  return (
    <>
      <CommentForm />
      {state === 'loading' && <div>...Loading</div>}
      {state === 'hasError' && <div>...Error</div>}
      {state === 'hasValue' && <Comments comments={comments} />}
    </>
  );
}

export default CommentsContainer;
