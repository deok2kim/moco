import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { CgProfile } from "react-icons/cg";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid gray;
  padding: 1rem 0;
`;

const ProfileWrapper = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileImg = styled.div``;

const Name = styled.p``;

const ContentWrapper = styled.div`
  width: 70%;
`;

const Content = styled.p`
  margin: 0.5rem;
`;

const CommentEtcInfo = styled.div`
  margin: 0.5rem;
`;

function ComentItem({ comment }) {
  const { id, postId, name, email, body } = comment;
  return (
    <Wrapper>
      <ProfileWrapper>
        <ProfileImg>
          <CgProfile size="2rem" />
        </ProfileImg>
        <Name>{name.split(" ")[0]}</Name>
      </ProfileWrapper>
      <ContentWrapper>
        <Content>{body}</Content>
        <CommentEtcInfo>{email}</CommentEtcInfo>
      </ContentWrapper>
    </Wrapper>
  );
}

export default React.memo(ComentItem);

ComentItem.defaultProps = {
  comment: {},
};

ComentItem.propTypes = {
  comment: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
};
