import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { AiFillStar } from 'react-icons/ai';
import { formatNumber } from '../utils/common';

const Name = styled.button`
  border: none;
  background-color: transparent;
  color: inherit;
  cursor: pointer;
`;

function Coin({ coin, toggleFavoriteCoin, onChangeCurrentCoin }) {
  return (
    <tr key={coin.coinSymbol}>
      <td>
        <Name onClick={() => toggleFavoriteCoin(coin.coinSymbol)}>
          <AiFillStar />
        </Name>
        <Name
          type="button"
          onClick={() => onChangeCurrentCoin(coin.coinType, coin.coinSymbol)}
        >
          {coin.coinName}
        </Name>
      </td>
      <td>{formatNumber(ticker[coin.coinType]?.closePrice)}</td>
      <td>{ticker[coin.coinType]?.chgRate}%</td>
      <td>{formatNumber(ticker[coin.coinType]?.volume24H)}</td>
    </tr>
  );
}

export default Coin;

Coin.defaultProps = {
  coin: {},
  toggleFavoriteCoin: () => {},
  onChangeCurrentCoin: () => {},
};

Coin.propTypes = {
  coin: PropTypes.objectOf(PropTypes.string),
  toggleFavoriteCoin: PropTypes.func,
  onChangeCurrentCoin: PropTypes.func,
};
