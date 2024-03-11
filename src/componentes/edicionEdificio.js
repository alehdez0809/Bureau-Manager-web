import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EditoEdificio() {

  const [formulario, setFormulario] = useState({
    id_condominio: '',
    id_edificio: '',
    nombre_edificio: ''
  });
  const [visible, setVisible] = useState(false);

  const [condominios, setCondominios] = useState([]);
  const [edificios, setEdificios] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:4000/api/getCondominios')
      .then(response => {
        if(response.data.length === 0){
          setFormulario({
            id_condominio: 0
        });}else{
          setCondominios(response.data);
          setFormulario({
            id_condominio: response.data[0].id_condominio
          });
        }
  
        // Mueve el segundo axios.get() dentro del then() del primer axios.get()
        const selectedCondominio = response.data[0].id_condominio;
        const diccionario = {};
        diccionario['id_condominio'] = parseInt(selectedCondominio);
  
        axios.post(`http://localhost:4000/api/getEdificiosbyCondominio`,diccionario)
          .then(resultado => {
            if (resultado.data.length === 0) {
              setFormulario({
                id_edificio: 0,
                nombre_edificio: "",
              });
            } else {
              setEdificios(resultado.data);
              setFormulario({
                id_edificio: resultado.data[0].id_edificio,
                nombre_edificio: resultado.data[0].nombre_edificio,
              });
            }
          })
          .catch(error => {
            console.error(error);
            alert('Error al obtener los edificios');
          });
  
      })
      .catch(error => {
        console.log(error);
        alert('Error al obtener los condominios');
      });
  }, []);
  

  const handleChange = event => {
    const { name, value } = event.target;
    setFormulario(prevState => ({ ...prevState, [name]: value }));
  };

  const handleChangeSelect = event => {
    const elegido=parseInt(event.target.value)
    const selectedCondominio = condominios.find(c => c.id_condominio === elegido);

    if (selectedCondominio) {
        const diccionario = {};
        diccionario['id_condominio'] = selectedCondominio.id_condominio;
  
        axios.post(`http://localhost:4000/api/getEdificiosbyCondominio`,diccionario)
          .then(resultado => {
            if (resultado.data.length === 0) {
              setEdificios([]);
              setFormulario({
                id_edificio: 0,
                nombre_edificio: "",
              });
            } else {
              setEdificios(resultado.data);
              setFormulario({
                id_edificio: resultado.data[0].id_edificio,
                nombre_edificio: resultado.data[0].nombre_edificio,
              });
            }
          })
          .catch(error => {
            console.error(error);
            alert('Error al obtener los edificios');
          });

      setFormulario(prevState => ({
        ...prevState,
        id_condominio: selectedCondominio.id_condominio
      }));
    }
  };

  const handleChangeSelectEdificios = event => {
    const elegido=parseInt(event.target.value)
    const selectedEdificio = edificios.find(c => c.id_edificio === elegido);

    if (selectedEdificio) {
      setFormulario(prevState => ({
        ...prevState,
        id_edificio: selectedEdificio.id_edificio,
        nombre_edificio: selectedEdificio.nombre_edificio,
      }));
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const resultado = await axios.post('http://localhost:4000/api/actualizarEdificio', formulario);
      if (resultado.data === 200) {
        setVisible(true);
      } else {
        alert(resultado.data);
      }
    } catch (error) {
      console.error(error);
      alert('Error al actualizar el edificio');
    }
  };


  let opcionesCondominio;
  if (condominios.length === 0) {
    opcionesCondominio = <option value="Defecto">No hay condominios disponibles</option>;
  } else {
    opcionesCondominio = condominios.map(
      c => <option key={c.id_condominio} value={c.id_condominio}>{c.nombre_condominio}</option>
    );
  }

  let opcionesEdificio;
  if (edificios.length === 0) {
    opcionesEdificio = <option value="Defecto">No hay edificios en el condominio</option>;
  } else {
    opcionesEdificio = edificios.map(
      c => <option key={c.id_edificio} value={c.id_edificio}>{c.nombre_edificio}</option>
    );
  }
    return (
          <form onSubmit={handleSubmit}>
            <h1>Editar Edificio</h1>
            <div class="form-group">
            <label className='labelInput'>Seleccione un condominio: </label>
            <select id="opciones" onChange={handleChangeSelect}>
                {opcionesCondominio}
              </select>
            </div>
            <div class="form-group">
            <label className='labelInput'>Seleccione un Edificio: </label>
            <select id="opciones" onChange={handleChangeSelectEdificios}>
                {opcionesEdificio}
              </select>
            </div>
            <div class="form-group">
              <label className='labelInput'>Nombre del Edificio: </label>
              <input
                type="text"
                id="nombre_edificio"
                name="nombre_edificio"
                placeholder="Nombre del Edificio"
                value={formulario.nombre_edificio}
                onChange={handleChange}
              />
            </div>
            <div className="botones-container">
              <Link to="/EdicionyRegistro">
                <button className="mi-boton2">Regresar</button>
              </Link>
            <button className="mi-boton2" type='submit'>Registrar</button>
            </div>
            <div style={{ display: visible ? 'block' : 'none' }}>Actualizacion exitosa</div>
          </form>   
    );
  }
  export default EditoEdificio;
  
