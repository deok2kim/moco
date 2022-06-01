## 프로젝트 실행 방법

1. npm install
2. npm start
   Runs the app in the development mode.
   Open http://localhost:3000 to view it in your browser.
   
![ezgif com-gif-maker](https://user-images.githubusercontent.com/52899349/170879561-e1bc4807-08c8-497b-bb48-eb53e9959f17.gif)

## 사용한 기술 스택

1. javascript
2. html / css
3. react
4. recoil
5. styled-components
6. lightweight-charts
7. react-icons
8. react-loading

## 구현 기능 목록 (Software Requirement Specification)

1. 코인에 대한 (현재)정보 ex.현재가격, 시가, 종가, 거래량 등 표시
2. 호가 표시
3. 체결 내역 표시
4. 현재가를 기준으로 실시간 코인 가격 (그래프) 표시
5. 코인의 목록
6. 코인 즐겨찾기
7. 코인 목록 인피니티 스크롤
8. 코인 검색
9. 게시판
10. 채팅

## 구현 방법 및 구현하면서 어려웠던 점 (+ 개선)

1. 웹소켓으로 받아오는 가격은 초기에 많지 않아서 데이터가 가득한 화면을 보여주기 어렵기 때문에 API로 초기 데이터를 가져오려고했으나 오더북 데이터가 CORS문제가 발생해서 가져오지 못함. => 다른 public api 를 이용하여 초기 데이터 구성, 오더북 cors 문제도 덩달아 해결
2. 리코일 사용 스킬이 아직 미숙하여 상태관리부분이 부족함

## 성능 최적화에 대해서 고민하고 개선한 방법

값을 받아와서 쌓을 수록 렌더링할 데이터를 분류해야할 작업이 많아지기 때문에 느려진다고 생각했습니다. 그래서 어느정도 사용자에게 필요한 만큼의 정보만 남기고 지난 데이터나 필요없는 데이터는 삭제했습니다.

-> 자식 컴포넌트 중에 부모 컴포넌트의 리렌더링으로 인해 같이 리렌더링 되는 (상태가 변하지 않아서 리렌더링이 필요 없는)컴포넌트를 React.memo 를 통해 최적화 -> useCallback 을 사용해서 한번 만들어진 함수는 재사용

## FAQ, 차후 개선책

1. 속도가 느린점

- 데이터를 더 최적화
- => 위에서 말한 최적화를 통해 성능을 개선했습니다.

2. 그래프 보기 힘든점

- 다양한 차트 라이브러리를 찾아보기
- => lightweight 라는 라이브러리를 찾아 기존의 차트보다 좋은 결과물을 얻었습니다.

3. 성능을 더 개선
   학습한 결과 React-Saga를 통해 웹소켓으로 받아온 데이터를 즉시 사용하지 않고, 잠깐 보류해 둔 뒤 모아서 사용할 수 있다는 결과를 얻었습니다.
   하지만 바로 적용하기에는 약간의 장벽이 있어 프로젝트를 마무리하고, 따로 스스로 개선해보기로 했습니다.
   => 상태관리 라이브러리를 리코일로 선택하여 개선하려고 했으나, 아직은 스킬부족으로 추후 개선을 하기로 함.

## 와이어 프레임

![01_메인 + 게시판](https://user-images.githubusercontent.com/52899349/171353841-2f575a37-ec64-4666-90d9-5cd1465e1962.png)
![02_메인 + 채팅](https://user-images.githubusercontent.com/52899349/171353847-6f87aa19-d682-474b-8812-d7bf70409628.png)
![03_로그인](https://user-images.githubusercontent.com/52899349/171353849-501ca4dc-d78a-42e3-8dca-1a56ea0082cb.png)
![04_게시판](https://user-images.githubusercontent.com/52899349/171353850-afdefbea-fd08-4c30-9847-8bb3dc0864a1.png)




