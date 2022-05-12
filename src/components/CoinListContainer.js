import React, { Suspense } from 'react';

import { useRecoilValue } from 'recoil';
import { coinInfoListQuery, coinListQuery } from '../state/state';
import CoinList from './CoinList';

function CoinListContainer() {
  const coinInfoList = useRecoilValue(coinInfoListQuery);
  const coinList = useRecoilValue(coinListQuery);

  console.log('$CoinListContainer');
  console.log(coinList);
  console.log(coinInfoList);

  return (
    <Suspense fallback={<div>...Loading</div>}>
      <CoinList coinList={coinList} />
    </Suspense>
  );
}

export default CoinListContainer;
