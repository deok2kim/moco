import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { getCoinList } from '../state/state';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
`;

const SearchBar = styled.div`
  display: flex;
  min-height: 46px;
  padding: 0;
  border: 0 none;
  border-bottom: 1px solid #eee;
  position: relative;
`;

const Input = styled.input`
  height: 46px;
  border-radius: 0;
  font-size: 14px;
  background-color: transparent;
  padding-left: 36px;
  outline: 0;
  line-height: 21px;
  font-weight: 400;
  letter-spacing: 0;
  padding: 0 12px;
  width: 100%;
  border: none;
`;

const TabWrapper = styled.div`
  margin: 0;
  padding: 0;
  border: 0;
  margin-bottom: 0;
`;

const Tabs = styled.dt`
  display: flex;
  position: relative;
  border-bottom: 1px solid #eee;
`;

const Tab = styled.a`
  flex: 1;
  max-width: 100%;
  padding: 11px 0 9px;
  font-size: 14px;
  line-height: 21px;
  box-sizing: border-box;
`;

const CoinListWrapper = styled.div``;

const CoinListHeaders = styled.ul`
  display: table;
  width: 100%;
  overflow: hidden;
  border-bottom: 1px solid #eee;
  /* list-style: none; */
`;
const CoinListHeader = styled.li`
  padding-top: 8px;
  width: 107px;
  display: table-cell;
  padding: 8px 0 6px;
  font-size: 12px;
  line-height: 18px;
  font-weight: normal;
  box-sizing: border-box;
  vertical-align: middle;

  &:first-child {
    padding-left: 25px;
    text-align: left;
  }
`;

const CoinListBody = styled.div``;

const CoinListTable = styled.ol``;
const CoinListItem = styled.li`
  display: flex;
  padding: 8px 0px;
  width: 100%;
  overflow: hidden;
  align-items: center;
`;

const BookmarkWrapper = styled.div`
  flex: 0 0 26px;
  max-width: 26px;
  padding-left: 7px;
  box-sizing: border-box;
`;

const Bookmark = styled.a``;

const CoinInfoWrapper = styled.a`
  flex: 1;
  position: relative;
  display: table;
  width: calc(100% - 26px);
  vertical-align: middle;
  box-sizing: border-box;
`;
const CoinInfoItem = styled.div`
  display: table-cell;
  vertical-align: middle;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 16px;
  word-break: break-word;
`;

function CoinList({ coinList }) {
  const tabList = ['원화 마켓', 'BTC 마켓', '보유자산', '즐겨찾기'];
  const headerList = ['자산', '현재가', '변동률(24H)', '거래금액(24H)'];
  console.log('$CoinList: ', coinList);
  return (
    <Container>
      <SearchBar>
        <Input />
      </SearchBar>
      <TabWrapper>
        <Tabs>
          {tabList.map(tab => (
            <Tab key={tab}>{tab}</Tab>
          ))}
        </Tabs>
      </TabWrapper>
      <CoinListWrapper>
        <CoinListHeaders>
          {headerList.map(header => (
            <CoinListHeader key={header}>{header}</CoinListHeader>
          ))}
        </CoinListHeaders>
        <CoinListBody>
          <CoinListTable>
            {coinList.map(coin => (
              <CoinListItem key={coin.coinSymbol}>
                <BookmarkWrapper>
                  <Bookmark>💥</Bookmark>
                </BookmarkWrapper>

                <CoinInfoWrapper>
                  <CoinInfoItem>{coin.coinName}</CoinInfoItem>
                  <CoinInfoItem>43,254,000</CoinInfoItem>
                  <CoinInfoItem>-4.10%</CoinInfoItem>
                  <CoinInfoItem>173,885백만</CoinInfoItem>
                </CoinInfoWrapper>
              </CoinListItem>
            ))}
            <CoinListItem>
              <BookmarkWrapper>
                <Bookmark>💥</Bookmark>
              </BookmarkWrapper>
              <CoinInfoWrapper>
                <CoinInfoItem>비트코인</CoinInfoItem>
                <CoinInfoItem>43,254,000</CoinInfoItem>
                <CoinInfoItem>-4.10%</CoinInfoItem>
                <CoinInfoItem>173,885백만</CoinInfoItem>
              </CoinInfoWrapper>
            </CoinListItem>
            <CoinListItem>
              <BookmarkWrapper>
                <Bookmark>💥</Bookmark>
              </BookmarkWrapper>
              <CoinInfoWrapper>
                <CoinInfoItem>비트코인</CoinInfoItem>
                <CoinInfoItem>43,254,000</CoinInfoItem>
                <CoinInfoItem>-4.10%</CoinInfoItem>
                <CoinInfoItem>173,885백만</CoinInfoItem>
              </CoinInfoWrapper>
            </CoinListItem>
          </CoinListTable>
        </CoinListBody>
      </CoinListWrapper>
    </Container>
  );
}

export default CoinList;

CoinList.defaultProps = {
  coinList: [],
};

CoinList.propTypes = {
  coinList: PropTypes.arrayOf(PropTypes.object),
};
