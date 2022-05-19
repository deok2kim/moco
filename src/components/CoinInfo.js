import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
  candlestickIntervalState,
  currentCoinInfoState,
} from '../states/state';

const Wrapper = styled.div`
  margin: 10px;
`;

const IntervalButton = styled.button`
  cursor: pointer;
  background-color: #1f2128;
  margin: 3px;
  border: none;
  color: ${props => (props.active ? 'white' : 'gray')};
`;

function CoinInfo() {
  const currentCoinInfo = useRecoilValue(currentCoinInfoState);
  const [currentInterval, setCurrentInterval] = useRecoilState(
    candlestickIntervalState,
  );
  // console.log('$currentCoinInfo');
  // console.log(currentCoinInfo);
  const intervals = ['1M', '10M', '30M', '1H'];

  const changeInterval = e => {
    setCurrentInterval(e.target.value);
  };
  return (
    <Wrapper>
      O:{currentCoinInfo.openPrice}
      H:{currentCoinInfo.highPrice}
      L:{currentCoinInfo.lowPrice}
      C:{currentCoinInfo.closePrice}
      {intervals.map(interval => (
        <IntervalButton
          key={interval}
          value={interval}
          active={interval === currentInterval}
          onClick={changeInterval}
        >
          {interval}
        </IntervalButton>
      ))}
    </Wrapper>
  );
}

export default CoinInfo;
