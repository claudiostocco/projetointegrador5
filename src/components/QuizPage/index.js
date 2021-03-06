/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components'
import db from '../../../db.json';
import Widget from '../Widget';
import QuizLogo from '../QuizLogo';
import QuizBackground from '../QuizBackground';
import QuizContainer from '../QuizContainer';
import AlternativesForm from '../AlternativesForm';
import Button from '../Button';
import BackLinkArrow from '../BackLinkArrow';
import { useRouter } from "next/router";

const CaixaFlex = styled.div`
                    display: flex;
                    justify-content: space-between;
                    margin: auto;
                    width: 250px;
                  `;

const CaixaCentralizada = styled.div`
display: flex;
justify-content: center;
margin: auto;
width: 100%;
`;

const GridRanking = styled.div`
display: grid;
grid-gap: 1rem;
grid-template-columns: 1fr 4fr 1fr;
`;

function Ranking({posicao,nome,pontos}) {
  return (
    <GridRanking>
      <div>{posicao}</div>
      <div>{nome}</div>
      <div>{pontos}</div>
    </GridRanking>
  )
}

function ResultWidget({ results, name }) {
  const router = useRouter()
  // const [ranking,setRanking] = useState([])
  let ranking = []
  const verificaAcertos = () => {
    const hits = results.filter((x) => x).length
    const enjoyment = hits / results.length
    const newRanking = {
      name,
      questions: results.length,
      hits,
      enjoyment
    }
    console.log(newRanking)
    const rankingPosition = [
      {name: newRanking.name, enjoyment: newRanking.enjoyment},
      {name: "Fulano 1", enjoyment: 0.6},
      {name: "Fulano 2", enjoyment: 0.5},
      {name: "Fulano 3", enjoyment: 0.4},
      {name: "Fulano 4", enjoyment: 0.3},
    ]
    console.log('\n')
    console.log(rankingPosition)
    ranking = rankingPosition
    //setRanking(rankingPosition)

    // const status = await axios.post(`${document.location.origin}/api/dbRanking`,ranking)
    // console.log('\n')
    // console.log(status)
    // if (status.status == 200) {
    //   console.log(status.data)
    //     //alert('Quest??o inclu??da com sucesso!')
    // }

    return hits
  }
  return (
    <div>
      <Widget>
        <Widget.Header>
          <BackLinkArrow href="/" />
        Tela de Resultado:
      </Widget.Header>

        <Widget.Content>
          <p>
            Pontua????o para {name}:
          {' '}
            {/* {results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if (isAcerto) {
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
          }, 0)} */}
          Acertou {verificaAcertos()}
            {' '}
          de {results.length}
            {' '}
          perguntas
        </p>
          <ul>
            {results.map((result, index) => (
              <li key={`result__${index}`}>
                #
                {index + 1}
                {' '}
              Resultado:
                {result === true
                  ? 'Acertou'
                  : 'Errou'}
              </li>
            ))}
          </ul>
        </Widget.Content>
      </Widget>
      <Widget>
        <Widget.Content>
          <h2>Ranking</h2>
          <ul>
            <li key={`ranking__Cab`}>
              <Ranking posicao="Posi????o" nome="Nome" pontos="Pontua????o"/>
            </li>
            {ranking.map((result, index) => (
              <li key={`ranking__${index}`}>
                <Ranking posicao={index + 1} nome={result.name} pontos={result.enjoyment ? result.enjoyment * 100 : 0}/>
              </li>
            ))
            }
          </ul>
        </Widget.Content>
      </Widget>
      <Widget>
        <Widget.Content>
          <CaixaCentralizada>
            <Button type='button' onClick={() => {router.push(`/newQuestion?name=${name}`)}}>Adicionar minhas quest??es</Button>
            {/* <button onClick={() => setScreenState(screenStates.LOADING)}>LOADING</button>
            <button onClick={() => setScreenState(screenStates.RESULT)}>RESULT</button> */}
          </CaixaCentralizada>
        </Widget.Content>
      </Widget>
    </div>
  );
}

function LoadingWidget({name}) {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        Bem vindo {name}
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descri????o"
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'contain',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <p>Voc?? acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Voc?? errou!</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
  VAZIO: 'VAZIO'
};
export default function QuizPage({questions}) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = questions[questionIndex];
  const [name,setName] = React.useState('');

  function addResult(result) {
    // results.push(result);
    setResults([
      ...results,
      result,
    ]);
  }

  // [React chama de: Efeitos || Effects]
  // React.useEffect
  // atualizado === willUpdate
  // morre === willUnmount
  React.useEffect(() => {
    setName(window.location.search.split('=')[1])
    // const name = 'Claudio'
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  // nasce === didMount
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo logoImage={db.logo}/>
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget name={name} />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} name={name} />}

        <Widget>
          <Widget.Content>
            <CaixaFlex>
              <button onClick={() => setScreenState(screenStates.QUIZ)}>QUIZ</button>
              <button onClick={() => setScreenState(screenStates.LOADING)}>LOADING</button>
              <button onClick={() => setScreenState(screenStates.RESULT)}>RESULT</button>
            </CaixaFlex>
          </Widget.Content>  
        </Widget>  

      </QuizContainer>
    </QuizBackground>
  );
}
