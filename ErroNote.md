```
Can't perform a React state update on a component that hasn't mounted yet
```

컴포넌트가 아직 마운트가 안되었는데 상태를 업데이트 하려고 해서 혼났다.
그렇다면 상태 업데이트한 후 마운트하면 되는게 아닐까

```javascript
<Suspense fallback={<div>Loading...</div>}>
  <CoinList />
</Suspense>
```

CoinList 에서 마운트안되었는데 상태를 업데이트 하려고 했으므로
이를 Suspense로 감싸고 fallback에 아직 데이터 로딩이 오기전에 보여주고 싶은 로딩상황을 넣어준다. (추후 리액트로더를 통해 잘 보여줄것)

---

```
'coinList' is missing in props
```
