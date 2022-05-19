/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { GrLogin } from 'react-icons/gr';
import { isModalOpenState } from '../states/modal';
import { userState } from '../states/users';
import Login from './Login';
import Modal from './Modal';
import Signup from './Signup';
import PostContainer from './posts/PostContainer';

const Wrapper = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  background: #1d2124;
  height: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 10%;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const Logo = styled.h1`
  font-size: 40px;
  width: 90%;
  margin-left: 130px;
`;

function Navagation() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);
  const [user, setUser] = useRecoilState(userState);

  const toggleModal = target => {
    setIsModalOpen(target);
  };
  return (
    <Wrapper>
      <Logo>NIOC 433</Logo>
      <ButtonWrapper>
        {!user && (
          <Button type="button" onClick={() => toggleModal('login')}>
            <GrLogin size="2rem" />
          </Button>
        )}
      </ButtonWrapper>
      {isModalOpen === 'login' && (
        <Modal component={<Login />} header="로그인" />
      )}
      {isModalOpen === 'signup' && (
        <Modal component={<Signup />} header="회원가입" />
      )}
      {isModalOpen === 'post' && (
        <Modal component={<PostContainer />} header="게시글" />
      )}
    </Wrapper>
  );
}

export default Navagation;
