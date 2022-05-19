import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { BiSubdirectoryLeft } from 'react-icons/bi';
import { useRecoilValue } from 'recoil';
import { userState } from '../../states/users';
import { chatLogState } from '../../states/chat';

const Wrapper = styled.div`
  height: 20%;
`;

const MessageDisplay = styled.div`
  height: 80%;
  overflow-y: scroll;
  padding: 0.2rem;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.me ? 'end' : 'start')};
`;

const Message = styled.p`
  font-size: 14px;
  background-color: #536469;
  border-radius: 0.3rem;
  margin: 3px 12px;
  padding: 0.3rem;
`;

const UserName = styled.p`
  font-size: 0.5rem;
  /* border-bottom: 1px solid #ff9e21; */
  margin: 5px 8px;
`;

const Time = styled.p`
  font-size: 0.5rem;
  margin: 3px 14px;
  color: #585e5e;
`;

const MessageInput = styled.div``;

const InputWrapper = styled.div`
  border: 1px solid black;
  display: flex;
  border-radius: 2px;
  width: 90%;
  margin: 0.5rem;
  background-color: ${props => props.color || 'rgb(234 234 234)'};
  justify-content: space-between;
`;

const Input = styled.input`
  height: 10%;
  border: none;
  background-color: transparent;
  &:focus {
    outline: none;
  }
  width: 100%;
`;

const SubmitButton = styled.button`
  border: none;
  background-color: transparent;
`;

function ChatRoom({ chatData, chatPublish }) {
  const user = useRecoilValue(userState);
  const [text, setText] = useState('');
  const [chat, setChat] = useState([]);

  console.log(chatData);

  // 스크롤 밑으로
  const scrollRef = useRef();

  const formatMessage = useCallback(() => {
    const formatChat = [];
    let AUserMessages = {
      userId: '',
      messages: [],
      time: '',
      idx: 0,
    };

    chatData.map(({ userId, message, time }, idx) => {
      if (!AUserMessages.userId) {
        AUserMessages = {
          userId,
          messages: [
            {
              message,
              idx: idx * 10000,
            },
          ],
          time,
          idx,
        };
      } else if (
        AUserMessages.userId === userId &&
        AUserMessages.time === time
      ) {
        AUserMessages.messages.push({
          message,
          idx: idx * 10000,
        });
      } else {
        formatChat.push({ ...AUserMessages });
        AUserMessages = {
          userId,
          messages: [
            {
              message,
              idx: idx * 10000,
            },
          ],
          time,
          idx,
        };
      }
      return null;
    });
    formatChat.push({ ...AUserMessages });
    console.log(formatChat);
    return formatChat;
  }, [chatData]);

  const onChange = e => {
    setText(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!user) {
      return;
    }
    // TODO: 채팅
    console.log(text, '채팅 보내기,');
    chatPublish(text);
    setText('');
  };
  useEffect(() => {
    setChat(formatMessage());
  }, [chatData]);

  useEffect(() => {
    console.log('unmounted');

    scrollRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }, []);
  console.log('$ChatRoom', chat);
  return (
    <Wrapper>
      <MessageDisplay ref={scrollRef}>
        {chat.map(({ userId, messages, time, idx: idx1 }) => (
          <MessageBox key={idx1} me={user === userId}>
            <UserName>{userId}</UserName>
            {messages.map(({ message, idx: idx2 }) => (
              <Message key={idx2}>{message}</Message>
            ))}
            <Time>{time}</Time>
          </MessageBox>
        ))}
      </MessageDisplay>
      <MessageInput>
        <form onSubmit={onSubmit}>
          <InputWrapper>
            <Input
              type="text"
              name="text"
              value={text}
              onChange={onChange}
              disabled={!user}
            />
            <SubmitButton>
              <BiSubdirectoryLeft />
            </SubmitButton>
          </InputWrapper>
        </form>
      </MessageInput>
    </Wrapper>
  );
}

export default React.memo(ChatRoom);

ChatRoom.defaultProps = {
  chatData: [],
  chatPublish: () => {},
};

ChatRoom.propTypes = {
  chatData: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  ),
  chatPublish: PropTypes.func,
};
