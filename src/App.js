import React, { Suspense, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
// import { io } from 'socket.io-client';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
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

// const socket = io.connect('wss://wss1.bithumb.com/public');

function App() {
  const [socketConnected, setSocketConnected] = useState(false);
  const webSocketUrl = 'wss://wss1.bithumb.com/public';
  const ws = useRef(null);

  const currentCoin = useRecoilValue(currentCoinState);
  const setTransaction = useSetRecoilState(transactionState);
  const setTicker = useSetRecoilState(tickerState);
  const setCurrentCoinInfo = useSetRecoilState(currentCoinInfoState);

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
          <ChatAndPostsContainer />
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
  grid-template-rows: 0.2fr 1fr 0.8fr 0.5fr;
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
  background: #3a3a55;
  grid-area: nav;
  padding: 0.25rem;
`;
const Main = styled.main`
  background: #1f2128;
  color: white;
  grid-area: main;
  padding: 0.25rem;
  /* min-width: 450px; */
`;
const SideBar = styled.div`
  background: #2a3138;
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
  padding: 0.25rem;
  align-items: center;
  grid-area: content;
  justify-content: center;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
const Content1 = styled.div`
  background: #2a3138;
  padding: 0.25rem;
  width: 100%;
  height: 100%;
`;
const Content2 = styled(Content1)``;
// const Content3 = styled(Content1)``;
const Footer = styled.footer`
  background: #ff9637;
  grid-area: footer;
  padding: 0.25rem;
`;
export default App;
