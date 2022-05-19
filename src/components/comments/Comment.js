import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { CgProfile } from 'react-icons/cg';

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

function Comment({ comment }) {
  const { boardid, index, userid, useyn, replycontent, createdt } = comment;
  return (
    <Wrapper>
      <ProfileWrapper>
        <ProfileImg>
          <CgProfile size="2rem" />
        </ProfileImg>
        <Name>{userid}</Name>
      </ProfileWrapper>
      <ContentWrapper>
        <Content>{replycontent}</Content>
        <CommentEtcInfo>{createdt.split('T').join(' ')}</CommentEtcInfo>
      </ContentWrapper>
    </Wrapper>
  );
}

export default React.memo(Comment);

Comment.defaultProps = {
  comment: {},
};

Comment.propTypes = {
  comment: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
};
