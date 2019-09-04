import React, { Component } from 'react';
import Main from '../template/Main';
import axios from 'axios';

const heardProps = {
  icon: 'users text-danger',
  title: 'Login',
  subtitle: 'Acesse o sistema!'
};

//Localizando nosso banco
const baseUrl = 'http://localhost:3001/Login';
//Estado inicial - Quando sobe a aplicação
const inicialState = {
  Login: { cpf: '', senha: '' },
  list: []
};
function naodirecionar() {
    window.location.href = "http://localhost:3000"
}

export default class Home extends Component {
  state = { ...inicialState };

  //Será chamado antes do componente na tela
  //farei uma chamada no backEnd da lista
  componentWillMount() {
    axios(baseUrl).then(resp => {
      this.setState({ list: resp.data });
    });
  }

  clear() {
    this.setState({ Login: inicialState.Login });
  }
  //Para incluir e alterar
  save() {
    const Login = this.state.Login;
    const method = Login.id ? 'put' : 'post';
    /*Se id for verdadeiro (existe um id, faça um put),
            senao um post */
    const url = Login.id ? `${baseUrl}/${Login.id}` : baseUrl;
    //Se existe um id atualiza a informação senão baseUrl cria mais um id
    axios[method](url, Login).then(resp => {
      //getUpdateLIst será criada
      const list = this.getUpdateList(resp.data);
      this.setState({ Login: inicialState.Login, list });
    });
  }
  //Atualizando a lista
  getUpdateList(Login) {
    //Cria uma nova lista a partir do filter
    //u => cria uma lista a separando o id que passou
    //Unshift coloca esse id na primeira posição do array
    //return list atualiza a linha 35 que atualiza o estado.
    const list = this.state.list.filter(u => u.id !== Login.id);
    list.unshift(Login);
    return list;
  }

  updateField(event) {
    //user será o clone (ou recebe o valor) do estado user
    //clonamos para não alterar o objeto direatamente
    const Login = { ...this.state.Login };
    //seta o que está em input e virá value
    Login[event.target.name] = event.target.value;
    //set insere
    this.setState({ Login });
  }
  //Jsx para renderizar o formulário.
  renderForm() {
    return (
      <div className="form">
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={this.state.Login.nome}
              onChange={e => this.updateField(e)}
              placeholder="Digite Seu Nome"
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label>Senha</label>
            <input
              type="text"
              className="form-control"
              name="senha"
              value={this.state.Login.senha}
              onChange={e => this.updateField(e)}
              placeholder="Digite sua senha"
            />
          </div>
        </div>

        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <a href="/http://localhost:3000/User#/user">
              <button className="btn btn-primary" onClick={e => this.save(e)}>
                Acessar
              </button>
            </a>
            <button className="btn btn-secundary ml-2" onClick={e => this.clear(e)}>
              cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  //Atualizar o estado do objeto
  load(Login) {
    this.setState({ Login });
  }

  remove(Login) {
    //Deleta na base então repasa a lista atualizando
    axios.delete(`${baseUrl}/${Login.id}`).then(resp => {
      const list = this.state.list.filter(u => u !== Login);
      this.setState({ list });
    });
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead></thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }
  renderRows() {
    return this.state.list.map(Login => {
      return (
        <tr key={Login.id}>
          <td>{Login.id}</td>
          <td>{Login.cpf}</td>
          <td>{Login.senha}</td>
          <td>
            <button className="btn btn=warning">
              <i className="fa fa-pencil" onClick={() => this.load(Login)} />
            </button>
            <button className="btn btn-danger ml-2">
              <i className="fa fa-trash" onClick={naodirecionar} />
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Main {...heardProps}>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    );
  }
}
