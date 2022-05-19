import { atom, selector } from 'recoil';
import { apiFetchFavoriteCoins } from '../utils/api';

export const prevClosePriceState = atom({
  key: 'prevClosePrice',
  default: '',
});

export const favoriteCoinsState = selector({
  key: 'FavoriteCoins',
  get: async ({ get }) => {
    const userId = get('유저아이디상태');
    const res = await apiFetchFavoriteCoins({ userId });
    return res;
  },
});
