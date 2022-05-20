import React, { useRef, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { formatNumber } from '../utils/common';

const Container = styled.div`
  padding: 1rem;
  background-color: #1d2124;
  div {
    overflow-y: scroll;
    height: 30vh;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Title = styled.p`
  color: inherit;
  font-size: 15px;
`;

const Header = styled.table`
  width: 100%;
  padding: 10px;
  tr {
    th:first-child {
      text-align: start;
    }
    th {
      padding: 1rem 0;
      text-align: end;
    }
  }
`;

const Body = styled(Header)`
  tr {
    td:first-child {
      text-align: start;
    }
    td {
      padding: 0.125rem;
      text-align: end;
    }
  }
`;

const ColorTextBuySell = styled.span`
  color: ${props => (props.color === '1' ? '#FF9E21' : 'gray')};
`;

function Transaction({ transaction, symbol }) {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current.scrollTo(0, 1000);
  });
  return (
    <Container>
      <Title>체결 내역</Title>
      <Header>
        <colgroup>
          <col width="33%" />
          <col width="33%" />
          <col width="33%" />
        </colgroup>
        <thead>
          <tr>
            <th>시간</th>
            <th>가격(KRW)</th>
            <th>수량({symbol})</th>
          </tr>
        </thead>
      </Header>
      <div ref={scrollRef}>
        <Body>
          <colgroup>
            <col width="33%" />
            <col width="33%" />
            <col width="33%" />
          </colgroup>
          <tbody>
            {transaction.map(t => (
              <tr key={t.contDtm}>
                {/* <td>{t.buySellGb}</td> */}
                <td>{t.contDtm.split(' ')[1].split('.')[0]}</td>
                <td>{formatNumber(t.contPrice)}</td>
                <td>
                  <ColorTextBuySell color={t.buySellGb}>
                    {formatNumber(t.contQty)}
                  </ColorTextBuySell>
                </td>
              </tr>
            ))}
          </tbody>
        </Body>
      </div>
    </Container>
  );
}

Transaction.defaultProps = {
  transaction: [],
  symbol: '',
};

Transaction.propTypes = {
  transaction: PropTypes.arrayOf(PropTypes.object),
  symbol: PropTypes.string,
};

export default Transaction;
