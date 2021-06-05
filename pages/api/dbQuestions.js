import db from '../../dbQuestions.json';
import fs from 'fs';

export default async function dbHandler(request, response) {
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  } else if (request.method === 'PUT') {
    
  } else if (request.method === 'POST') {
    if (request.body) {
      console.log('\n\n')
      console.log(request.body)
      console.log('\n')
      // console.log(db.questions)
      db.questions.push(request.body)
      const json = JSON.stringify(db)
      await fs.writeFileSync('dbQuestions.json', json, 'utf8')
      // fs.realpath('dbQuestions.json',(err,path) => {
      //   if (err)
      //     console.log(err)
      //   else
      //     console.log(path)
      // })
      response.status(200).end()
    } else {
      response.status(400).end()
    }
    return
  } else {
    response.json(db || JSON.parse('[]'));
  }
}