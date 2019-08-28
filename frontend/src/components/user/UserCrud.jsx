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
getUpdateList(user){
        const list = this.state.list.filter(u => u.id !== user.id)
        list.unshift(user)
        return list
    }
updateField(event){
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user 
        })
    }  
}

    renderForm(){
        return(
            <div className="form">
                <div className="col-12 col-md-6">
                    <label>Nome</label>
                    <input type="text" className="form-control"
                    name="name"
                    value={this.state.user.name}
                    onChange={e => this.updateField(e)}
                    placeholder="Nome = "></input>
                </div>
            </div>
            <div className="col-12 col-md-6">
                <div className="Form-group">
                    <label>Email</label>
                    <input type="text" className="form-control"
                    name="email"
                    value={this.state.user.email}
                    onChange={e => this.updateField(e)}
                    placeholder="Email = "></input>
                </div>
            </div>

        )
    }