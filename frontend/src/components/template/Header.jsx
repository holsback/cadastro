import React from 'react'
import './Header.css'

export default props =>
    <header className="header d-none d-sm-flex flex-column">
        <h1 className = "mt-3">
            <i className={`fa fa-${props.icon}`}></i> {props.title}
        </h1>

        <h6>
            Ciência, robótica, inovação e tecnologia para o dia a dia dos nossos alunos
        </h6>
    </header>