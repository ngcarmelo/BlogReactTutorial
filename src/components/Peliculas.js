import React, { Component } from 'react';
import MensajeEstatico from './MensajeEstatico';
import Pelicula from './Pelicula';
import Slider from './Slider';
import Sidebar from './Sidebar';

/* Component Example*/
class Peliculas extends Component {
    state = {
        peliculas: [
            { titulo: 'Avengers', image: 'https://files.merca20.com/uploads/2019/04/Avengers-Endgame-Marvel-Studios.jpg' },
            { titulo: 'Avengers 2', image: 'https://files.merca20.com/uploads/2019/04/Avengers-Endgame-Marvel-Studios.jpg' },
            { titulo: 'Avengers Infinity', image: 'https://files.merca20.com/uploads/2019/04/Avengers-Endgame-Marvel-Studios.jpg' }
        ],
        nombre: 'Marvel',
        favorita: {}
    };

    cambiarTitulo = () => {
        var { peliculas } = this.state;
        // var random = Math.floor(Math.random()*3);
        peliculas[0].titulo = "Ant Man";

        this.setState({
            peliculas: peliculas
        });
    }

    favorita = (pelicula, indice) => {
        console.log(" Es mi Favorita");
        console.log(pelicula);
        console.log(indice);

        this.setState({
            favorita: pelicula
        });
    }

    componentDidMount() {
        console.log('Component Loaded');
    }
    componentWillMount() {
        console.log('Component Loaded');
    }

    componentWillUpdate() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <React.Fragment>
                <Slider title="Movies" size="slider-small" />
                <div className="center">
                    <div id="content" className="peliculas">
                        <h2 className="subheader">Movies List</h2>
                        <h3>Mejores Peliculas {this.state.nombre}</h3>
                        <div><button onClick={this.cambiarTitulo}>Change title</button></div>
                        {this.state.favorita &&
                            <p className="favorita"><strong>Favourite movie is....{this.state.favorita.titulo}</strong>
                            </p>

                        }
                        <div id="articles" className="peliculas">
                            {
                                this.state.peliculas.map((pelicula, i) => {
                                    return (
                                        <Pelicula key={i} pelicula={pelicula} marcarFavorita={this.favorita} indice={i} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <Sidebar blog="false" />
                </div>
            </React.Fragment>
        );
    }
}
export default Peliculas;