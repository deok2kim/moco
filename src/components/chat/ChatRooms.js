import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 30%;
  overflow-y: scroll;
  margin: 1rem 0;
  border-bottom: 1px solid #585e5e;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ChatRoom = styled.li`
  display: flex;
  list-style: none;
  margin: 0.5rem 15px;
  cursor: pointer;
  font-size: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #585e5e;

  &:hover {
    font-weight: bold;
  }
`;

function ChatRooms() {
  return (
    <Wrapper>
      <ul style={{ margin: 0 }}>
        <ChatRoom>비트코인</ChatRoom>
        <ChatRoom>이더리움</ChatRoom>
        <ChatRoom>리플</ChatRoom>
        <ChatRoom>라이트코인</ChatRoom>
        <ChatRoom>도지</ChatRoom>
        <ChatRoom>이오스</ChatRoom>
        <ChatRoom>비트코인</ChatRoom>
        <ChatRoom>이더리움</ChatRoom>
        <ChatRoom>리플</ChatRoom>
        <ChatRoom>라이트코인</ChatRoom>
        <ChatRoom>도지</ChatRoom>
        <ChatRoom>이오스</ChatRoom>
        <ChatRoom>비트코인</ChatRoom>
        <ChatRoom>이더리움</ChatRoom>
        <ChatRoom>리플</ChatRoom>
        <ChatRoom>라이트코인</ChatRoom>
        <ChatRoom>도지</ChatRoom>
        <ChatRoom>이오스</ChatRoom>
        <ChatRoom>비트코인</ChatRoom>
        <ChatRoom>이더리움</ChatRoom>
        <ChatRoom>리플</ChatRoom>
        <ChatRoom>라이트코인</ChatRoom>
        <ChatRoom>도지</ChatRoom>
        <ChatRoom>이오스</ChatRoom>
      </ul>
    </Wrapper>
  );
}

export default React.memo(ChatRooms);
