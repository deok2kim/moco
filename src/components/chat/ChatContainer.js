import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

import ChatRooms from './ChatRooms';
import ChatRoom from './ChatRoom';

const Wrapper = styled.div`
  /* padding: 10px; */
`;

const chatData = [
  {
    userId: 1,
    message: 'Hi',
    time: '11:26',
  },
  {
    userId: 1,
    message: 'My',
    time: '11:26',
  },
  {
    userId: 1,
    message: 'Name',
    time: '11:26',
  },
  {
    userId: 2,
    message: 'Hello',
    time: '11:26',
  },
  {
    userId: 1,
    message: 'is',
    time: '11:26',
  },
  {
    userId: 3,
    message: 'Hello2',
    time: '11:26',
  },
  {
    userId: 3,
    message: 'Hello3',
    time: '11:26',
  },
  {
    userId: 3,
    message: 'Hello4',
    time: '11:27',
  },
  {
    userId: 2,
    message: 'Hello5',
    time: '11:29',
  },
  {
    userId: 2,
    message: 'Hello6',
    time: '11:29',
  },
  {
    userId: 2,
    message: 'Hello7',
    time: '11:29',
  },
  {
    userId: 2,
    message: 'Hello8',
    time: '11:29',
  },
  {
    userId: 2,
    message: 'Hello8',
    time: '11:29',
  },
  {
    userId: 2,
    message: 'Hello8',
    time: '11:29',
  },
  {
    userId: 2,
    message: 'Hello8',
    time: '11:29',
  },
  {
    userId: 2,
    message: 'Hello8',
    time: '11:29',
  },
];

function ChatContainer() {
  console.log('$ChatContainer');
  return (
    <Wrapper>
      <ChatRooms />
      <ChatRoom chatData={chatData} />
    </Wrapper>
  );
}

export default React.memo(ChatContainer);
