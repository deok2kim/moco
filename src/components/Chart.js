import { createChart, CrosshairMode } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import CoinInfo from './CoinInfo';

function Chart({ candlestickInfo }) {
  console.log('$Chart: ', candlestickInfo);
  const chartContainerRef = useRef();
  const chart = {
    current: {},
  };
  const resizeObserver = useRef();
  const cs = useRef();

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: '#253248',
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: {
          color: '#334158',
        },
        horzLines: {
          color: '#334158',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: '#485c7b',
      },
      timeScale: {
        borderColor: '#485c7b',
      },
    });
    chart.current.applyOptions({
      timeScale: {
        timeVisible: true,
      },
    });

    console.log(chart.current);

    cs.current = chart.current.addCandlestickSeries({
      upColor: '#06da25',
      downColor: '#FC4949',
      borderDownColor: '#ff4976',
      borderUpColor: '#4bffb5',
      wickDownColor: '#838ca1',
      wickUpColor: '#838ca1',
    });

    cs.current.setData(candlestickInfo);
  }, []);

  useEffect(() => {
    cs.current.setData(candlestickInfo);
  }, [candlestickInfo]);

  // Resize chart on container resizes.
  useEffect(() => {
    resizeObserver.current = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });

    resizeObserver.current.observe(chartContainerRef.current);

    return () => resizeObserver.current.disconnect();
  }, []);

  return (
    <Wrapper>
      <CoinInfo />
      <div style={{ flex: 1 }} ref={chartContainerRef} />
    </Wrapper>
  );
}

export default Chart;

Chart.defaultProps = {
  candlestickInfo: [],
};

Chart.propTypes = {
  candlestickInfo: PropTypes.arrayOf(PropTypes.object),
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 460px;
`;
