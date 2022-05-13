import React, { Suspense } from 'react';

import { useRecoilValue } from 'recoil';
import { coinInfoListQuery, coinListQuery, tickerState } from '../state/state';
import CoinList from './CoinList';

function CoinListContainer() {
  const coinInfoList = useRecoilValue(coinInfoListQuery);
  const coinList = useRecoilValue(coinListQuery);
  const ticker = useRecoilValue(tickerState);

  console.log('$CoinListContainer');
  console.log(coinList);
  console.log(coinInfoList);
  console.log(ticker);

  return (
    <Suspense fallback={<div>...Loading</div>}>
      <CoinList coinList={coinList.slice(1)} ticker={ticker} />
    </Suspense>
  );
}

export default React.memo(CoinListContainer);
