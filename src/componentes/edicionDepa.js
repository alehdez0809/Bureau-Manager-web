import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EditoEdificio() {

  const [formulario, setFormulario] = useState({
    id_edificio: '',
    id_departamento: '',
    nombre_departamento: ''
  });
  const [visible, setVisible] = useState(false);

  const [departamentos, setDepartamentos] = useState([]);
  const [edificios, setEdificios] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:4000/api/getEdificios')
      .then(response => {
        if(response.data.length === 0){
          setEdificios([]);
          setFormulario({
            id_edificio: 0
        });}else{
          setEdificios(response.data);
          setFormulario({
            id_edificio: response.data[0].id_edificio
          });
        }
  
        // Mueve el segundo axios.get() dentro del then() del primer axios.get()
        const selectedEdifcio = response.data[0].id_edificio;
        const diccionario = {};
        diccionario['id_edificio'] = parseInt(selectedEdifcio);
  
        axios.post(`http://localhost:4000/api/getDepartamentosbyEdificios`,diccionario)
          .then(resultado => {
            if (resultado.data.length === 0) {
              setDepartamentos([]);
              setFormulario({
                id_departamento: 0,
                nombre_departamento: "",
              });
            } else {
              setDepartamentos(resultado.data);
              setFormulario({
                id_departamento: resultado.data[0].id_departamento,
                nombre_departamento: resultado.data[0].numero_departamento,
              });
            }
          })
          .catch(error => {
            console.error(error);
            alert('Error al obtener los departamentos');
          });
  
      })
      .catch(error => {
        console.log(error);
        alert('Error al obtener los edificios');
      });
  }, []);
  

  const handleChange = event => {
    const { name, value } = event.target;
    setFormulario(prevState => ({ ...prevState, [name]: value }));
  };

  const handleChangeSelect = event => {
    const elegido=parseInt(event.target.value)
    const selectedEdificio = edificios.find(c => c.id_edificio === elegido);

    if (selectedEdificio) {
        const diccionario = {};
        diccionario['id_edificio'] = selectedEdificio.id_edificio;
  
        axios.post(`http://localhost:4000/api/getDepartamentosbyEdificios`,diccionario)
          .then(resultado => {
            if (resultado.data.length === 0) {
              setDepartamentos([]);
              setFormulario({
                id_departamento: 0,
                nombre_departamento: "",
              });
            } else {
              setDepartamentos(resultado.data);
              setFormulario({
                id_departamento: resultado.data[0].id_departamento,
                nombre_departamento: resultado.data[0].numero_departamento,
              });
            }
          })
          .catch(error => {
            console.error(error);
            alert('Error al obtener los departamentos');
          });

      setFormulario(prevState => ({
        ...prevState,
        id_edificio: selectedEdificio.id_edificio
      }));
    }
  };

  const handleChangeSelectDepartamentos = event => {
    const elegido=parseInt(event.target.value)
    const selectedDepartamento = departamentos.find(c => c.id_departamento === elegido);

    if (selectedDepartamento) {
      setFormulario(prevState => ({
        ...prevState,
        id_departamento: selectedDepartamento.id_departamento,
        nombre_departamento: selectedDepartamento.numero_departamento,
      }));
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const resultado = await axios.post('http://localhost:4000/api/actualizarDepartamento', formulario);
      if (resultado.data === 200) {
        setVisible(true);
      } else {
        alert(resultado.data);
      }
    } catch (error) {
      console.error(error);
      alert('Error al actualizar el departamento');
    }
  };


  let opcionesDepartamento;
  if (departamentos.length === 0) {
    opcionesDepartamento = <option value="Defecto">No hay departamentos disponibles</option>;
  } else {
    opcionesDepartamento = departamentos.map(
      c => <option key={c.id_departamento} value={c.id_departamento}>{c.numero_departamento}</option>
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
            <h1>Editar Departamento</h1>
            <div class="form-group">
            <label className='labelInput'>Seleccione un Edificio: </label>
            <select id="opciones" onChange={handleChangeSelect}>
                {opcionesEdificio}
              </select>
            </div>
            <div class="form-group">
            <label className='labelInput'>Seleccione un Departamento: </label>
            <select id="opciones" onChange={handleChangeSelectDepartamentos}>
                {opcionesDepartamento}
              </select>
            </div>
            <div class="form-group">
              <label className='labelInput'>Nombre/Numero del Departamento: </label>
              <input
                type="text"
                id="nombre_departamento"
                name="nombre_departamento"
                placeholder="Nombre/Numero del Departamento"
                value={formulario.nombre_departamento}
                onChange={handleChange}
              />
            </div>
            <div className="botones-container">
              <Link to="/EdicionyRegistro">
                <button className="mi-boton2">Regresar</button>
              </Link>
            <button className="mi-boton2" type='submit'>Actualizar</button>
            </div>
            <div style={{ display: visible ? 'block' : 'none' }}>Actualizacion exitosa</div>
          </form>   
    );
  }
  export default EditoEdificio;
  
