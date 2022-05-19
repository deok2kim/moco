import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { commentsState } from '../../states/posts';
import Loader from '../Loader';
import CommentForm from './CommentForm';
import Comments from './Comments';

function CommentsContainer() {
  console.log('$CommentsContainer');
  const { state, contents: comments } = useRecoilValueLoadable(commentsState);
  console.log(state, comments);
  return (
    <>
      <CommentForm />
      {state === 'loading' && <Loader type="spin" color="#FE9601" />}
      {state === 'hasError' && <div>...Error</div>}
      {state === 'hasValue' && <Comments comments={comments} />}
    </>
  );
}

export default CommentsContainer;
