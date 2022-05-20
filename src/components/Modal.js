import styled, { keyframes } from 'styled-components';
import React, { useEffect, useRef, Suspense } from 'react';
import { useRecoilState } from 'recoil';
import { PropTypes } from 'prop-types';
import { isModalOpenState } from '../states/modal';
import Loader from './Loader';

// animations
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Section = styled.section`
  max-width: 450px;
  min-width: 300px;
  height: 80%;
  border-radius: 0.3rem;
  background-color: rgba(20, 20, 20, 1);
  /* opacity: 1; */
  /* 팝업이 열릴때 스르륵 열리는 효과 */
  animation: ${props => (props.isModalOpen ? fadeIn : fadeOut)} 0.2s ease-out;
  overflow: hidden;
  border: 1px solid orange;
`;

const Header = styled.header`
  position: relative;
  padding: 16px 64px 16px 16px;
  /* background-color: #f1f1f1; */
  font-weight: 700;
  /* color: black; */
`;

const HeaderClose = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  font-size: 21px;
  font-weight: 700;
  text-align: center;
  color: #999;
  background-color: transparent;
  //
  border: none;
  cursor: pointer;
`;

const Main = styled.main`
  padding: 16px;
  /* border-bottom: 1px solid #dee2e6; */
  border-top: 1px solid #dee2e6;
  overflow-y: auto;
  /* height: 90%; */
  ::-webkit-scrollbar {
    display: none;
  }
`;

// const Footer = styled.footer`
//   padding: 12px 16px;
//   text-align: right;
// `;

// const FooterButton = styled.button`
//   padding: 6px 12px;
//   color: #fff;
//   background-color: #6c757d;
//   border-radius: 5px;
//   font-size: 13px;
//   border: none;
//   cursor: pointer;
// `;

function Modal({ component, header }) {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);

  const ref = useRef();
  const onClose = () => {
    setIsModalOpen(false);
  };
  const onClickModalOutside = e => {
    if (!ref.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', onClickModalOutside);
    return () => {
      document.removeEventListener('mousedown', onClickModalOutside);
    };
  });

  return (
    <Wrapper>
      <Section isModalOpen={isModalOpen} ref={ref}>
        <Header>
          {header}
          <HeaderClose onClick={onClose}>&times;</HeaderClose>
        </Header>
        <Main>{component}</Main>
        {/* <Footer>
          <FooterButton type="button" onClick={onClose}>
            Close
          </FooterButton>
        </Footer> */}
      </Section>
    </Wrapper>
  );
}

export default Modal;

Modal.defaultProps = {
  component: <div>...Loading</div>,
  header: '로딩중',
};

Modal.propTypes = {
  component: PropTypes.element,
  header: PropTypes.string,
};
