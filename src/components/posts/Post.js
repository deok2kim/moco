import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CommentsContainer from '../comments/CommentsContainer';
import CommentForm from '../comments/CommentForm';

const Wrapper = styled.div`
  /* background-color: black; */
  text-align: start;
`;

const Title = styled.p`
  font-size: 1.5rem;
  margin: 0.5rem;
`;

const UserAndCreateDate = styled.p`
  font-size: 0.5rem;
  margin: 0.5rem;
`;

const Content = styled.p`
  font-size: 1rem;
  margin: 0.5rem;
`;

const Like = styled.div`
  margin: 0.5rem;
`;

function Post({ post }) {
  console.log('$Post');
  const onToggleLike = isLike => {
    if (isLike) {
      // /board/addLike
      console.log('좋아요');
    } else {
      // /board/addDisLike
      console.log('싫어요');
    }
  };
  console.log(post);
  return (
    <Wrapper>
      <Title>
        {post.id}: {post.title}{' '}
      </Title>
      <UserAndCreateDate>작성자: {post.userId}, 작성일시: X</UserAndCreateDate>
      <Content>
        <span>{post.body}</span>
      </Content>
      <Like>
        <button type="button" onClick={() => onToggleLike(true)}>
          🤍
        </button>
        <button type="button" onClick={() => onToggleLike(false)}>
          💔
        </button>
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
