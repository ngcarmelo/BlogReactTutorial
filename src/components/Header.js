import React, { Component } from 'react';
import logo from '../assets/images/logo.svg';
import { NavLink } from 'react-router-dom';
class Header extends Component {
    render() {
        return (
            <header id="header">
                <div className="center">
                    { /* LOGO */}
                    <div id="logo">
                        <img src={logo} className="app-logo" alt="Logotipo" />
                        <span id="brand">
                            <strong>Curso</strong>React
                    </span>
                    </div>

                    { /* MENU */}
                    <nav id="menu">
                        <ul>
                            <li>
                                <NavLink to="/home" activeClassName="active">Home</NavLink>
                            </li>
                            <li>
                            <NavLink to="/blog" activeClassName="active">Blog</NavLink>
                            </li>
                            <li>
                            <NavLink to="/formulario" activeClassName="active">Form</NavLink>
                            </li>
                            <li>
                            <NavLink to="/peliculas" activeClassName="active">Movies</NavLink>
                            </li>
                            <li>
                            <NavLink to="/pagina-2" activeClassName="active">More..</NavLink>
                            </li>
                        </ul>
                    </nav>

                    { /* clean float */}
                    <div className="clearfix"></div>
                </div>
            </header>
        );
    }


}

export default Header;