import PropTypes from "prop-types";
import React from "react";
import PostItem from "./PostItem";

function Posts({ posts, onToggleModalForPost }) {
  return (
    <>
      {posts.map((post) => (
        <PostItem
          post={post}
          key={post.id}
          onToggleModalForPost={onToggleModalForPost}
        />
      ))}
    </>
  );
}

export default React.memo(Posts);

Posts.defaultProps = {
  posts: {},
  onToggleModalForPost: () => {},
};

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    )
  ),
  onToggleModalForPost: PropTypes.func,
};
