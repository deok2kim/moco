import React, { Suspense, useEffect } from 'react';

import { useRecoilValue } from 'recoil';
import { currentCoinState, transactionState } from '../state/state';

import Transaction from './Transaction';

function TransactionContainer() {
  const transaction = useRecoilValue(transactionState);
  const currentCoin = useRecoilValue(currentCoinState);
  console.log('$TransactionContainer: ', transaction);
  /*
  crncCd,
  coinType
  buySellGb: '1' or '2'
  contPrice
  contQty
  */
  return (
    <Suspense fallback={<div>...Loading</div>}>
      <Transaction transaction={transaction} symbol={currentCoin.symbol} />
    </Suspense>
  );
}

export default TransactionContainer;
