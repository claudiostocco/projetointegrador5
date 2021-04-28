import styled from 'styled-components';

// src/components/Footer/index.js
const FooterWrapper = styled.footer`
  background-color: #00000070;
  padding: 20px;
  display: flex;
  align-items: center;
  border-radius: 4px; 
  img {
    width: 75px;
    margin-right: 12px;
  }
  a {
    color: white;
    text-decoration: none;
    transition: .3s;
    &:hover,
    &:focus {
      opacity: .5;
    }
    span {
      text-decoration: underline;
    }
  }
`;

export default function Footer(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FooterWrapper {...props}>
      <a href="https://www.univesp.br/">
        <img src={props.logoImage} alt="Logo Univesp"/>
      </a>
      <p>
        
        <p>
          <a href="https://www.univesp.com.br/">
            <span>Univesp - Universidade Virtaul do Estado de São Paulo</span>
          </a>
        </p>
      </p>
    </FooterWrapper>
  );
}
