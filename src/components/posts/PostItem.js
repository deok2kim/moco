import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0.8rem 1rem;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`;

const Title = styled.p`
  font-size: 1rem;
  text-align: start;
`;

function PostItem({ post }) {
  return (
    <Wrapper>
      <Title>
        {post.id}. {post.title}
      </Title>
    </Wrapper>
  );
}

export default React.memo(PostItem);

PostItem.defaultProps = {
  post: {},
  // onToggleModal: () => {},
};

PostItem.propTypes = {
  post: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  // onToggleModal: PropTypes.func,
};