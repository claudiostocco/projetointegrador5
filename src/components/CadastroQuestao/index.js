import { useState } from 'react'
import styled from 'styled-components'
import Input from '../Input'

export default function CadastroQuestao()  {
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

        </div>
    )
}