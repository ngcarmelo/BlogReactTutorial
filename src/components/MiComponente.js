//import React  from 'react';
import React, { Component } from 'react';

//class MiComponente extends React.Component {
class MiComponente extends Component {
    render() {

        let receta = {
            nombre: 'Pizza',
            ingredientes: ['Tomate', 'Queso', 'Jamon cocido'],
            calorias: 400
        };


        return (
           
            <React.Fragment>
                <h1>Hello World I am  MiComponente</h1>
                <h2>Let's go</h2>
                <h1>{'Receta' + receta.nombre}</h1>
                <h2>{'Calorias' + receta.calorias}</h2>
                <ol>
                    {
                        receta.ingredientes.map((ingrediente, i) => {
                            console.log(ingrediente);
                            return (
                                <li key={i}>{ingrediente}</li>
                            );
                        })
                    }
                </ol>


            </React.Fragment>
        );
    }


}

export default MiComponente;