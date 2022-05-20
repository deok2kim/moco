import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

import { useRecoilValue } from 'recoil';
import ChatRooms from './ChatRooms';
import ChatRoom from './ChatRoom';
import { chatLogState } from '../../states/chat';

const Wrapper = styled.div`
  /* padding: 10px; */
`;

function ChatContainer({ chatPublish }) {
  const chatLog = useRecoilValue(chatLogState);
  console.log('$ChatContainer');
  return (
    <Wrapper>
      <ChatRooms chatPublish={chatPublish} />
      <ChatRoom chatData={chatLog} chatPublish={chatPublish} />
    </Wrapper>
  );
}

export default React.memo(ChatContainer);

ChatContainer.defaultProps = {
  chatPublish: () => {},
};

ChatContainer.propTypes = {
  chatPublish: propTypes.func,
};
