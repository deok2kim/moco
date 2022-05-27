import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p``;

function Error() {
  return (
    <Wrapper>
      <Text>데이터 불러오기 실패</Text>
    </Wrapper>
  );
}

export default Error;
