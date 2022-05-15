import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { formatNumber } from '../utils/common';

const Container = styled.div`
  padding: 1rem;
  div {
    overflow-y: scroll;
    height: 30vh;
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    &::-webkit-scrollbar-track {
      background-color: #fff;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #999;
      border-radius: 10px;
      background-clip: padding-box;
      border: 1px solid transparent;
    }
  }
`;

const Title = styled.p`
  color: inherit;
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
    background-color: ${props => props.color};
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
  // console.log(orderbook);
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
            <th>수량(BTC)</th>
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
                <td>-5.55%</td>
                <td>{formatNumber(o.q)}</td>
              </Tr>
            ))}
            {orderbook.bid.map(o => (
              <Tr key={o.p} color="#3a343c">
                <td>{formatNumber(o.p)}</td>
                <td>-5.55%</td>
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
