import styled from 'styled-components';

import React from 'react';
import PropTypes from 'prop-types';

const H3 = styled.h3`
  background: none;
  text-align: center;
`;

function Logo({ logoImage }) {
  return (
    <H3>
      <img src={logoImage} alt="Logo Univesp"/>
    </H3>
  );
}

Logo.propTypes = {
  logoImage: PropTypes.string.isRequired,
};

const QuizLogo = styled(Logo)`
  margin: auto;
  display: block;
  @media screen and (max-width: 500px) {
    margin: 0;
  }
`;

export default QuizLogo;
