import PropTypes from 'prop-types';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
// import { isModalOpenState } from "../states/modal";
import { currentPostIdState } from '../../states/posts';

const Wrapper = styled.div`
  margin: 1rem;
  border-bottom: 1px solid gray;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`;

const Title = styled.p`
  font-size: 1rem;
  text-align: start;
`;
function Posts({ post, onToggleModal }) {
  console.log('$Posts');
  const setCurrentPostId = useSetRecoilState(currentPostIdState);
  // const setIsModalOpen = useSetRecoilState(isModalOpenState);

  const onClick = () => {
    if (post.id) {
      setCurrentPostId(post.id);
      onToggleModal('post');
    }
  };
  return (
    <Wrapper>
      <Title type="button" onClick={onClick}>
        {post.id}. {post.title}
      </Title>
    </Wrapper>
  );
}

export default React.memo(Posts);

Posts.defaultProps = {
  post: {},
  onToggleModal: () => {},
};

Posts.propTypes = {
  post: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
  onToggleModal: PropTypes.func,
};
