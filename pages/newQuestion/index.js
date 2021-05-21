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
              <CadastroQuestao>
                <Widget.Content>
                    <CadastroQuestao.Questao/>
                </Widget.Content>  
                <Widget.Content>
                    <CadastroQuestao.Opcoes/>
                </Widget.Content>  
              </CadastroQuestao>
            </Widget>
            <Widget>
              <Widget.Content>
                <CadastroQuestao.Botao/>
              </Widget.Content>  
            </Widget>
          </QuizContainer>
        </QuizBackground>
        )
}