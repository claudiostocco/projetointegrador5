/* eslint-disable react/prop-types */
import React from 'react';
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


function ResultWidget({ results, name }) {
  const router = useRouter()
  return (
    <div>
      <Widget>
        <Widget.Header>
          <BackLinkArrow href="/" />
        Tela de Resultado:
      </Widget.Header>

        <Widget.Content>
          <p>
            Pontuação para {name}:
          {' '}
            {/* {results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if (isAcerto) {
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
          }, 0)} */}
          Acertou {results.filter((x) => x).length}
            {' '}
          de {results.length}
            {' '}
          perguntas
        </p>
          <ul>
            {results.map((result, index) => (
              <li key={`result__${result}`}>
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
          <CaixaCentralizada>
            <Button type='button' onClick={() => {router.push(`/newQuestion?name=${name}`)}}>Adicionar minhas questões</Button>
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
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
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
          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
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

        {/* <Widget>
          <Widget.Content>
            <CaixaFlex>
              <button onClick={() => setScreenState(screenStates.QUIZ)}>QUIZ</button>
              <button onClick={() => setScreenState(screenStates.LOADING)}>LOADING</button>
              <button onClick={() => setScreenState(screenStates.RESULT)}>RESULT</button>
            </CaixaFlex>
          </Widget.Content>  
        </Widget>   */}

      </QuizContainer>
    </QuizBackground>
  );
}
