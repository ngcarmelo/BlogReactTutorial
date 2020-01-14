import React, { Component } from 'react';
import MiComponente from './MiComponente';

class SeccionPruebas extends Component {
    contador = 0;

    /* Long way */
    /*  constructor(props){
          super(props);
          this.state = {
              contador : 0
          };
      }*/

    /* Short wary */

    state = {
        contador: 0
    };

    HolaMundo(nombre, edad) {
        var presentacion = (
            <div>
                <h2>Hola, soy {nombre}</h2>
                <h3>Tengo {edad} años</h3>
            </div>
        );
        return presentacion;
    }

    /*sumar() {
        this.setState({
            contador: (this.state.contador + 1)
        });
    }*/

    sumar = (e) => {
        this.setState({
            contador: (this.state.contador + 1)
        });
    }


    /*restar() {
        this.setState({
            contador: (this.state.contador - 1)
        });
    }*/

    restar =(e) => {
        this.setState({
            contador: (this.state.contador - 1)
        });
    }

    render() {
        var nombre = "Carmelo Navarro";
        return (
            <section id="content">
                <h2 className="subheader">Últimos artículos</h2>
                <p>Learning React</p>
                <h2 className="subheader">Funciones y JXS basico</h2>
                {this.HolaMundo(nombre, 37)}
                <h2 className="subheader">Componentes</h2>
                <section className="components">
                    <MiComponente />
                    <MiComponente />
                </section>
                <h2 className="subheader">Practicas Estados</h2>
                <p>Contador: {this.state.contador}</p>
                <p>
                    <input type="button" value="Sumar" onClick={this.sumar} />
                    <input type="button" value="Sumar" onClick={this.sumar.bind(this)} />
                    <input type="button" value="Restar" onClick={this.restar.bind(this)} />
                </p>

            </section>

        );
    }


}

export default SeccionPruebas;