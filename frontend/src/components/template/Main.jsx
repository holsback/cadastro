import React from 'react'
import './Main.css'
import Header from './Header'
//Main será nosso executável
export default props =>/*Componente pode retornar multiplos elementos.
Os fragmentos permitem agrupar uma lista de filhos sem adicionar nos extras ao DOM
Para usarmos o Header*/
    <React.Fragment>
        <Header {...props}/>
        <main className = "content">
            Conteúdo
        </main>
    </React.Fragment>