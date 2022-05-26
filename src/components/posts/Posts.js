import PropTypes from "prop-types";
import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { currentPostIdState } from "../../states/posts";
import PostItem from "./PostItem";

// const Wrapper = styled.div`
//   margin: 0.8rem 1rem;
//   cursor: pointer;
//   &:hover {
//     font-weight: bold;
//   }
// `;

// const Title = styled.p`
//   font-size: 1rem;
//   text-align: start;
// `;

function Posts({ posts }) {
  console.log("$Posts");
  // const setCurrentPostId = useSetRecoilState(currentPostIdState);
  // const setIsModalOpen = useSetRecoilState(isModalOpenState);

  // const onClick = () => {
  //   if (post.index) {
  //     setCurrentPostId(post.index);
  //     onToggleModal("post");
  //   }
  // };
  return (
    <>
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </>
  );
}

export default React.memo(Posts);

Posts.defaultProps = {
  posts: {},
  // onToggleModal: () => {},
};

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    )
  ),
  // onToggleModal: PropTypes.func,
};
