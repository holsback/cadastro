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
    state = { ...inicialState}

    clear(){
        this.setState({ user: inicialState.user})
    }
//Para incluir e alterar
    save(){
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        /*Se id for verdadeiro (existe um id, faça um imput),
        senao um post*/
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
    //Se existe um id atualiza a informação senao baseUrl cria mais um id
        axios[method] (url, user)
        .then(resp => {
            const list = this.getUpdateList(resp.data)
            this.setState({ user: inicialState.user, list})
        })
    }
}