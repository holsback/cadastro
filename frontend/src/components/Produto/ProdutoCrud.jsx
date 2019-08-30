import React, { Component } from "react";
import Main from "../template/Main";
import axios from "axios";

const heardProps = {
  icon: "fab fa-product-hunt text-danger",
  title: "Produtos",
  subtitle: "Produtos: Incluir, Lista, Alterar e Excluir!"
};

//Localizando nosso banco
const baseUrl = "http://localhost:3001/produtos";
//Estado inicial - Quando sobe a aplicação
const inicialState = {
  produtos: { NomeProduto: "", Quantidade: "", Valor: "" },
  list: []
};

export default class ProdutoCrud extends Component {
  state = { ...inicialState };

  //Será chamado antes do componente na tela
  //farei uma chamada no backEnd da lista
  componentWillMount() {
    axios(baseUrl).then(resp => {
      this.setState({ list: resp.data });
    });
  }

  clear() {
    this.setState({ produtos: inicialState.produtos });
  }
  //Para incluir e alterar
  save() {
    const produtos = this.state.produtos;
    const method = produtos.id ? "put" : "post";
    /*Se id for verdadeiro (existe um id, faça um put),
        senao um post */
    const url = produtos.id ? `${baseUrl}/${produtos.id}` : baseUrl;
    //Se existe um id atualiza a informação senão baseUrl cria mais um id
    axios[method](url, produtos).then(resp => {
      //getUpdateLIst será criada
      const list = this.getUpdateList(resp.data);
      this.setState({ produtos: inicialState.produtos, list });
    });
  }
  //Atualizando a lista
  getUpdateList(produtos) {
    //Cria uma nova lista a partir do filter
    //u => cria uma lista a separando o id que passou
    //Unshift coloca esse id na primeira posição do array
    //return list atualiza a linha 35 que atualiza o estado.
    const list = this.state.list.filter(u => u.id !== produtos.id);
    list.unshift(produtos);
    return list;
  }

  updateField(event) {
    //user será o clone (ou recebe o valor) do estado user
    //clonamos para não alterar o objeto direatamente
    const produtos = { ...this.state.produtos };
    //seta o que está em input e virá value
    produtos[event.target.NomeProduto] = event.target.value;
    //set insere
    this.setState({ produtos });
  }
  //Jsx para renderizar o formulário.
  renderForm() {
    return (
      <div className="produtos">
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label>Nome Produto</label>
            <input
              type="text"
              className="form-control"
              name="Nome Produto"
              value={this.state.produtos.NomeProduto}
              onChange={e => this.updateField(e)}
              placeholder="Digite o nome do produto"
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label>Quantidade</label>
            <input
              type="text"
              className="form-control"
              name="Quantidade"
              value={this.state.produtos.Quantidade}
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
              name="Valor"
              value={this.state.produtos.Valor}
              onChange={e => this.updateField(e)}
              placeholder="Digite o valor"
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
  load(produtos) {
    this.setState({ produtos });
  }

  remove(produtos) {
    //Deleta na base então repasa a lista atualizando
    axios.delete(`${baseUrl}/${produtos.id}`).then(resp => {
      const list = this.state.list.filter(u => u !== produtos);
      this.setState({ list });
    });
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <th>ID</th>
          <th>Nome do Produto</th>
          <th>Quantidade</th>
          <th>Valor</th>
          <th>Ações</th>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }
  renderRows() {
    return this.state.list.map(produtos => {
      return (
        <tr key={produtos.id}>
          <td>{produtos.id}</td>
          <td>{produtos.NomeProduto}</td>
          <td>{produtos.Quantidade}</td>
          <td>{produtos.Valor}</td>
          <td>
            <button className="btn btn=warning">
              <i className="fa fa-pencil" onClick={() => this.load(produtos)} />
            </button>
            <button className="btn btn-danger ml-2">
              <i className="fa fa-trash" onClick={() => this.remove(produtos)} />
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
