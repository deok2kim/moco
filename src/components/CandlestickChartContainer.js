import React from 'react';

import { useRecoilValue } from 'recoil';
import { fetchCandlestickInfo } from '../states/state';

import Chart from './Chart';

function CandlestickChartContainer() {
  const candlestickInfo = useRecoilValue(fetchCandlestickInfo);
  /*
    시간
    시가
    종가
    고가
    저가
    거래량
  */
  return <Chart candlestickInfo={candlestickInfo} />;
}

export default React.memo(CandlestickChartContainer);
