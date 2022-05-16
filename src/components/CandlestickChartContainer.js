import React, { Suspense, useEffect } from 'react';

import { useRecoilValue } from 'recoil';
import { fetchCandlestickInfo } from '../states/state';

import Chart from './Chart';

function CandlestickChartContainer() {
  const candlestickInfo = useRecoilValue(
    fetchCandlestickInfo({ coinType: 'C0101' }),
  );
  /*
    시간
    시가
    종가
    고가
    저가
    거래량
  */
  console.log('$CandlestickChartContainer: ', candlestickInfo);
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Chart candlestickInfo={candlestickInfo} />
    </Suspense>
  );
}

export default React.memo(CandlestickChartContainer);
