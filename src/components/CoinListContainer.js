import React, { Suspense, useEffect } from 'react';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { coinInfoListQuery, coinListQuery, tickerState } from '../state/state';
import CoinList from './CoinList';

function CoinListContainer() {
  const coinInfoList = useRecoilValue(coinInfoListQuery);
  const coinList = useRecoilValue(coinListQuery);
  const [ticker, setTicker] = useRecoilState(tickerState);

  // console.log('$CoinListContainer');
  // console.log(coinList);
  // console.log(coinInfoList);
  // console.log(ticker);
  useEffect(() => {
    setTicker(coinInfoList.ticker);
  }, []);

  return (
    <Suspense fallback={<div>...Loading</div>}>
      <CoinList coinList={coinList.slice(1)} ticker={ticker} />
    </Suspense>
  );
}

export default React.memo(CoinListContainer);
