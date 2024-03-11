import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EditoEdificio() {

  const [formulario, setFormulario] = useState({
    id_edificio: '',
    numero_departamento: ''
  });
  const [visible, setVisible] = useState(false);

  const [edificios, setEdificios] = useState([]);

  const [condominios, setCondominios] = useState([]);
  const [idCondominioSeleccionado, setIdCondominioSeleccionado] = useState(null);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('authData'));
    const id_administrador = parseInt(authData?.id);
    axios.get(`http://localhost:4000/api/getCondominios/${id_administrador}`)
      .then(resultado => {
        setCondominios(resultado.data);
        setIdCondominioSeleccionado(resultado.data[0]?.id_condominio);
      })
      .catch(error => {
        console.error(error);
        if (error.response && error.response.status === 404) {   
          ///
        } else {
          alert('Error al obtener los condominios');
        }
      });
  }, []);

  /*useEffect(() => {
        axios.get(`http://localhost:4000/api/getEdificios`)
          .then(resultado => {
            if (resultado.data.length === 0) {
              setFormulario({
                id_edificio: 0
              });
            } else {
              setEdificios(resultado.data);
              setFormulario({
                id_edificio: resultado.data[0].id_edificio
              });
            }
          })
          .catch(error => {
            console.error(error);
            alert('Error al obtener los edificios');
          });
  }, []);*/

  useEffect(() => {
    if (idCondominioSeleccionado) {
      axios.post('http://localhost:4000/api/getEdificiosbyCondominio', { id_condominio: idCondominioSeleccionado })
        .then(resultado => {
          setEdificios(resultado.data);
          setFormulario({
            id_edificio: resultado.data[0]?.id_edificio
          });
        })
        .catch(error => {
          console.error(error);
          alert('Error al obtener los edificios');
        });
    }
  }, [idCondominioSeleccionado]);
  

  const handleChange = event => {
    const { name, value } = event.target;
    setFormulario(prevState => ({ ...prevState, [name]: value }));
  };

  const handleChangeSelectEdificios = event => {
    const elegido=parseInt(event.target.value)
    const selectedEdificio = edificios.find(c => c.id_edificio === elegido);

    if (selectedEdificio) {
      setFormulario(prevState => ({
        ...prevState,
        id_edificio: selectedEdificio.id_edificio
      }));
    }
  };

  const handleChangeSelectCondominios = event => {
    setIdCondominioSeleccionado(parseInt(event.target.value));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const resultado = await axios.post('http://localhost:4000/api/registrarDepartamento', formulario);
      if (resultado.data === 200) {
        setVisible(true);
      } else {
        alert(resultado.data);
      }
    } catch (error) {
      console.error(error);
      alert('Error al registrar el Departamento');
    }
  };

  let opcionesCondominio;
  if (condominios.length === 0) {
    opcionesCondominio = <option value="Defecto">No hay condominios disponibles</option>;
  } else {
    opcionesCondominio = condominios.map(c => <option key={c.id_condominio} value={c.id_condominio}>{c.nombre_condominio}</option>);
  }  

  let opcionesEdificio;
  if (edificios.length === 0) {
    opcionesEdificio = <option value="Defecto">No hay edificios registrados</option>;
  } else {
    opcionesEdificio = edificios.map(
      c => <option key={c.id_edificio} value={c.id_edificio}>{c.nombre_edificio}</option>
    );
  }
    return (
          <form onSubmit={handleSubmit}>
            <h1>Nuevo Departamento</h1>
            <div class="form-group">
              <label className='labelInput'>Seleccione un Condominio: </label>
              <select id="condominios" onChange={handleChangeSelectCondominios}>
                {opcionesCondominio}
              </select>
            </div> 
            <br></br>
            <div class="form-group">
            <label className='labelInput'>Seleccione un Edificio: </label>
            <select id="opciones" onChange={handleChangeSelectEdificios}>
                {opcionesEdificio}
              </select>
            </div>
            <br></br>
            <div class="form-group">
              <label className='labelInput'>Nombre/Numero del Departamento: </label>
              <input
                type="text"
                id="numero_departamento"
                name="numero_departamento"
                placeholder="Nombre/Numero del Departamento"
                value={formulario.numero_departamento}
                onChange={handleChange}
              />
            </div>
            <div className="botones-container">
              <Link to="/EdicionyRegistro">
                <button className="mi-boton2">Regresar</button>
              </Link>
            <button className="mi-boton2" type='submit'>Registrar</button>
            </div>
            <div style={{ display: visible ? 'block' : 'none' }}>Registro exitoso</div>
          </form>   
    );
  }
  export default EditoEdificio;
  
