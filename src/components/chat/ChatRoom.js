import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { BiSubdirectoryLeft } from 'react-icons/bi';

const Wrapper = styled.div`
  height: 35%;
`;

const MessageDisplay = styled.div`
  height: 80%;
  overflow-y: scroll;
  padding: 0.2rem;
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.me ? 'end' : 'start')};
`;

const Message = styled.p`
  font-size: 0.5rem;
  background-color: brown;
  border-radius: 0.3rem;
  margin: 0.1rem;
  padding: 0.2rem;
`;

const UserName = styled.p`
  font-size: 0.5rem;
  border-top: 1px solid blue;
`;

const Time = styled.p`
  font-size: 0.3rem;
`;

const MessageInput = styled.div``;

const InputWrapper = styled.div`
  /* border: 1px solid black; */
  display: flex;
  border-radius: 5px;
  width: 80%;
  margin: 0.5rem;
  background-color: ${props => props.color || 'rgb(234 234 234)'};
  justify-content: space-between;
`;

const Input = styled.input`
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

function ChatRoom({ chatData }) {
  const [currentUser, setCurrentUser] = useState(2);
  const [text, setText] = useState('');
  const [chat, setChat] = useState([]);

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
    // TODO: 채팅
    console.log(text, '채팅 보내기,');
    setText('');
  };

  useEffect(() => {
    console.log('unmounted');
    setChat(formatMessage());
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
          <MessageBox key={idx1} me={currentUser === userId}>
            <UserName>{userId} 번 유저</UserName>
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
            <Input type="text" name="text" value={text} onChange={onChange} />
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
};

ChatRoom.propTypes = {
  chatData: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  ),
};
