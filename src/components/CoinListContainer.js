import React, { Suspense } from 'react';

import { useRecoilValue } from 'recoil';
import { getCoinInfoList, getCoinList } from '../state/state';
import CoinList from './CoinList';

function CoinListContainer() {
  const coinInfoList = useRecoilValue(getCoinInfoList('C0101'));
  const coinList = useRecoilValue(getCoinList);
  console.log('coinList');
  console.log(coinInfoList);

  return (
    <Suspense fallback={<div>...Loading</div>}>
      <CoinList coinList={coinList} />
    </Suspense>
  );
}

export default CoinListContainer;
