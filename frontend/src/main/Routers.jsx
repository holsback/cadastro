import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
//escolha, rota, redirecionar
import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'
import ProdutoCrud from '../components/Produto/ProdutoCrud'

export default props =>
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/User' component={UserCrud}/>
        <Route path='/produtos' component={ProdutoCrud}/>
        <Redirect from ='*' to='/' />
    </Switch>