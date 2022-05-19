import { atom, selector, selectorFamily } from 'recoil';
import axios from 'axios';

export const currentCoinState = atom({
  key: 'CurrentCoin',
  default: {
    type: 'C0101',
    symbol: 'BTC',
  },
});

export const currentCoinInfoState = atom({
  key: 'CurrentCoinInfo',
  default: {
    // price: '',
    // rate: '',
    // openPrice: '',
    // highPrice: '',
    // lowPrice: '',
    // closePrice: '',
  },
});

// export const prevClosePriceState = atom({
//   key: 'PrevClosePrice',
//   default: '',
// });

// 최초 한번만 가져옴
export const coinListQuery = selector({
  key: 'CoinListQuery',
  get: async () => {
    const response = await axios.get(
      'https://gw.bithumb.com/exchange/v1/comn/intro?_=&retry=0',
    );
    if (response.data.message === 'success') {
      return response.data.data.coinsOnMarketList.C0101;
    }
    return [];
  },
});

// 코인 선택 시, 하지만 ticker 는 한번 만 필요함 ...ㅠ
export const coinInfoListQuery = selector({
  key: 'CoinInfoListQuery',
  get: async ({ get }) => {
    const params = {
      type: 'custom',
      crncCd: 'C0100', // 원화마켓,
      coin: get(currentCoinState).type, // 코인 선택 or 기본코인(비트코인)
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

export const transactionState = atom({
  key: 'Transaction',
  default: [],
});

// 코인이 바뀌면 코인 인포가 바뀌고 또 트랜잭션을 가져옴
export const transactionQuery = selector({
  key: 'TransactionQuery',
  get: ({ get }) => {
    const coinType = get(currentCoinState).type;
    const {
      transaction: { [coinType]: result },
    } = get(coinInfoListQuery);
    return result;
  },
});

// export const tickerState = selector({
//   key: 'Ticker',
//   get: ({ get }) => {
//     // const coinType = get(currentCoinState).type;
//     const { ticker: result } = get(coinInfoListQuery);
//     return result;
//   },
//   set: ({ set }) => {},
// });

export const tickerState = atom({
  key: 'Ticker',
  default: {},
});

// 코인이 바뀌면 오더북 바뀜
export const orderbookState = atom({
  key: 'Orderbook',
  default: {
    ask: [],
    bid: [],
    timestamp: '',
  },
});

export const orderbookStateRefresher = atom({
  key: 'orderbookStateRefresher',
  default: 0,
});

export const orderbookQuery = selector({
  key: 'OrderbookQuery',
  get: async ({ get }) => {
    get(orderbookStateRefresher);
    const response = await axios.get(
      `https://pub1.bithumb.com/trade-info/v1/orderbook/${
        get(currentCoinState).symbol
      }_KRW/1`,
    );
    if (response.data.message === 'Success') {
      return response.data.data;
    }
    return [];
  },
  set: ({ set }) => {
    set(orderbookStateRefresher, v => v + 1);
  },
});

// https://pub2.bithumb.com/public/candlesticknew/C0423_C0100/10M

// 코인이 바뀌면 캔들스틱 바뀜, 인터벌이 바뀌면 캔들스틱 바뀜
export const candlestickIntervalState = atom({
  key: 'CandlestickInterval',
  default: '1H',
});

export const fetchCandlestickInfo = selector({
  key: 'fetchCandlestickInfo',
  get: async ({ get }) => {
    const interval = get(candlestickIntervalState);
    const { type } = get(currentCoinState);
    const response = await axios.get(
      `https://pub2.bithumb.com/public/candlesticknew/${type}_C0100/${interval}`,
    );
    if (response.data.status === '0000') {
      return response.data.data.map(info => ({
        time: (info[0] + 9 * 60 * 60 * 1000) / 1000,
        open: info[1],
        close: info[2],
        high: info[3],
        low: info[4],
        // value: info[5].toString(),
      }));
    }
    console.log(response.data.message);
    return [];
  },
});

// wss://wss1.bithumb.com/public
