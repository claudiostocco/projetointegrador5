import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../Button';
import Input from '../Input'

const CaixaFlex = styled.div`
                    display: flex;
                    justify-content: space-between;
                    margin: auto;
                    width: 250px;
                  `;


const CadastroQuestao = ({ children, ...props }) => {
    return (
        <div>
            {children}
        </div>
    )
}

CadastroQuestao.Questao = () => {
    const [titulo, setTitulo] = React.useState('')
    const [descricao, setDescricao] = React.useState('')
    const [urlImg, setUrlImg] = React.useState('')
    const [resposta, setResposta] = React.useState()
    const handleSetResposta = event => {
        const resp = Number.parseInt(event.target.value)
        Number.isInteger(resp) ?
            ((resp > 0 && resp < 5) ? setResposta(resp) : alert('Valor deve ser entre 1 e 4!'))
            :
            alert('Valor inválido!')
    }
    return (
        <div>
            <Input name="Titulo" onChange={event => setTitulo(event.target.value)} placeholder="Titulo para a questão" value={titulo} />
            <Input name="Descricao" onChange={event => setDescricao(event.target.value)} placeholder="Descrição para a questão" value={descricao} />
            <Input name="UrlImg" onChange={event => setUrlImg(event.target.value)} placeholder="URL da imagem para a questão" value={urlImg} />
            <Input name="Resposta" onChange={handleSetResposta} placeholder="Indice para a resposta da questão" value={resposta} />
            <hr />
        </div>
    )
}

CadastroQuestao.Opcoes = () => {
    const [opcoes, setOpcoes] = React.useState(["", "", "", "", ""])
    const handleNovaOp = (e, i) => {
        console.log('antes', opcoes)
        const opcoesNova = [...opcoes]
        opcoesNova[i] = e.target.value
        setOpcoes(opcoesNova)
    }
    return (
        <div>
            <Input name={`Op0`} onChange={event => handleNovaOp(event, 0)} placeholder={`Opção 1`} value={opcoes[0]} />
            <Input name={`Op1`} onChange={event => handleNovaOp(event, 1)} placeholder={`Opção 2`} value={opcoes[1]} />
            <Input name={`Op2`} onChange={event => handleNovaOp(event, 2)} placeholder={`Opção 3`} value={opcoes[2]} />
            <Input name={`Op3`} onChange={event => handleNovaOp(event, 3)} placeholder={`Opção 4`} value={opcoes[3]} />
            <Input name={`Op4`} onChange={event => handleNovaOp(event, 4)} placeholder={`Opção 5`} value={opcoes[4]} />

            {/* {console.log('div ->',opcoes)}
                {opcoes.forEach((e,i) => {
                    {console.log('Input ->',e)}
                    <Input name={`Op${i}`} onChange={event => handleNovaOp(event,i)} placeholder={`Opção ${i+1}`} value={opcoes[i]}/>
                })} */}
        </div>
    )
}

CadastroQuestao.Botao = () => {
    const handleIncluir = () => {
        console.log('')
    }
    return (
        <CaixaFlex>
            <Button type='submit'>Incluir</Button>
        </CaixaFlex>
    )
}

export default CadastroQuestao;