import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { isModalOpenState } from '../states/modal';
import Signup from './Signup';

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
  padding: 0.5rem;
  margin: 0.3rem;
  background-color: ${props => props.color || 'rgb(234 234 234)'};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  width: 100%;
  cursor: pointer;
`;

const SignupText = styled.p`
  text-align: end;
  color: blue;
  cursor: pointer;
`;
function Login() {
  console.log('$LOGIN');
  const setIsModalOpen = useSetRecoilState(isModalOpenState);
  const [inputs, setInputs] = useState({
    id: '',
    pw: '',
  });

  const { id, pw } = inputs;

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const login = () => {
    console.log('로그인요청!', id, pw);
  };

  const onOpenSignupModal = () => {
    setIsModalOpen('signup');
  };

  return (
    <Wrapper>
      <InputWrapper>
        <Input placeholder="아이디" value={id} name="id" onChange={onChange} />
      </InputWrapper>
      <InputWrapper>
        <Input
          placeholder="비밀버호"
          value={pw}
          name="pw"
          onChange={onChange}
          type="password"
        />
      </InputWrapper>
      <InputWrapper color="orange">
        <Button type="button" onClick={login}>
          로그인
        </Button>
      </InputWrapper>
      <SignupText onClick={onOpenSignupModal}>회원가입</SignupText>
    </Wrapper>
  );
}

export default Login;
