import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Pelicula extends Component {

    marcar = () =>{
        this.props.marcarFavorita(this.props.pelicula, this.props.indice);
    }

    render() {
        const { titulo, image } = this.props.pelicula
        const pelicula = this.props.pelicula;
        return (
            <article className="article-item" id="article-template">
                <div className="image-wrap">
                    <img src={image} alt={titulo} />
                </div>

                <h2>{titulo}</h2>
                <span className="date">
                    5 minutes ago
            </span>
                <Link to="/blog">Leer más</Link>
                <button onClick={this.marcar}>
                    Check as a favourite
                </button>

                <div className="clearfix"></div>
            </article>

        )
    }

}
export default Pelicula;