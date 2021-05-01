import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';
import Input from '../src/components/Input'
import Button from '../src/components/Button'

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 450px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo logoImage={db.logo}/>
        <Widget>
          <Widget.Header>
            <h1>Titulo Quiz</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={function (event) {
              event.preventDefault();
              router.push(`/quiz?name=${name}`);
              console.log('Fazendo uma submissão por meio do react');
            }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={(event) => setName(event.target.value)}
                placeholder="Informe seu nome para pontuação"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Projeto Integrado V</h1>
            <p>
              Desenvolvido pelo grupo CERQUEIRA CÉSAR 4N.58 como protótipo para disciplina de projeto integrador do curso de Engenharia da Computação.
            </p>

            {/* <ul>
              {db.external.map((externalUrl,index) => {
                const [projectName, githubUser] = externalUrl
                .replace(/\//g, '')
                .replace('https:', '')
                .replace('.vercel.app', '')
                .split('.');

                return (
                  <li key={index}>
                    <Widget.Topic href={externalUrl}>
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                )
              })}
            </ul> */}
          </Widget.Content>
        </Widget>
        <Footer logoImage={db.logo}/>
      </QuizContainer>
    </QuizBackground>
  );
}
