import { atom, selector, selectorFamily } from 'recoil';
import axios from 'axios';

export const getCoinList = selector({
  key: 'getCoinList',
  get: async ({ get }) => {
    const response = await fetch(
      'https://gw.bithumb.com/exchange/v1/comn/intro?_=&retry=0',
    );
    const json = await response.json();
    if (json.status === 200) {
      // console.log(json.data.coinList);
      return json.data.coinList.filter(coin => coin.siseCrncCd === 'C0100');
    }
    return [];
  },
});

export const getCoinInfoList = selectorFamily({
  key: 'getCoinInfoList',
  get:
    coinType =>
    async ({ get }) => {
      const params = {
        type: 'custom',
        crncCd: 'C0100', // 원화마켓,
        coin: coinType || 'C0101', // 코인 선택 or 기본코인(비트코인)
        lists: {
          ticker: {
            coinType: 'ALL',
            tickType: '24H',
          },
          transaction: {
            limit: 31,
          },
        },
      };

      const response = await axios.get(
        'https://pub1.bithumb.com/trade-info/v1/getTradeData',
        {
          params,
        },
      );

      if (response.data.message === 'Success') {
        return response.data.data.C0100;
      }
      return [];
    },
});

// https://pub2.bithumb.com/public/candlesticknew/C0423_C0100/10M
export const fetchCandlestickInfo = selectorFamily({
  key: 'fetchCandlestickInfo',
  get:
    ({ coinType, interval }) =>
    async ({ get }) => {
      console.log(interval);
      const response = await axios.get(
        `https://pub2.bithumb.com/public/candlesticknew/${coinType}_C0100/${interval}`,
      );
      if (response.data.status === '0000') {
        return response.data.data.map(info => ({
          time: (info[0] + 9 * 60 * 60 * 1000) / 1000,
          open: info[1],
          close: info[2],
          high: info[3],
          low: info[4],
          value: info[5],
        }));
      }
      console.log(response.data.message);
      return [];
    },
});

// wss://wss1.bithumb.com/public
