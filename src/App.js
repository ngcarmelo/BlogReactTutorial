import React from 'react';
import logo from './assets/images/logo.svg';
import './assets/css/App.css';
//Import Components
import MiComponente from './components/MiComponente';
import Peliculas from './components/Peliculas';
import Header from './components/Header';
import Slider from './components/Slider';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import SeccionPruebas from './components/SeccionPruebas';
import Router from './Router';


function App() {
  var buttonString = "Our Blog";
  return (
    <div className="App">
    
      {
        /*<Peliculas/>*/
      }
      <Router />

    </div>
  );
}

export default App;
