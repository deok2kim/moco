import React from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';

import PropTypes from 'prop-types';

function Loader({ type, color }) {
  return (
    <LoaderWrapper>
      <ReactLoading type={type} color={color} />
    </LoaderWrapper>
  );
}
export default Loader;
const LoaderWrapper = styled.div`
  /* position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: #eee; */
  display: felx;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

Loader.defaultProps = {
  type: 'spin',
  color: '#FE9601',
};

Loader.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
};
