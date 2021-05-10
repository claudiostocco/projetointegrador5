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

const CadastroQuestao = () =>  {

}
    
CadastroQuestao.Questao = () => {
    const [titulo, setTitulo] = React.useState('')
    const [descricao, setDescricao] = React.useState('')
    const [urlImg, setUrlImg] = React.useState('')
    const [resposta,setResposta] = React.useState()

    const handleSetResposta = event => {
        const resp = Number.parseInt(event.target.value)
        Number.isInteger(resp) ? 
            ((resp > 0 && resp < 5) ? setResposta(resp) : alert('Valor deve ser entre 1 e 4!'))
        : 
            alert('Valor inválido!')
    }
    return (
        <div>
            <Input name="Titulo" onChange={event => setTitulo(event.target.value)} placeholder="Titulo para a questão" value={titulo}/>
            <Input name="Descricao" onChange={event => setDescricao(event.target.value)} placeholder="Descrição para a questão" value={descricao}/>
            <Input name="UrlImg" onChange={event => setUrlImg(event.target.value)} placeholder="URL da imagem para a questão" value={urlImg}/>
            <Input name="Resposta" onChange={handleSetResposta} placeholder="Indice para a resposta da questão" value={resposta}/>
            <hr/>
        </div>
    )}

CadastroQuestao.Opcoes = () => {
        const [opcoes,setOpcoes] = React.useState([])

        const handleNovaOp = e => {
            console.log(opcoes)
            const temp = e.target.value
            setOpcoes([...opcoes].push(temp))
            console.log(opcoes)
        }
        return (
            <div>
            {console.log('div ',opcoes)}
                {opcoes.forEach((e,i) => {
                    <Input name={`Opção ${i}`} onChange={handleNovaOp} placeholder="Titulo para a questão" value={e}/>
                })}
                <Button type='button' onClick={handleNovaOp}>Nava</Button>
            </div>
        )}

CadastroQuestao.Botao = () => {
    return (
        <CaixaFlex>
            <Button type='submit'>Incluir</Button>
        </CaixaFlex>
    )
}

export default CadastroQuestao;