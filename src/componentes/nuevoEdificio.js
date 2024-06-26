import React, { useState, useEffect } from 'react';
import axios from 'axios';



function NuevoEdificio() {
  const [formulario, setFormulario] = useState({
    id_condominio: '',
    nombre_edificio: ''
  });
  const [visible, setVisible] = useState(false);
  const [condominios, setCondominios] = useState([]);
  const [error, setError] = useState('');
  const [errorEdificio, setErrorEdificio] = useState('');

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('authData'));
    const id_administrador = parseInt(authData?.id);
    axios.get(`http://localhost:4000/api/getCondominios/${id_administrador}`)
      .then(response => {
        if (response.data.length > 0){
          setCondominios(response.data);
          setFormulario(prevState => ({
            ...prevState,
            id_condominio: response.data[0].id_condominio
          }));
        }else{
          setError('Debes registrar antes un condominio');
        }      
      })
      .catch(error => {
        console.log(error);
        if (error.response && error.response.status === 404) {   
          ///
          setError('Debes registrar antes un condominio');
        } else {
          alert('Error al obtener los condominios');
        }
      });
        document.body.classList.add('body2');

        return () => {
            document.body.classList.remove('body2');
        };

  }, []);

  const handleChange = event => {
    const { name, value } = event.target;
    setFormulario(prevState => ({ ...prevState, [name]: value }));
  };

  let opciones;
  if (condominios.length === 0) {
    opciones = <option value="Defecto">No hay condominios disponibles</option>;
  } else {
    opciones = condominios.map(c => <option key={c.id_condominio} value={c.id_condominio}>{c.nombre_condominio}</option>);
  }

  const handleChangeSelect = event => {
    const elegido=parseInt(event.target.value)
    const selectedCondominio = condominios.find(c => c.id_condominio === elegido);

    if (selectedCondominio) {
      setError('');
      setFormulario(prevState => ({
        ...prevState,
        id_condominio: selectedCondominio.id_condominio
      }));
    }else{
      setError('Debes registrar antes un condominio');
    }
  };


  const handleSubmit = async event => {
    event.preventDefault();
    if (formulario.id_condominio === '' || formulario.id_condominio === 'Defecto') {
      setError('Debes registrar antes un condominio');
      return;
    }
    if (formulario.nombre_edificio.trim() === '') {
      setErrorEdificio('Ingrese un nombre para el edificio');
      return;
    }
    const trimmedNombreEdificio = formulario.nombre_edificio.trim();
  
    try {
      const response = await axios.post('http://localhost:4000/api/getEdificiosbyCondominio', {
        id_condominio: formulario.id_condominio
      });
  
      const edificioExistente = response.data.some(edificio => 
        edificio.nombre_edificio === trimmedNombreEdificio
      );
  
      if (edificioExistente) {
        setErrorEdificio('El edificio ya existe en este condominio');
        return;
      }
  
      const resultado = await axios.post('http://localhost:4000/api/registrarEdificio', {
        ...formulario,
        nombre_edificio: trimmedNombreEdificio
      });
  
      if (resultado.data === 200) {
        setVisible(true);
        setError('');
        window.location.reload();
      } else {
        alert(resultado.data);
      }
    } catch (error) {
      console.error(error);
      alert('Error al registrar el edificio');
    }
  };
  

  return (
          <form onSubmit={handleSubmit} className='formulario'>
            <h1>Registro de nuevo Edificio</h1>
            <div className="form-group">
            <label className='labelInput'>Seleccione un condominio: </label>
            <select id="opciones"  onChange={handleChangeSelect}>
                {opciones}
              </select>
            </div>
            <div className="error-message">{error}</div>
            <div className="form-group">
              <label className='labelInput'>Nombre del Edificio: </label>
              <input
                type="text"
                id="nombre_edificio"
                name="nombre_edificio"
                placeholder="Nombre del Edificio"
                value={formulario.nombre_edificio}
                onChange={handleChange}
              />
              <div className="error-message">{errorEdificio}</div>
            </div>
            <div className="botones-container">
            <button className="mi-boton2" type='submit'>Registrar</button>
            </div>
            <div style={{ display: visible ? 'block' : 'none' }} >Registro exitoso</div>
          </form>   
    );
  }
  export default NuevoEdificio;
  
