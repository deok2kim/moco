import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import CommentsContainer from '../comments/CommentsContainer';
import { apiToggleLikeBoard } from '../../utils/api';

const Wrapper = styled.div`
  text-align: start;
`;

const Title = styled.p`
  font-size: 1.5rem;
  margin: 1rem;
`;

const UserAndCreateDate = styled.p`
  font-size: 0.5rem;
  margin: 1rem;
`;

const Content = styled.p`
  font-size: 1rem;
  margin: 1rem;
`;

const Like = styled.div`
  margin: 1rem;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  color: white;
  cursor: pointer;
`;

function Post({ post }) {
  console.log('$Post');
  const onToggleLike = isLike => {
    if (isLike) {
      // /board/addLike
      console.log('좋아요');
      apiToggleLikeBoard({ index: post.id }, 'addLike');
    } else {
      // /board/addDisLike
      console.log('싫어요');
      apiToggleLikeBoard({ index: post.id }, 'addDisLike');
    }
  };
  console.log(post);
  return (
    <Wrapper>
      <Title>{post.title}</Title>
      <UserAndCreateDate>
        작성자: {post.userId}, 작성일시: {post.createdt}
      </UserAndCreateDate>
      <Content>
        <span>{post.contents}</span>
      </Content>
      <Like>
        <Button type="button" onClick={() => onToggleLike(true)}>
          <AiFillLike /> {post.conlike}
        </Button>
        <Button type="button" onClick={() => onToggleLike(false)}>
          <AiFillDislike /> {post.condislike}
        </Button>
      </Like>
      <hr />
      <CommentsContainer />
    </Wrapper>
  );
}

export default Post;

Post.defaultProps = {
  post: {},
};

Post.propTypes = {
  post: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
};
