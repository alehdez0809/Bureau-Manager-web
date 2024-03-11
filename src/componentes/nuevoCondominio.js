import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function NuevoCondominio() {
  const [formulario, setFormulario] = useState({
    nombre_condominio: '',
    direccion_condominio: ''
  });

  const [errorCorreo, setErrorCorreo] = useState('');
  const [errorContraseña, setErrorContraseña] = useState('');

  const [visible, setVisible] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;
    setFormulario(prevState => ({ ...prevState, [name]: value }));
    if (name === 'nombre_condominio') {
      if (value.trim() === '') {
        setErrorCorreo('*Ingrese un nombre de condominio');
      } else {
        setErrorCorreo('');
      }
    }
    // Validación de contraseña
    if (name === 'direccion_condominio') {
      if (value.trim() === '') {
        setErrorContraseña('*Ingrese una direccion de condominio');
      } else {
        setErrorContraseña('');
      }
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (formulario.nombre_condominio.trim() === '') {
      setErrorCorreo('*Ingrese un nombre de condominio');
    }
    if (formulario.direccion_condominio.trim() === '') {
      setErrorContraseña('*Ingrese una direccion de condominio');
    }
    if (formulario.nombre_condominio.trim() !== '' && formulario.direccion_condominio.trim() !== '') {
      try {
        const resultado = await axios.post('http://localhost:4000/api/registrarCondominio', formulario);
        if (resultado.data === 200) {
          setVisible(true);

          formulario.nombre_condominio='';
          formulario.direccion_condominio='';

        } else {
          alert(resultado.data);
        }
      } catch (error) {
        console.error(error);
        alert('Error al registrar el condominio');
      }
    }
  };

    return (
          <form onSubmit={handleSubmit}>
            <h1>Registro de nuevo Condominio</h1>
            <div class="form-group">
              <label className='labelInput'>Nombre del condominio: </label>
              <input
                type="text"
                id="nombre_condominio"
                name="nombre_condominio"
                placeholder="Nombre del Condominio"
                value={formulario.nombre_condominio}
                onChange={handleChange}
              />
            {<div className="error-message">{errorCorreo}</div>}
            </div>
            <div class="form-group">
              <label className='labelInput'>Direccion del condominio: </label>
              <input
                type="text"
                id="direccion_condominio"
                name="direccion_condominio"
                placeholder="Direccion del Condominio"
                value={formulario.direccion_condominio}
                onChange={handleChange}
              />
            {<div className="error-message">{errorContraseña}</div>}
            </div>
            <div className="botones-container">
              <Link to="/EdicionyRegistro">
                <button className="mi-boton2">Regresar</button>
              </Link>
            <button className="mi-boton2" type='submit'>Registrar</button>
            </div>
            <div className='Aceptado' style={{ display: visible ? 'block' : 'none' }}>Registro exitoso</div>
          </form>   
    );
  }
  export default NuevoCondominio;