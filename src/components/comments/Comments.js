import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

function Comments({ comments }) {
  console.log(comments);
  return (
    <>
      {comments.map(comment => (
        <Comment comment={comment} key={comment.index} />
      ))}
    </>
  );
}

export default Comments;

Comments.defaultProps = {
  comments: [],
};

Comments.propTypes = {
  comments: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
};
