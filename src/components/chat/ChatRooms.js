import React from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { chatLogState, chatRoomsState, chatRoomState } from '../../states/chat';
import { userState } from '../../states/users';

const Wrapper = styled.div`
  height: 44vh;
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
  color: ${props => props.active && 'green'};
  &:hover {
    font-weight: bold;
  }
`;

function ChatRooms({ chatPublish }) {
  const user = useRecoilValue(userState);
  const [chatRoom, setChatRoom] = useRecoilState(chatRoomState);
  const chatRooms = useRecoilValue(chatRoomsState);
  const resetChatLog = useResetRecoilState(chatLogState);

  const changeRoom = symbol => {
    if (chatRoom !== symbol) {
      chatPublish(`${user}님이 나갔습니다.`);
      console.log(symbol, '채팅방 입장');
      setChatRoom(symbol);
      resetChatLog();
    }
  };
  return (
    <Wrapper>
      <ul style={{ margin: 0 }}>
        {chatRooms.map(room => (
          <ChatRoom
            key={room.type}
            active={room.symbol === chatRoom}
            onClick={() => changeRoom(room.symbol)}
          >
            {room.name}
          </ChatRoom>
        ))}
      </ul>
    </Wrapper>
  );
}

export default React.memo(ChatRooms);
ChatRooms.defaultProps = {
  chatPublish: () => {},
};

ChatRooms.propTypes = {
  chatPublish: PropTypes.func,
};
