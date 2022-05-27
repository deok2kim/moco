import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CommentsContainer from "../comments/CommentsContainer";

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

function Post({ post }) {
  return (
    <Wrapper>
      <Title>{post.title}</Title>
      <UserAndCreateDate>
        작성자: {post.userId}, 작성일시: '2022-05-27'
      </UserAndCreateDate>
      <Content>
        <span>{post.body}</span>
      </Content>
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
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
};
