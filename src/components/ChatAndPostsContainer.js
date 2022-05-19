import React, { useState } from 'react';
import styled from 'styled-components';

import ChatContainer from './chat/ChatContainer';
import PostsContainer from './posts/PostsContainer';

const Wrapper = styled.div`
  padding: 1rem;
  /* background-color: inherit; */
  height: 95%;
`;

const Tabs = styled.div`
  border-bottom: none;
  display: flex;
  cursor: pointer;
`;

const Tab = styled.div`
  border: 1px solid red;
  border-bottom: ${props => props.active && 'none'};
  width: 100%;
  text-align: center;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${props => (props.active ? 'inherit' : 'gray')};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border: 1px solid red;
  border-top: none;
  height: 100%;
  /* padding-bottom: 5rem; */
`;

function ChatAndPostsContainer() {
  const [activeTab, setActiveTab] = useState('chat');

  const onChangeTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  return (
    <Wrapper>
      <Tabs>
        <Tab active={activeTab === 'chat'} onClick={() => onChangeTab('chat')}>
          Chat
        </Tab>
        <Tab
          active={activeTab === 'posts'}
          onClick={() => onChangeTab('posts')}
        >
          Posts
        </Tab>
      </Tabs>
      <Content>
        {activeTab === 'chat' ? <ChatContainer /> : <PostsContainer />}
      </Content>
    </Wrapper>
  );
}

export default ChatAndPostsContainer;
