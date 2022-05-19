import React, { useState } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { apiCreateBoard } from '../../utils/api';
import { userState } from '../../states/users';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 300px;
`;

const InputWrapper = styled.div`
  /* border: 1px solid black; */
  border-radius: 5px;
  width: 80%;
  margin: 0.5rem;
  background-color: ${props => props.color || 'rgb(234 234 234)'};
`;

const Input = styled.input`
  width: 90%;
  border: none;
  background-color: transparent;
  &:focus {
    outline: none;
  }
  margin: auto;
`;
const Textarea = styled.textarea`
  border: none;
  background-color: transparent;
  &:focus {
    outline: none;
  }
  resize: none;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
`;

const Footer = styled.footer`
  padding: 12px 16px;
  text-align: right;
`;

const FooterButton = styled.button`
  padding: 6px 12px;
  color: #fff;
  background-color: #6c757d;
  border-radius: 5px;
  font-size: 13px;
  border: none;
  cursor: pointer;
`;

function PostForm() {
  const [inputs, setInputs] = useState({
    title: '',
    contents: '',
  });

  const { title, contents } = inputs;
  const currentUser = useRecoilValue(userState);
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log('CREATE POST!');
    // TODO: API 요청
    // 후 종료 (글 작성 완료 메시지?)
    // {
    //   "title": "제목제2222목제목",
    //   "contents": "내용물내용물222222내용물",
    //   "type": "1",
    //   "userid": "myid1"
    //   }
    apiCreateBoard(
      {
        title,
        contents,
        type: 1,
        userid: currentUser,
      },
      'community',
    );
  };

  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        <InputWrapper>
          <Input
            name="title"
            value={title}
            type="text"
            onChange={onChange}
            placeholder="제목"
          />
        </InputWrapper>
        <InputWrapper>
          <Textarea
            name="contents"
            rows={10}
            onChange={onChange}
            value={contents}
            placeholder="내용"
          />
        </InputWrapper>
        <Footer>
          <FooterButton>CREATE</FooterButton>
          {/* <FooterButton>CLOSE</FooterButton> */}
        </Footer>
      </form>
    </Wrapper>
  );
}

export default PostForm;
