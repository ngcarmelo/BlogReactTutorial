import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import SeccionPruebas from './components/SeccionPruebas';
import MiComponente from './components/MiComponente';
import Peliculas from './components/Peliculas';
import Error from './components/Error';
import Header from './components/Header';
import Slider from './components/Slider';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './components/Home';
import Blog from './components/Blog';
import Formulario from './components/Formulario';
import Search from './components/Search';
import Article from './components/Article';
import CreateArticle from './components/CreateArticle';
import EditArticle from './components/EditArticle';


class Router extends Component {

    render() {
        return (

            <BrowserRouter>
                <Header />

                {/* CONFIGURATE ROUTES AND PAGES */}
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/blog" component={Blog} />
                    <Route exact path="/blog/busqueda/:search" component={Search} />
                    <Route exact path="/redirect/:search" render={
                        (props) => {
                            var search = props.match.params.search;
                            return (
                                <Redirect to={'/blog/busqueda/' + search} />
                            );
                        }
                    } />
                    <Route exact path="/blog/articulo/:id" component={Article} />
                    <Route exact path="/blog/crear" component={CreateArticle} />
                    <Route exact path="/blog/editar/:id" component={EditArticle} />

                    <Route exact path="/formulario" component={Formulario} />
                    <Route exact path="/peliculas" component={Peliculas} />


                    <Route exact path="/segunda-ruta" component={MiComponente} />

                    <Route exact path="/pagina-1" render={() => (
                        <h1>Hola mundo desde la ruta Pagina 1</h1>
                    )} />


                    <Route exact path="/pruebas/:id" render={(props) => {
                        var id = props.match.params.id; //params from URL
                        return (

                            <div>
                                <h2 className="subheader">Pagina de pruebas</h2>
                                <h2>{id}</h2>

                            </div>


                        )
                    }} />

                    <Route component={Error} />
                </Switch>

                <div className="clearfix"></div>

                <Footer />

            </BrowserRouter>

        );
    }


}

export default Router;