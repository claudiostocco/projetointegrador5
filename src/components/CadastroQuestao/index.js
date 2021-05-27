import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Button from '../Button'
import Input from '../Input'
import Widget from '../Widget'

const CaixaFlex = styled.div`
                    display: flex;
                    justify-content: space-between;
                    margin: auto;
                    width: 250px;
                  `;


const CadastroQuestao = ({ children, ...props }) => {

    const Botao = ({handleIncluir}) => {
        return (
            <CaixaFlex>
                <Button type='submit' onClick={handleIncluir}>Incluir</Button>
            </CaixaFlex>
        )
    }

    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [urlImg, setUrlImg] = useState('')
    const [resposta, setResposta] = useState('')
    const handleSetResposta = event => {
        const resp = Number.parseInt(event.target.value)
        Number.isInteger(resp) ?
            ((resp > 0 && resp < 5) ? setResposta(event.target.value) : alert('Valor deve ser entre 1 e 4!'))
            :
            alert('Valor inválido!')
    }
    const [opcoes, setOpcoes] = useState(["", "", "", ""])
    const handleNovaOp = (e, i) => {
        const opcoesNova = [...opcoes]
        opcoesNova[i] = e.target.value
        setOpcoes(opcoesNova)
    }

    const handleIncluir = async () => {
        console.log('Titulo: ',titulo,'\nResposta: ',resposta,'\nOpções: ',opcoes)
        const newQ = {
            alternatives: opcoes.filter(value => value != ''),
            answer: Number.parseInt(resposta)-1,
            description: descricao,
            title: titulo,
            image: urlImg
        }
        // console.log();
        console.log('\n');
        console.log(newQ)

        const status = await axios.post(`${document.location.origin}/api/dbQuestions`,newQ)
        console.log('\n')
        console.log(status)
    }

    return (
        <div>
            <Widget.Content>
                <Input name="Titulo" onChange={event => setTitulo(event.target.value)} placeholder="Titulo para a questão" value={titulo} />
                <Input name="Descricao" onChange={event => setDescricao(event.target.value)} placeholder="Descrição para a questão" value={descricao} />
                <Input name="UrlImg" onChange={event => setUrlImg(event.target.value)} placeholder="URL da imagem para a questão" value={urlImg} />
                <Input name="Resposta" onChange={handleSetResposta} placeholder="Indice para a resposta da questão" value={resposta} />
            </Widget.Content>
            <Widget.Content>
                <Input name={`Op0`} onChange={event => handleNovaOp(event, 0)} placeholder={`Opção 1`} value={opcoes[0]} />
                <Input name={`Op1`} onChange={event => handleNovaOp(event, 1)} placeholder={`Opção 2`} value={opcoes[1]} />
                <Input name={`Op2`} onChange={event => handleNovaOp(event, 2)} placeholder={`Opção 3`} value={opcoes[2]} />
                <Input name={`Op3`} onChange={event => handleNovaOp(event, 3)} placeholder={`Opção 4`} value={opcoes[3]} />
            </Widget.Content>
            <Widget.Content>
                <Botao handleIncluir={handleIncluir}/>
            </Widget.Content>
        </div>
    )
}
// https://imasters.com.br/front-end/simplificando-componentes-com-react-hooks
export default CadastroQuestao;