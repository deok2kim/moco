import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import {
  BsArrowUp,
  BsArrowDown,
  BsFillCaretDownFill,
  BsFillCaretUpFill,
} from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import { formatNumber } from '../utils/common';

const Container = styled.div`
  padding: 1rem;
  div {
    overflow-y: scroll;
    height: 75vh;
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
    th:first-child {
      text-align: start;
    }
    th {
      padding: 1rem 0;
      text-align: end;
    }
  }
`;

const Body = styled(Header)`
  tr {
    td:first-child {
      text-align: start;
    }
    td {
      padding: 0.5rem 0;
      text-align: end;
    }
  }
`;

function CoinList({ coinList, ticker }) {
  // const tabList = ['원화 마켓', 'BTC 마켓', '보유자산', '즐겨찾기'];
  // const headerList = ['자산', '현재가', '변동률(24H)', '거래금액(24H)'];
  return (
    <Container>
      <Title>체결 내역</Title>
      {/* <SearchBar>
        <Input />
      </SearchBar> */}
      <Header>
        <colgroup>
          <col width="50%" />
          <col width="50%" />
        </colgroup>
        <thead>
          <tr>
            <th>원화마켓</th>
            <th>즐겨찾기</th>
          </tr>
        </thead>
      </Header>
      <Header>
        <colgroup>
          <col width="30%" />
          <col width="25%" />
          <col width="20%" />
          <col width="25%" />
        </colgroup>
        <thead>
          <tr>
            <th>자산</th>
            <th>현재가</th>
            <th>변동률(24H)</th>
            <th>거래금액(24H)</th>
          </tr>
        </thead>
      </Header>
      <div>
        <Body>
          <colgroup>
            <col width="30%" />
            <col width="25%" />
            <col width="20%" />
            <col width="25%" />
          </colgroup>
          <tbody>
            {coinList.map(
              coin =>
                ticker[coin.coinType] && (
                  <tr key={coin.coinSymbol}>
                    <td>
                      <AiFillStar />
                      {coin.coinName}
                    </td>
                    <td>{formatNumber(ticker[coin.coinType]?.closePrice)}</td>
                    <td>{ticker[coin.coinType]?.chgRate}%</td>
                    <td>{formatNumber(ticker[coin.coinType]?.volume24H)}</td>
                  </tr>
                ),
            )}
          </tbody>
        </Body>
      </div>
    </Container>
  );
}

export default CoinList;

CoinList.defaultProps = {
  coinList: [],
  ticker: {},
};

/*
buyVolume: "3849.86329656"
chgAmt: "-2181000"
chgRate: "-5.45"
closePrice: "37820000"
coinType: "C0101"
crncCd: "C0100"
date: "20220512"
highPrice: "42244000"
lowPrice: "36190000"
openPrice: "40001000"
prevClosePrice: "41824000"
sellVolume: "3546.0284262"
tickType: "24H"
time: "223527"
value: "288108302650.70773"
value24H: "288108302650.70773"
volume: "7395.89362276"
volume24H: "7395.89362276"
volumePower: "108.57"
volumePower24H: "108.57"
*/

CoinList.propTypes = {
  coinList: PropTypes.arrayOf(PropTypes.object),
  ticker: PropTypes.objectOf(PropTypes.object),
};
