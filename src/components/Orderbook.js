import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { formatNumber } from '../utils/common';
import { prevClosePriceState } from '../states/coin';
import { currentCoinState } from '../states/state';

const Container = styled.div`
  padding: 1rem;
  div {
    overflow-y: scroll;
    height: 30vh;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Title = styled.p`
  color: inherit;
  font-size: 15px;
`;

const Header = styled.table`
  width: 100%;
  padding: 10px;
  tr {
    text-align: center;
    th {
      padding: 1rem 0;
    }
  }
`;

const Body = styled(Header)`
  tr {
    background-color: #1d2124;
    td:first-child {
      text-align: start;
    }
    td {
      padding: 0.125rem;
      text-align: end;
    }
  }
`;

const Tr = styled.tr`
  background-color: ${props => props.color};
`;

const ColorTextBuySell = styled.span`
  color: ${props => (props.color === '1' ? 'red' : 'blue')};
`;

function Orderbook({ orderbook }) {
  const prevClosePrice = useRecoilValue(prevClosePriceState);
  const currentCoin = useRecoilValue(currentCoinState);
  // console.log(orderbook, prevClosePrice);
  const calRate = price => {
    const rate = ((price - prevClosePrice) / prevClosePrice) * 100;

    return rate >= 0 ? `+${rate.toFixed(2)}` : rate.toFixed(2);
  };
  return (
    <Container>
      <Title>오더북</Title>
      <Header>
        <colgroup>
          <col width="30%" />
          <col width="20%" />
          <col width="50%" />
        </colgroup>
        <thead>
          <tr>
            <th colSpan={2}>가격(KRW)</th>
            <th>수량({currentCoin.symbol})</th>
          </tr>
        </thead>
      </Header>
      <div>
        <Body>
          <colgroup>
            <col width="30%" />
            <col width="20%" />
            <col width="50%" />
          </colgroup>
          <tbody>
            {orderbook.ask.map(o => (
              <Tr key={o.p} color="#2c3847">
                <td>{formatNumber(o.p)}</td>
                <td>{calRate(o.p)}%</td>
                <td>{formatNumber(o.q)}</td>
              </Tr>
            ))}
            {orderbook.bid.map(o => (
              <Tr key={o.p} color="#3a343c">
                <td>{formatNumber(o.p)}</td>
                <td>{calRate(o.p)}%</td>
                <td>{formatNumber(o.q)}</td>
              </Tr>
            ))}
          </tbody>
        </Body>
      </div>
    </Container>
  );
}

Orderbook.defaultProps = {
  orderbook: {
    ask: [],
    bid: [],
    timestamp: '',
  },
};

Orderbook.propTypes = {
  orderbook: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  ),
};

export default Orderbook;
