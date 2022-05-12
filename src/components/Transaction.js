import React from 'react';
import { PropTypes } from 'prop-types';

function Transaction({ transaction }) {
  return (
    <div>
      <ul>
        {transaction.map(t => (
          <li key={t.contDtm}>
            {t.buySellGb}/{t.contPrice}/{t.contQty}/{t.contDtm}
          </li>
        ))}
      </ul>
    </div>
  );
}

Transaction.defaultProps = {
  transaction: [],
};

Transaction.propTypes = {
  transaction: PropTypes.arrayOf(PropTypes.object),
};

export default Transaction;
