import React, { Component } from "react";
import Main from "../template/Main";
import axios from "axios";

const heardProps = {
  icon: "produto text-danger",
  title: "Produtos",
  subtitle: "Cadastro: Incluir, Lista, Alterar e Excluir!"
};

//Localizando nosso banco
const baseUrl = "http://localhost:3001/produtos";
//Estado inicial - Quando sobe a aplicação
const inicialState = {
  produto: { Produto: "", quantidade: "" ,valor: "" ,},
  list: []
};

export default class ProdCrud extends Component {
  state = { ...inicialState };

  //Será chamado antes do componente na tela
  //farei uma chamada no backEnd da lista
  componentWillMount() {
    axios(baseUrl).then(resp => {
      this.setState({ list: resp.data });
    });
  }

  clear() {
    this.setState({ produto: inicialState.produto });
  }
  //Para incluir e alterar
  save() {
    const produto = this.state.produto;
    const method = produto.id ? "put" : "post";
    /*Se id for verdadeiro (existe um id, faça um put),
        senao um post */
    const url = produto.id ? `${baseUrl}/${produto.id}` : baseUrl;
    //Se existe um id atualiza a informação senão baseUrl cria mais um id
    axios[method](url, produto).then(resp => {
      //getUpdateLIst será criada
      const list = this.getUpdateList(resp.data);
      this.setState({ produto: inicialState.produto, list });
    });
  }
  //Atualizando a lista
  getUpdateList(produto) {
    //Cria uma nova lista a partir do filter
    //u => cria uma lista a separando o id que passou
    //Unshift coloca esse id na primeira posição do array
    //return list atualiza a linha 35 que atualiza o estado.
    const list = this.state.list.filter(p => p.id !== produto.id);
    list.unshift(produto);
    return list;
  }

  updateField(event) {
    //user será o clone (ou recebe o valor) do estado user
    //clonamos para não alterar o objeto direatamente
    const produto= { ...this.state.produto };
    //seta o que está em input e virá value
    produto[event.target.name] = event.target.value;
    //set insere
    this.setState({ produto });
  }
  //Jsx para renderizar o formulário.
  renderForm() {
    return (
      <div className="form">
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label>Produto</label>
            <input
              type="text"
              className="form-control"
              name="Produto"
              value={this.state.produto.Produto}
              onChange={e => this.updateField(e)}
              placeholder="Nome do produto"
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label>Quantidade</label>
            <input
              type="text"
              className="form-control"
              name="quantidade"
              value={this.state.produto.quantidade}
              onChange={e => this.updateField(e)}
              placeholder="Digite a quantidade"
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label>Valor</label>
            <input
            type="text"
            className="form-control"
            name="valor"
            value={this.state.produto.valor}
            onChange={e => this.updateField(e)}
            placeholder="Digite o Valor"
            />
            </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={e => this.save(e)}>
              salvar
            </button>
            <button
              className="btn btn-secundary ml-2"
              onClick={e => this.clear(e)}
            >
              cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  //Atualizar o estado do objeto
  load(produto) {
    this.setState({ produto });
  }

  remove(produto) {
    //Deleta na base então repasa a lista atualizando
    axios.delete(`${baseUrl}/${produto.id}`).then(resp => {
      const list = this.state.list.filter(p => p !== produto);
      this.setState({ list });
    });
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <th>ID</th>
          <th>Produto</th>
          <th>quantidade</th>
          <th>valor</th>
          <th>Ações</th>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }
  renderRows() {
    return this.state.list.map(produto => {
      return (
        <tr key={produto.id}>
          <td>{produto.id}</td>
          <td>{produto.Produto}</td>
          <td>{produto.quantidade}</td>
          <td>{produto.valor}</td>
          <td>
            <button className="btn btn=warning">
              <i className="fa fa-pencil" onClick={() => this.load(produto)} />
            </button>
            <button className="btn btn-danger ml-2">
              <i className="fa fa-trash" onClick={() => this.remove(produto)} />
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
