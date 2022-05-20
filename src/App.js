import React, { Suspense, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
// import { io } from 'socket.io-client';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import * as SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import CandlestickChartContainer from './components/CandlestickChartContainer';
import CoinListContainer from './components/CoinListContainer';
import TransactionContainer from './components/TransactionContainer';
import OrderbookContainer from './components/OrderbookContainer';
import Navagation from './components/Navigation';
import {
  currentCoinState,
  tickerState,
  transactionState,
  currentCoinInfoState,
} from './states/state';
import Loader from './components/Loader';
import ChatAndPostsContainer from './components/ChatAndPostsContainer';
import { LoginState, userState } from './states/users';
import { chatLogState, chatRoomState } from './states/chat';

// const socket = io.connect('wss://wss1.bithumb.com/public');

function App() {
  const [socketConnected, setSocketConnected] = useState(false);
  const webSocketUrl = 'wss://wss1.bithumb.com/public';
  const ws = useRef(null);

  const currentCoin = useRecoilValue(currentCoinState);
  const setTransaction = useSetRecoilState(transactionState);
  const setTicker = useSetRecoilState(tickerState);
  const setCurrentCoinInfo = useSetRecoilState(currentCoinInfoState);
  const chatRoom = useRecoilValue(chatRoomState);
  const setChatLog = useSetRecoilState(chatLogState);

  const setIsLoggedIn = useSetRecoilState(LoginState);
  const [user, setUser] = useRecoilState(userState);

  // 채팅 웹소켓
  const client = useRef({});

  const chatSubscribe = async () => {
    console.log('구독');
    client.current.subscribe(`/topic/chat/room/${chatRoom}`, message => {
      console.log(message);
      const res = JSON.parse(message.body);
      console.log(res);
      const now = new Date();
      setChatLog(prev => [
        ...prev,
        {
          userId: res.sender,
          message: res.message,
          index: now.getTime(),
          time: `${now.getHours()}:${now.getMinutes()}`,
        },
      ]);
    });

    // 입장하기
    client.current.publish({
      destination: '/app/chat/message',
      body: JSON.stringify({
        type: 'ENTER',
        roomId: chatRoom,
        sender: user,
      }),
    });
  };
  const chatConnect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJS('/v2/ws/chat'),
      reconnectDelay: 10000,
      heartbeatIncoming: 8000,
      heartbeatOutgoing: 8000,
      onConnect: () => {
        chatSubscribe();
      },
      onStompError: frame => {
        console.error(frame);
      },
    });
    client.current.activate();
  };

  const chatDisconnect = () => {
    client.current.deactivate();
  };

  // 메시지 보내기
  const chatPublish = message => {
    if (!client.current.connected) {
      return;
    }
    client.current.publish({
      destination: '/app/chat/message',
      body: JSON.stringify({
        type: 'TALK',
        roomId: chatRoom,
        sender: user,
        message,
      }),
    });
  };

  useEffect(() => {
    chatConnect();

    return () => chatDisconnect();
  }, [user]);

  // 로그인 체크
  useEffect(() => {
    // 로그인 체크
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const { userId } = JSON.parse(storedToken);
      setIsLoggedIn(true);
      setUser(userId);
      // setUser
    }
  });

  // 코인 웹소켓 초기화
  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket(webSocketUrl);
      ws.current.onopen = () => {
        console.log(`CONNECTED TO ${webSocketUrl}`);
        setSocketConnected(true);
      };
      ws.current.onclose = error => {
        console.log(`DISCONNECT from ${webSocketUrl}`);
        console.log(error);
      };
      ws.current.onmessage = e => {
        const data = JSON.parse(e.data);
        // console.log(data);
        if (data.subtype === 'tr') {
          // transaction
          setTransaction(prev => [
            ...prev.slice(1, 30),
            {
              crncCd: data.content.m,
              coinType: data.content.c,
              buySellGb: data.content.l[0].o,
              contPrice: data.content.l[0].p,
              contQty: data.content.l[0].q,
              contAmt: data.content.l[0].n,
              contDtm: data.content.l[0].t,
            },
          ]);
        } else if (data.subtype === 'tk') {
          const coinData = {
            // buyVolume: "3417.18586078",
            chgAmt: data.content.a,
            chgRate: data.content.r,
            closePrice: data.content.e,
            coinType: data.content.c,
            // crncCd: "C0100",
            // date: "20220514",
            highPrice: data.content.h,
            lowPrice: data.content.l,
            openPrice: data.content.o,
            prevClosePrice: data.content.f,
            // sellVolume: "2694.9627182"
            tickType: data.content.k,
            // time: "010357"
            value: data.content.u,
            value24H: data.content.u24,
            volume: data.content.v,
            volume24H: data.content.v24,
            volumePower: data.content.w,
            // volumePower24H: "126.8"
          };

          if (currentCoin.type === data.content.c) {
            setCurrentCoinInfo(coinData);
          }
          setTicker(prev => ({
            ...prev,
            [data.content.c]: { ...prev[data.content.c], ...coinData },
          }));
        }
      };
    }
    return () => {
      console.log('CLEAN UP');
      ws.current.close();
    };
  }, []);

  // 코인 웹소켓 구독
  useEffect(() => {
    if (socketConnected) {
      console.log('SEND!');
      const subscribeMessage = {
        type: 'SUBSCRIBE',
        events: [
          {
            type: 'tr',
            filters: ['C0100', currentCoin.type],
          },
          {
            type: 'tk',
            filters: ['MID'],
          },
        ],
      };
      ws.current.send(JSON.stringify(subscribeMessage));
    }
  });
  console.log('MOUNT APP');
  return (
    <Container>
      <NavBar>
        <Suspense fallback={<Loader type="spin" color="#FE9601" />}>
          <Navagation />
        </Suspense>
      </NavBar>
      <SideBar>
        <Suspense fallback={<Loader type="spin" color="#FE9601" />}>
          <CoinListContainer />
        </Suspense>
      </SideBar>
      <Main>
        <Suspense fallback={<Loader type="spin" color="#FE9601" />}>
          <CandlestickChartContainer />
        </Suspense>
      </Main>
      <SideBarRight>
        <Suspense fallback={<Loader type="spin" color="#FE9601" />}>
          <ChatAndPostsContainer chatPublish={chatPublish} />
        </Suspense>
      </SideBarRight>
      <ContentBox>
        <Content1>
          <Suspense fallback={<Loader type="spin" color="#FE9601" />}>
            <TransactionContainer />
          </Suspense>
        </Content1>
        <Content2>
          <Suspense fallback={<Loader type="spin" color="#FE9601" />}>
            <OrderbookContainer />
          </Suspense>
        </Content2>
      </ContentBox>
      <Footer>Footer</Footer>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  height: 130vh;
  /* min-width: 1500px; */
  grid-template-columns: 1.1fr 1fr 1fr 1.1fr;
  grid-template-rows: 0.2fr 1.25fr 0.8fr 0.5fr;
  grid-template-areas:
    'nav nav nav nav'
    'sidebar main main sidebarRight'
    'sidebar content content sidebarRight'
    'footer footer footer footer';
  text-align: center;
  grid-gap: 1rem;
  transition: all 0.25s ease-in-out;
  @media (max-width: 390px) {
    /* width: 550px; */
    grid-template-columns: 1fr;
    grid-template-rows: 0.4fr 0.4fr 2.2fr 1.2fr 1.2fr 1fr;
    grid-template-areas:
      'nav'
      'main'
      'content'
      'sidebar'
      'sidebarRight'
      'footer';
  }
  color: white;
`;
const NavBar = styled.nav`
  background: #1d2124;
  grid-area: nav;
  padding: 0.25rem;
  margin-bottom: 30px;
  margin-top: 20px;
`;
const Main = styled.main`
  background: #1d2124;
  color: white;
  grid-area: main;
  padding: 0.25rem;
  /* min-width: 450px; */
`;
const SideBar = styled.div`
  background: #252e30;
  grid-area: sidebar;
  padding: 0.25rem;
  /* min-width: 470px; */
`;

const SideBarRight = styled(SideBar)`
  grid-area: sidebarRight;
  /* min-width: 470px; */
`;

const ContentBox = styled.div`
  display: flex;
  column-gap: 0.5rem;
  align-items: center;
  grid-area: content;
  justify-content: center;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
const Content1 = styled.div`
  background: #1d2124;
  padding: 0.25rem;
  width: 100%;
  height: 100%;
  margin-right: 5px;
`;
const Content2 = styled(Content1)`
  margin-right: 0px;
  margin-left: 5px;
`;

const Footer = styled.footer`
  background: #1d2124;
  grid-area: footer;
  padding: 0.25rem;
  margin-top: 30px;
`;
export default App;
