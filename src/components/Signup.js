import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { isModalOpenState } from '../states/modal';
import { LoginState, userState } from '../states/users';
import { apiLogin, apiSignup } from '../utils/api';

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
`;

function Signup() {
  const setIsModalOpen = useSetRecoilState(isModalOpenState);
  const setUser = useSetRecoilState(userState);
  const setIsLoggedIn = useSetRecoilState(LoginState);

  console.log('$SIGNUP');
  const [inputs, setInputs] = useState({
    id: '',
    pw: '',
    pw2: '',
    userName: '',
  });

  const { id, pw, pw2, userName } = inputs;

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const login = async () => {
    console.log('로그인요청!', id, pw);
    const response = await apiLogin({ userid: id, password: pw });
    const { userid: userId, accessToken: token } = response.data;
    localStorage.setItem('token', JSON.stringify({ userId, token }));
    setUser(userId);
    setIsLoggedIn(true);
    setIsModalOpen('');
    console.log(response);
  };

  const signUp = async () => {
    if (pw !== pw2) {
      console.log('비밀번호 확인');
    } else {
      console.log('회원가입요청!', id, pw, userName);
      const resposne = await apiSignup({
        userid: id,
        password: pw,
        name: userName,
      });
      if (resposne.status === 200) {
        alert('회원가입 완료 후 자동으로 로그인 ㄱ');
        login();
        setIsModalOpen('');
      }
      console.log(resposne);
    }
  };

  return (
    <Wrapper>
      <InputWrapper>
        <Input placeholder="아이디" value={id} name="id" onChange={onChange} />
      </InputWrapper>
      <InputWrapper>
        <Input
          placeholder="비밀번호"
          value={pw}
          name="pw"
          onChange={onChange}
          type="password"
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          placeholder="비밀번호2"
          value={pw2}
          name="pw2"
          onChange={onChange}
          type="password"
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          placeholder="이름"
          value={userName}
          name="userName"
          onChange={onChange}
          type="text"
        />
      </InputWrapper>
      <InputWrapper color="orange">
        <Button onClick={signUp}>회원가입</Button>
      </InputWrapper>
    </Wrapper>
  );
}

export default Signup;
