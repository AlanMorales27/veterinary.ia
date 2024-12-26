import React, { useEffect, useState } from 'react';
import './assets/style.css';
import ThreeScene from './components/three';
import data from "./assets/data/data-example.js"
const App = () => {

  const razas_perro = ["raza1", "raza2", "raza3", "raza4", "raza5", "raza6"];
  
  const net = new brain.NeuralNetwork();
  net.train(data);



  return(
    <main>
      <div className='principal-container'>
        <h1>
          Veterinary.ia 
        </h1>
        <form className='container-form' action="">
          <label htmlFor="nameDog">Nombre del paciente</label>
          <input type="text" id='nameDog'/>
          <label htmlFor="namePerson">Nombre del propietario</label>
          <input type="text" id='namePerson'/>
          <label htmlFor="select1"> Raza de perro</label>
          <select name="" id="select1">
            {razas_perro.map((e) => <option value={razas_perro.indexOf(e)}>{e}</option>)}
          </select>
          <textarea 
            name="" 
            id="prompt" 
            placeholder='Ingrese los sintomas del paciente'>
            </textarea>
          <button>
            Generar Diagnostico
          </button>
          <textarea name="" id="response" disabled></textarea>
        </form>
      </div>
      <div className='three-container'>
          {/* Three.js */}
          <ThreeScene/>
      </div>
    </main>
  )
};

export default App;