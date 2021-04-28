import React from 'react';
import QuizPage from '../../src/components/QuizPage'
import db from '../../db.json'

export default function Quiz({externalQuestions}) {
    return (
        <QuizPage questions={externalQuestions}/>
    )
}

export async function getServerSideProps(context) {
    try {
        const questions = [...db.questions]
        const externalQuestions = await db.external.reduce(async (ac,externalUrl) => {
            const externalDb = await fetch(`${externalUrl}/api/db`)
                                      .then(response => {
                                         if (response.ok) 
                                            return response.json()
                                         else
                                            throw Error(`Erro ao obter dados: ${response.status}-${response.statusText}`)
                                      })
                                      .then(dados => dados)
            // console.log(externalDb.questions)
            return [...(await ac),...externalDb.questions]
        },questions)
        console.log('externalQuestions',externalQuestions)
        return {
            props: {
                externalQuestions
            }
        }
    } catch (error) {
        console.log(error)
    }
}