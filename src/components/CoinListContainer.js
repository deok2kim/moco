import React, { Suspense, useEffect } from 'react';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  coinInfoListQuery,
  coinListQuery,
  currentCoinState,
  tickerState,
} from '../states/state';
import CoinList from './CoinList';

function CoinListContainer() {
  const coinInfoList = useRecoilValue(coinInfoListQuery);
  const coinList = useRecoilValue(coinListQuery);
  const [ticker, setTicker] = useRecoilState(tickerState);

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
  };

  useEffect(() => {
    setTicker(coinInfoList.ticker);
  }, []);

  return (
    <Suspense fallback={<div>...Loading</div>}>
      <CoinList
        coinList={coinList.slice(1)}
        ticker={ticker}
        onChangeCurrentCoin={onChangeCurrentCoin}
      />
    </Suspense>
  );
}

export default React.memo(CoinListContainer);
