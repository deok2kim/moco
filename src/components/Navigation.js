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
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: end; */
  /* align-items: end; */
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  /* margin-right: 10px; */

  cursor: pointer;
`;
function Navagation() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);
  const [user, setUser] = useRecoilState(userState);

  const toggleModal = target => {
    setIsModalOpen(target);
  };
  return (
    <Wrapper>
      <div>로고</div>
      <div>로고</div>
      <div>로고</div>
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
