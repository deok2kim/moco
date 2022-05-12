import React, { useEffect, useCallback } from 'react';

import { useRecoilState } from 'recoil';
import { coinListState } from '../state/state';
import { fetchCoinList } from '../utils/api';

export default function useCoinList() {
  const [coinList, setCoinList] = useRecoilState(coinListState);

  const fetchData = useCallback(async () => {
    const res = await fetchCoinList();
    setCoinList(res);
  }, [setCoinList]);

  useEffect(() => {
    fetchData();
  }, []);

  return coinList;
}
