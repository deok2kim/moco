import React, { Suspense, useEffect } from 'react';

import { useRecoilValue } from 'recoil';
import { transactionState } from '../state/state';

import Transaction from './Transaction';

function TransactionContainer() {
  const transaction = useRecoilValue(transactionState);

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
      <Transaction transaction={transaction} />
    </Suspense>
  );
}

export default TransactionContainer;
