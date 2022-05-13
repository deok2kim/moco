import React, { Suspense, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { io } from 'socket.io-client';
import { useRecoilState, useSetRecoilState } from 'recoil';
import CandlestickChartContainer from './components/CandlestickChartContainer';
import CoinListContainer from './components/CoinListContainer';
import TransactionContainer from './components/TransactionContainer';
import OrderbookContainer from './components/OrderbookContainer';
import { transactionState } from './state/state';

// const socket = io.connect('wss://wss1.bithumb.com/public');

function App() {
  const [socketConnected, setSocketConnected] = useState(false);
  const webSocketUrl = 'wss://wss1.bithumb.com/public';
  const ws = useRef(null);

  const setTransaction = useSetRecoilState(transactionState);

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
        console.log(data);
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
      const subscribeTransaction = {
        type: 'SUBSCRIBE',
        events: [
          {
            type: 'tr',
            filters: ['C0100', 'C0101'],
          },
        ],
      };
      ws.current.send(JSON.stringify(subscribeTransaction));
    }
  });
  console.log('MOUNT APP');
  return (
    <Container>
      <NavBar>NavBar</NavBar>
      <SideBar>
        <Suspense fallback={<div>Loading...</div>}>
          <CoinListContainer />
        </Suspense>
      </SideBar>
      <Main>
        <Suspense fallback={<div>Loading...</div>}>
          <CandlestickChartContainer />
        </Suspense>
      </Main>
      <SideBarRight>SideBar</SideBarRight>
      <ContentBox>
        <Content1>
          <Suspense fallback={<div>Loading...</div>}>
            <TransactionContainer />
          </Suspense>
        </Content1>
        <Content2>
          <Suspense fallback={<div>Loading...</div>}>
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
  grid-template-columns: 1.1fr 1fr 1fr 1.1fr;
  grid-template-rows: 0.2fr 1fr 0.8fr 0.5fr;
  grid-template-areas:
    'nav nav nav nav'
    'sidebar main main   sidebarRight'
    'sidebar content content  sidebarRight'
    'footer footer footer  footer';
  text-align: center;
  grid-gap: 1rem;
  transition: all 0.25s ease-in-out;
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    grid-template-rows: 0.4fr 0.4fr 2.2fr 1.2fr 1fr;
    grid-template-areas:
      'nav'
      'sidebar'
      'main'
      'content'
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
`;
const SideBar = styled.div`
  background: #2a3138;
  grid-area: sidebar;
  padding: 0.25rem;
`;

const SideBarRight = styled(SideBar)`
  grid-area: sidebarRight;
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
