import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import Logo from '../components/template/Logo'
import Nav from '../components/template/Nav'
//Main, nele já importa o header
import Main from '../components/template/Main'
import Footer from '../components/template/Footer'

export default props =>
    <div className="app">
        <Logo />
        <Nav />
        <Main icon="graduation-cap text-danger" title="Sesi Senai"
            subtitle="Tela de cadastro"/>
            <div className = 'display-4'>Teste</div>
                <hr />
                <p className="mb-0">Cadastro</p>
        <Footer />
    </div>