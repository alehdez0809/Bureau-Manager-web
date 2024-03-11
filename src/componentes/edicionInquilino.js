import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function EditoInquilino() {

  const [formulario, setFormulario] = useState({
    id_condominio: '',
    id_edificio: '',
    id_departamento: '',
    id_inquilino: '',
    nombre_inquilino: '',
    apellino_paterno_inquilino: '',
    apellino_materno_inquilino: '',
    correo_inquilino: '',
  });

  const [visible, setVisible] = useState(false);
  const [departamentos, setDepartamentos] = useState([]);
  const [condominios, setCondominios] = useState([]);
  const [edificios, setEdificios] = useState([]);
  const [inquilinos, setInquilinos] = useState([]);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('authData'));
    const id_administrador = parseInt(authData?.id);
    axios.get(`http://localhost:4000/api/getCondominios/${id_administrador}`)
      .then(response => {
        if(response.data.length === 0){
          setEdificios([]);
          setDepartamentos([]);
          setCondominios([]);
          setInquilinos([]);
          setFormulario({
            id_condominio: 0,
            nombre_inquilino: '',
            apellino_paterno_inquilino: '',
            apellino_materno_inquilino: '',
            correo_inquilino: '',
        });}else{
          setCondominios(response.data);
          setFormulario({
            id_condominio: response.data[0].id_condominio
          });
          // Mueve el segundo axios.get() dentro del then() del primer axios.get()
        const selectedCondominio = response.data[0].id_condominio;
        const diccionario = {};
        diccionario['id_condominio'] = parseInt(selectedCondominio);
  
        axios.post(`http://localhost:4000/api/getEdificiosbyCondominio`,diccionario)
          .then(resultado => {
            if (resultado.data.length === 0) {
              setEdificios([]);
              setDepartamentos([]);
              setInquilinos([]);
              setFormulario({
                id_edificio: 0,
                nombre_inquilino: '',
                apellino_paterno_inquilino: '',
                apellino_materno_inquilino: '',
                correo_inquilino: '',
              });
            } else {
              setEdificios(resultado.data);
              setFormulario({
                id_edificio: resultado.data[0].id_edificio,
              });

              const selectedEdifcio = resultado.data[0].id_edificio;
              const diccionario2 = {};
              diccionario2['id_edificio'] = parseInt(selectedEdifcio);
              
              axios.post(`http://localhost:4000/api/getDepartamentosbyEdificios`,diccionario2)
              .then(resultado => {
                if (resultado.data.length === 0) {
                  setDepartamentos([]);
                  setInquilinos([]);
                  setFormulario({
                    id_departamento: 0,
                    nombre_inquilino: '',
                    apellino_paterno_inquilino: '',
                    apellino_materno_inquilino: '',
                    correo_inquilino: '',
                  });
                } else {
                  setDepartamentos(resultado.data);
                  setFormulario({
                    id_departamento: resultado.data[0].id_departamento,
                  });

                  const selectedInquilino = resultado.data[0].id_departamento;
                  const diccionario3 = {};
                  diccionario3['id_departamento'] = parseInt(selectedInquilino);

                  axios.post(`http://localhost:4000/api/getInquilinosbyDepartamento`,diccionario3)
                  .then(resultado => {
                    if (resultado.data.length === 0) {
                      setInquilinos([]);
                      setFormulario({
                        id_inquilino: 0,
                        nombre_inquilino: '',
                        apellino_paterno_inquilino: '',
                        apellino_materno_inquilino: '',
                        correo_inquilino: '',
                      });
                    } else {
                      setInquilinos(resultado.data);
                      setFormulario({
                        id_inquilino: resultado.data[0].id_inquilino,
                        nombre_inquilino: resultado.data[0].nombre_inquilino,
                        apellino_paterno_inquilino: resultado.data[0].apellino_paterno_inquilino,
                        apellino_materno_inquilino: resultado.data[0].apellino_materno_inquilino,
                        correo_inquilino: resultado.data[0].correo_inquilino,
                      });
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    alert('Error al obtener los inquilinos');
                  });
                }
              })
              .catch(error => {
                console.error(error);
                alert('Error al obtener los departamentos');
              });
            }
          })
          .catch(error => {
            console.error(error);
            alert('Error al obtener los edificios');
          });
        }
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
              setDepartamentos([]);
              setInquilinos([]);
              setFormulario({
                id_edificio: 0,
                nombre_inquilino: '',
                apellino_paterno_inquilino: '',
                apellino_materno_inquilino: '',
                correo_inquilino: '',
              });
            } else {
              setEdificios(resultado.data);
              setFormulario({
                id_edificio: resultado.data[0].id_edificio,
              });
              const selectedEdifcio = resultado.data[0].id_edificio;
              const diccionario2 = {};
              diccionario2['id_edificio'] = parseInt(selectedEdifcio);
              
              axios.post(`http://localhost:4000/api/getDepartamentosbyEdificios`,diccionario2)
              .then(resultado => {
                if (resultado.data.length === 0) {
                  setDepartamentos([]);
                  setInquilinos([]);
                  setFormulario({
                    id_departamento: 0,
                    nombre_inquilino: '',
                    apellino_paterno_inquilino: '',
                    apellino_materno_inquilino: '',
                    correo_inquilino: '',
                  });
                } else {
                  setDepartamentos(resultado.data);
                  setFormulario({
                    id_departamento: resultado.data[0].id_departamento,
                  });
                  const selectedInquilino = resultado.data[0].id_departamento;
                  const diccionario3 = {};
                  diccionario3['id_departamento'] = parseInt(selectedInquilino);

                  axios.post(`http://localhost:4000/api/getInquilinosbyDepartamento`,diccionario3)
                  .then(resultado => {
                    if (resultado.data.length === 0) {
                      setInquilinos([]);
                      setFormulario({
                        id_inquilino: 0,
                        nombre_inquilino: '',
                        apellino_paterno_inquilino: '',
                        apellino_materno_inquilino: '',
                        correo_inquilino: '',
                      });
                    } else {
                      setInquilinos(resultado.data);
                      setFormulario({
                        id_inquilino: resultado.data[0].id_inquilino,
                        nombre_inquilino: resultado.data[0].nombre_inquilino,
                        apellino_paterno_inquilino: resultado.data[0].apellino_paterno_inquilino,
                        apellino_materno_inquilino: resultado.data[0].apellino_materno_inquilino,
                        correo_inquilino: resultado.data[0].correo_inquilino,
                      });
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    alert('Error al obtener los inquilinos');
                  });

                }
              })
              .catch(error => {
                console.error(error);
                alert('Error al obtener los departamentos');
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
        const diccionario = {};
        diccionario['id_edificio'] = selectedEdificio.id_edificio;
  
        axios.post(`http://localhost:4000/api/getDepartamentosbyEdificios`,diccionario)
          .then(resultado => {
            if (resultado.data.length === 0) {
              setDepartamentos([]);
              setInquilinos([]);
              setFormulario({
                id_departamento: 0,
                nombre_inquilino: '',
                apellino_paterno_inquilino: '',
                apellino_materno_inquilino: '',
                correo_inquilino: '',
                
              });
            } else {
              setDepartamentos(resultado.data);
              setFormulario({
                id_departamento: resultado.data[0].id_departamento
              });
                  const selectedInquilino = resultado.data[0].id_departamento;
                  const diccionario3 = {};
                  diccionario3['id_departamento'] = parseInt(selectedInquilino);

                  axios.post(`http://localhost:4000/api/getInquilinosbyDepartamento`,diccionario3)
                  .then(resultado => {
                    if (resultado.data.length === 0) {
                      setInquilinos([]);
                      setFormulario({
                        id_inquilino: 0,
                        nombre_inquilino: '',
                        apellino_paterno_inquilino: '',
                        apellino_materno_inquilino: '',
                        correo_inquilino: '',
                      });
                    } else {
                      setInquilinos(resultado.data);
                      setFormulario({
                        id_inquilino: resultado.data[0].id_inquilino,
                        nombre_inquilino: resultado.data[0].nombre_inquilino,
                        apellino_paterno_inquilino: resultado.data[0].apellino_paterno_inquilino,
                        apellino_materno_inquilino: resultado.data[0].apellino_materno_inquilino,
                        correo_inquilino: resultado.data[0].correo_inquilino,
                      });
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    alert('Error al obtener los inquilinos');
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
        id_departamento: selectedDepartamento.id_departamento
      }));
      const diccionario = {};
        diccionario['id_departamento'] = selectedDepartamento.id_departamento;

      axios.post(`http://localhost:4000/api/getInquilinosbyDepartamento`,diccionario)
                  .then(resultado => {
                    if (resultado.data.length === 0) {
                      setInquilinos([]);
                      setFormulario({
                        id_inquilino: 0,
                        nombre_inquilino: '',
                        apellino_paterno_inquilino: '',
                        apellino_materno_inquilino: '',
                        correo_inquilino: '',
                      });
                    } else {
                      setInquilinos(resultado.data);
                      setFormulario({
                        id_inquilino: resultado.data[0].id_inquilino,
                        nombre_inquilino: resultado.data[0].nombre_inquilino,
                        apellino_paterno_inquilino: resultado.data[0].apellino_paterno_inquilino,
                        apellino_materno_inquilino: resultado.data[0].apellino_materno_inquilino,
                        correo_inquilino: resultado.data[0].correo_inquilino,
                      });
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    alert('Error al obtener los inquilinos');
                  });
    }
  };

  const handleChangeSelectInquilino = event => {
    const elegido=parseInt(event.target.value)
    const selectedInquilino = inquilinos.find(c => c.id_inquilino === elegido);

    if (selectedInquilino) {
      setFormulario(prevState => ({
        ...prevState,
        id_departamento: selectedInquilino.id_inquilino,
        nombre_inquilino: selectedInquilino.nombre_inquilino,
        apellino_paterno_inquilino: selectedInquilino.apellino_paterno_inquilino,
        apellino_materno_inquilino: selectedInquilino.apellino_materno_inquilino,
        correo_inquilino: selectedInquilino.correo_inquilino,
      }));
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const resultado = await axios.post('http://localhost:4000/api/actualizarInquilino', formulario);
      if (resultado.data === 200) {
        setVisible(true);
      } else {
        alert(resultado.data);
      }
    } catch (error) {
      console.error(error);
      alert('Error al actualizar al inquilino');
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

  let opcionesDepartamento;
  if (departamentos.length === 0) {
    opcionesDepartamento = <option value="Defecto">No hay departamentos disponibles</option>;
  } else {
    opcionesDepartamento = departamentos.map(
      c => <option key={c.id_departamento} value={c.id_departamento}>{c.numero_departamento}</option>
    );
  }

  let opcionesInquilino;
  if (inquilinos.length === 0) {
    opcionesInquilino = <option value="Defecto">No hay inquilinos disponibles</option>;
  } else {
    opcionesInquilino = inquilinos.map(
      c => <option key={c.id_inquilino} value={c.id_inquilino}>{c.nombre_inquilino}</option>
    );
  }

    return (

        <form className="fromInquilino" onSubmit={handleSubmit}>
            <h1 >Editar información de Inquilino</h1>
            <div className='select-container'>
                <div className='select-item'>
                <label className='labelInput'>Seleccione un condominio: </label>
                <select id="opciones" onChange={handleChangeSelect}>
                  {opcionesCondominio}
                </select>
                </div>
            <div className='select-item'>
                <label className='labelInput'>Seleccione un Edificio: </label>
                <select id="opciones" onChange={handleChangeSelectEdificios}>
                    {opcionesEdificio}
                  </select>
            </div>
            <div className='select-item'>
                <label className='labelInput'>Seleccione un Departamento: </label>
                <select id="opciones" onChange={handleChangeSelectDepartamentos}>
                {opcionesDepartamento}
              </select>
            </div>
            </div>
            <div className='select-container'>
                <div className='select-item'>
                    <label className='labelInput'>Seleccione un Inquilino: </label>
                    <select id="opciones" onChange={handleChangeSelectInquilino}>
                      {opcionesInquilino}
                    </select>
                </div>
            </div>
            <div className='select-container'>
                <div className='select-item'>
                    <label className='labelInput'>Nombre del Inquilino: </label>
                    <input
                      type="text"
                      id="nombre_inquilino"
                      name="nombre_inquilino"
                      placeholder="Nombre del Inquilino"
                      value={formulario.nombre_inquilino}
                      onChange={handleChange}
                    />
                </div>
                <div className='select-item'>
                    <label className='labelInput'>Apellido Paterno: </label>
                    <input
                      type="text"
                      id="apellino_paterno_inquilino"
                      name="apellino_paterno_inquilino"
                      placeholder="Apellido Paterno"
                      value={formulario.apellino_paterno_inquilino}
                      onChange={handleChange}
                    />
                </div>
                <div className='select-item'>
                    <label className='labelInput'>Apellido Materno: </label>
                    <input
                      type="text"
                      id="apellino_materno_inquilino"
                      name="apellino_materno_inquilino"
                      placeholder="Apellido Materno"
                      value={formulario.apellino_materno_inquilino}
                      onChange={handleChange}
                    />
                </div>
            </div>
            <div className='select-container'>
                <div className='select-item'>
                    <label className='labelInput'>Correo del Inquilino: </label>
                    <input
                      type="email"
                      id="correo_inquilino"
                      name="correo_inquilino"
                      placeholder="Correo Materno"
                      value={formulario.correo_inquilino}
                      onChange={handleChange}
                    />
                </div>
            </div>
            <div style={{ display: visible ? 'block' : 'none' }}>Actualizacion exitosa</div>
            <div className="botones-container"> 
              <Link to="/MenuInquilino">
                <button className="mi-boton2">Regresar</button>
              </Link>
            <button className="mi-boton2" type='submit'>Actualizar</button>
            </div>
          </form>   
    );
  }
  export default EditoInquilino;
  
