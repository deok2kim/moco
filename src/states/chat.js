import { atom, selector } from 'recoil';
import { coinListQuery } from './state';

export const chatRoomState = atom({
  key: 'ChatRoom',
  default: 'BTC',
});

export const chatRoomsState = selector({
  key: 'ChatRooms',
  get: ({ get }) => {
    const res = get(coinListQuery);
    return res.map(r => {
      return { name: r.coinName, symbol: r.coinSymbol, type: r.coinType };
    });
  },
});

export const chatLogState = atom({
  key: 'ChatLog',
  default: [
    {
      userId: 'Elon Musk',
      message: 'Hi',
      time: '11:26',
    },
    {
      userId: 'Elon Musk',
      message: 'My',
      time: '11:26',
    },
    {
      userId: 'Elon Musk',
      message: 'Name',
      time: '11:26',
    },
    {
      userId: 'admin1',
      message: 'Hello',
      time: '11:26',
    },
    {
      userId: 'Elon Musk',
      message: 'is',
      time: '11:26',
    },
    {
      userId: 'Barry Silbert',
      message: 'Hello2',
      time: '11:26',
    },
    {
      userId: 'Barry Silbert',
      message: 'Hello3',
      time: '11:26',
    },
    {
      userId: 'Barry Silbert',
      message: 'Hello4',
      time: '11:27',
    },
    {
      userId: 'admin1',
      message: 'Hello5',
      time: '11:29',
    },
    {
      userId: 'admin1',
      message: 'Hello6',
      time: '11:29',
    },
  ],
});
