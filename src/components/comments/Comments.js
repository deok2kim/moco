import React from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

function Comments({ comments }) {
  return (
    <>
      {comments.map((comment) => (
        <CommentItem comment={comment} key={comment.id} />
      ))}
    </>
  );
}

export default Comments;

Comments.defaultProps = {
  comments: [],
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    )
  ),
};
