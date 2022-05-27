import React, { useState } from "react";
import { useCallback } from "react";
import styeld from "styled-components";

const Wrapper = styeld.div`
  display: flex;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center
`;

const Form = styeld.textarea`
  background-color: transparent;
  &:focus {
    outline: 2px solid orange;
  }
  resize: none;
  width: 80%;
  margin: 0;
  color: white;
`;

const CreateButton = styeld.div`
  border: 1px solid black;
  border-radius: 5px;
  background-color: transparent;
  display: inline;
  cursor: pointer;
  padding: 0.5rem;
`;

function CommentForm() {
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onCreateComment = useCallback(() => {
    alert("댓글 생성^^");
    setText("");
  }, []);

  return (
    <Wrapper>
      <Form
        name="replycontent"
        value={text}
        onChange={onChange}
        rows={5}
        // disabled={true}
      />
      <CreateButton onClick={onCreateComment}>등록</CreateButton>
    </Wrapper>
  );
}

export default React.memo(CommentForm);
