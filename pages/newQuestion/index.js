/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components'
import db from '../../db.json';
import Widget from '../../src/components/Widget';
import QuizLogo from '../../src/components/QuizLogo';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import Button from '../../src/components/Button';
import BackLinkArrow from '../../src/components/BackLinkArrow';
import CadastroQuestao from '../../src/components/CadastroQuestao';

const CaixaFlex = styled.div`
                    display: flex;
                    justify-content: space-between;
                    margin: auto;
                    width: 250px;
                  `;

export default function NewQuestion() {
    return (
        <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo logoImage={db.logo}/>
  
        <Widget>
          <Widget.Header>
              <BackLinkArrow href='/' />
              Incluir nova questão
          </Widget.Header>
          <Widget.Content>
              <CadastroQuestao/>
          </Widget.Content>  
        </Widget>
        <Widget>
          <Widget.Content>
            <CaixaFlex>
                <Button type='submit'>Incluir</Button>
            </CaixaFlex>
          </Widget.Content>  
        </Widget>

        </QuizContainer>
        </QuizBackground>
        )
}