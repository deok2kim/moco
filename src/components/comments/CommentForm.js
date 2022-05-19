import React, { useState } from 'react';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import styeld from 'styled-components';
import { commentsState, currentPostIdState } from '../../states/posts';
import { userState } from '../../states/users';
import { apiCreateBoard, apiCreateReply, apiFetchReply } from '../../utils/api';

const Wrapper = styeld.div`
  display: flex;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center
`;

const Form = styeld.textarea`
  background-color: transparent;
  &:focus {
    outline: 2px solid orange;
  }
  resize: none;
  width: 80%;
  margin: 0;
  color: white;
`;

const CreateButton = styeld.div`
  border: 1px solid black;
  border-radius: 5px;
  background-color: transparent;
  display: inline;
  cursor: pointer;
  padding: 0.5rem;
`;

function CommentForm() {
  const [replycontent, setReplycontent] = useState('');
  const currentPostId = useRecoilValue(currentPostIdState);
  const user = useRecoilValue(userState);
  const refreshComment = useRecoilRefresher_UNSTABLE(commentsState);
  console.log('$CommentForm');

  const onChange = e => {
    setReplycontent(e.target.value);
  };

  const onCreate = async () => {
    // 댓글 생성
    console.log('댓글 생성', replycontent);
    if (replycontent.trim() && user) {
      await apiCreateReply({
        boardid: currentPostId,
        userid: user,
        replycontent,
      });
      refreshComment();
    }
    setReplycontent('');
  };

  return (
    <Wrapper>
      <Form
        name="replycontent"
        value={replycontent}
        onChange={onChange}
        rows={5}
        disabled={!user}
      />
      <CreateButton onClick={onCreate}>등록</CreateButton>
    </Wrapper>
  );
}

export default CommentForm;
