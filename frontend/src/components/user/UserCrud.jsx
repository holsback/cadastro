import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const heardProps = {
    icon: 'users text-danger',
    title: 'Usuários',
    subtitle: 'Cadastro: Incluir, Lista, Alterar e Excluir!'
}

//Localização do banco
const baseUrl = "http://localhost:3001/user"
//Estado inicial - Quando sobe a aplicação
const inicialState = {
    user: {name: '', email: ''},
    list: []
}

export default class UserCrud extends Component {
    render(){
        return(
            <Main {...heardProps}>
                Teste de cadastro
            </Main>
        )
    }
}