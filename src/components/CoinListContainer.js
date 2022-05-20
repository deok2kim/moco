import React, { Suspense, useEffect } from 'react';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { prevClosePriceState } from '../states/coin';
import {
  coinInfoListQuery,
  coinListQuery,
  currentCoinState,
  tickerState,
} from '../states/state';
import { apiToggleFavoriteCoin } from '../utils/api';
import CoinList from './CoinList';
import Loader from './Loader';

function CoinListContainer() {
  const coinInfoList = useRecoilValue(coinInfoListQuery);
  const coinList = useRecoilValue(coinListQuery);
  const [ticker, setTicker] = useRecoilState(tickerState);
  const setPrevClosePrice = useSetRecoilState(prevClosePriceState);
  const [currentCoin, setCurrentCoin] = useRecoilState(currentCoinState);

  // console.log('$CoinListContainer');
  // console.log(coinList);
  // console.log(coinInfoList);
  // console.log(ticker);

  const onChangeCurrentCoin = (type, symbol) => {
    if (currentCoin.type !== type) {
      setCurrentCoin({
        type,
        symbol,
      });
    }
    setPrevClosePrice(coinInfoList.ticker[type].prevClosePrice);
  };

  const toggleFavoriteCoin = symbol => {
    console.log('코인 즐찾 기능', symbol);
    // TODO: API 추가
    // apiToggleFavoriteCoin;
  };

  useEffect(() => {
    if (Object.keys(ticker).length === 0) {
      setTicker(coinInfoList.ticker);
      console.log('coinInfo', coinInfoList);
    }
    setPrevClosePrice(coinInfoList.ticker[currentCoin.type].prevClosePrice);
  }, []);

  return (
    <CoinList
      coinList={coinList.slice(1)}
      ticker={ticker}
      onChangeCurrentCoin={onChangeCurrentCoin}
      toggleFavoriteCoin={toggleFavoriteCoin}
    />
  );
}

export default React.memo(CoinListContainer);
