import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function NuevoRecibo() {

  const [formulario, setFormulario] = useState({
    id_condominio: '',
    id_edificio: '',
    id_departamento: '',
    id_inquilino: '',
    nombre_completo_inquilino:'',
    no_recibo:'',
    fecha:'',
    concepto_pago:'',
    cuota_ordinaria:'',
    concepto_cuota_ordinaria:'',
    cuota_penalizacion:'',
    concepto_cuota_penalizacion:'',
    cuota_extraordinaria:'',
    concepto_cuota_extraordinaria:'',
    cuota_reserva:'',
    concepto_cuota_reserva:'',
    cuota_adeudos:'',
    concepto_cuota_adeudos:'',
    total_pagar:'',
  });

  const [visible, setVisible] = useState(false);
  const [departamentos, setDepartamentos] = useState([]);
  const [condominios, setCondominios] = useState([]);
  const [edificios, setEdificios] = useState([]);
  const [inquilinos, setInquilinos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/getCondominios')
      .then(response => {
        if(response.data.length === 0){
          setEdificios([]);
          setDepartamentos([]);
          setCondominios([]);
          setInquilinos([]);
          setFormulario(prevState => ({
            ...prevState,
            id_condominio: 0,
            nombre_completo_inquilino:'',
        }));}else{
          setCondominios(response.data);
          setFormulario(prevState => ({
            ...prevState,
            id_condominio: response.data[0].id_condominio
          }));
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
              setFormulario(prevState => ({
                ...prevState,
                id_edificio: 0,
                nombre_completo_inquilino:'',
              }));
            } else {
              setEdificios(resultado.data);
              setFormulario(prevState => ({
                ...prevState,
                id_edificio: resultado.data[0].id_edificio,
              }));

              const selectedEdifcio = resultado.data[0].id_edificio;
              const diccionario2 = {};
              diccionario2['id_edificio'] = parseInt(selectedEdifcio);
              
              axios.post(`http://localhost:4000/api/getDepartamentosbyEdificios`,diccionario2)
              .then(resultado => {
                if (resultado.data.length === 0) {
                  setDepartamentos([]);
                  setInquilinos([]);
                  setFormulario(prevState => ({
                    ...prevState,
                    id_departamento: 0,
                    nombre_completo_inquilino:'',
                  }));
                } else {
                  setDepartamentos(resultado.data);
                  setFormulario(prevState => ({
                    ...prevState,
                    id_departamento: resultado.data[0].id_departamento,
                  }));

                  const selectedInquilino = resultado.data[0].id_departamento;
                  const diccionario3 = {};
                  diccionario3['id_departamento'] = parseInt(selectedInquilino);

                  axios.post(`http://localhost:4000/api/getInquilinosbyDepartamento`,diccionario3)
                  .then(resultado => {
                    if (resultado.data.length === 0) {
                      setInquilinos([]);
                      setFormulario(prevState => ({
                        ...prevState,
                        id_inquilino: 0,
                        nombre_completo_inquilino:'',
                      }));
                    } else {
                      setInquilinos(resultado.data);
                      setFormulario(prevState => ({
                        ...prevState,
                        id_inquilino: resultado.data[0].id_inquilino,
                        nombre_completo_inquilino: resultado.data[0].nombre_inquilino+" "+resultado.data[0].apellino_paterno_inquilino+" "+resultado.data[0].apellino_materno_inquilino,
                      }));
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
              setFormulario(prevState => ({
                ...prevState,
                id_edificio: 0,
                nombre_completo_inquilino:'',
              }));
            } else {
              setEdificios(resultado.data);
              setFormulario(prevState => ({
                ...prevState,
                id_edificio: resultado.data[0].id_edificio,
              }));
              const selectedEdifcio = resultado.data[0].id_edificio;
              const diccionario2 = {};
              diccionario2['id_edificio'] = parseInt(selectedEdifcio);
              
              axios.post(`http://localhost:4000/api/getDepartamentosbyEdificios`,diccionario2)
              .then(resultado => {
                if (resultado.data.length === 0) {
                  setDepartamentos([]);
                  setInquilinos([]);
                  setFormulario(prevState => ({
                    ...prevState,
                    id_departamento: 0,
                    nombre_completo_inquilino:'',
                  }));
                } else {
                  setDepartamentos(resultado.data);
                  setFormulario(prevState => ({
                    ...prevState,
                    id_departamento: resultado.data[0].id_departamento,
                  }));
                  const selectedInquilino = resultado.data[0].id_departamento;
                  const diccionario3 = {};
                  diccionario3['id_departamento'] = parseInt(selectedInquilino);

                  axios.post(`http://localhost:4000/api/getInquilinosbyDepartamento`,diccionario3)
                  .then(resultado => {
                    if (resultado.data.length === 0) {
                      setInquilinos([]);
                      setFormulario(prevState => ({
                        ...prevState,
                        id_inquilino: 0,
                        nombre_completo_inquilino:'',
                      }));
                    } else {
                      setInquilinos(resultado.data);
                      setFormulario(prevState => ({
                        ...prevState,
                        id_inquilino: resultado.data[0].id_inquilino,
                        nombre_completo_inquilino: resultado.data[0].nombre_inquilino+" "+resultado.data[0].apellino_paterno_inquilino+" "+resultado.data[0].apellino_materno_inquilino,
                      }));
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
              setFormulario(prevState => ({
                ...prevState,
                id_departamento: 0,
                nombre_completo_inquilino:'',
                
              }));
            } else {
              setDepartamentos(resultado.data);
              setFormulario(prevState => ({
                ...prevState,
                id_departamento: resultado.data[0].id_departamento
              }));
                  const selectedInquilino = resultado.data[0].id_departamento;
                  const diccionario3 = {};
                  diccionario3['id_departamento'] = parseInt(selectedInquilino);

                  axios.post(`http://localhost:4000/api/getInquilinosbyDepartamento`,diccionario3)
                  .then(resultado => {
                    if (resultado.data.length === 0) {
                      setInquilinos([]);
                      setFormulario(prevState => ({
                        ...prevState,
                        id_inquilino: 0,
                        nombre_completo_inquilino:'',
                      }));
                    } else {
                      setInquilinos(resultado.data);
                      setFormulario(prevState => ({
                        ...prevState,
                        id_inquilino: resultado.data[0].id_inquilino,
                        nombre_completo_inquilino: resultado.data[0].nombre_inquilino+" "+resultado.data[0].apellino_paterno_inquilino+" "+resultado.data[0].apellino_materno_inquilino,
                      }));
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
                      setFormulario(prevState => ({
                        ...prevState,
                        id_inquilino: 0,
                        nombre_completo_inquilino:'',
                      }));
                    } else {
                      setInquilinos(resultado.data);
                      setFormulario(prevState => ({
                        ...prevState,
                        id_inquilino: resultado.data[0].id_inquilino,
                        nombre_completo_inquilino: resultado.data[0].nombre_inquilino+" "+resultado.data[0].apellino_paterno_inquilino+" "+resultado.data[0].apellino_materno_inquilino,
                      }));
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
        nombre_completo_inquilino: selectedInquilino.nombre_inquilino+" "+selectedInquilino.apellino_paterno_inquilino+" "+selectedInquilino.apellino_materno_inquilino,
      }));
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try { 
      let ddd = 0;
      ddd = (parseInt(formulario.cuota_ordinaria) || 0) 
          + (parseInt(formulario.cuota_penalizacion) || 0) 
          + (parseInt(formulario.cuota_extraordinaria) || 0) 
          + (parseInt(formulario.cuota_reserva) || 0) 
          + (parseInt(formulario.cuota_adeudos) || 0);
      ddd = ddd.toString();
      console.log(ddd);
      formulario.total_pagar = ddd;
      console.log(formulario.total_pagar);
      const resultado = await axios.post('http://localhost:4000/api/registrarRecibo', formulario);
      if (resultado.data === 200) {
        setVisible(true);
        //setFormulario(prevState => ({
        //  ...prevState,
        //  no_recibo: '',
        //  fecha: '',
        //  concepto_pago: '',
        //  cuota_ordinaria: '',
        //  concepto_cuota_ordinaria: '',
        //  cuota_penalizacion: '',
        //  concepto_cuota_penalizacion: '',
        //  cuota_extraordinaria: '',
        //  concepto_cuota_extraordinaria: '',
        //  cuota_reserva: '',
        //  concepto_cuota_reserva: '',
        //  cuota_adeudos: '',
        //  concepto_cuota_adeudos: '',
        //  total_pagar: '',
        //}));
      } else {
        alert(resultado.data);
      }
    } catch (error) {
      console.error(error);
      alert('Error al registrar el Recibo');
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
      c => <option key={c.id_inquilino} value={c.id_inquilino}>{c.nombre_inquilino+" "+c.apellino_paterno_inquilino+" "+c.apellino_materno_inquilino}</option>
    );
  }

    return (
        <div className='form-container'>
          <form className="fromInquilino" onSubmit={handleSubmit}>
            <h2>Registrar un Nuevo Recibo</h2>
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
                <div className='select-item'>
                    <label className='labelInput'>Numero Del Recibo: </label>
                    <input
                      type="text"
                      id="no_recibo"
                      name="no_recibo"
                      placeholder="No. Recibo"
                      value={formulario.no_recibo}
                      onChange={handleChange}
                    />
                </div>
                <div className='select-item'>
                    <label className='labelInput'>Fecha Del Recibo: </label>
                    <input
                      type="date"
                      id="fecha"
                      name="fecha"
                      value={formulario.fecha}
                      onChange={handleChange}
                    />
                </div>
            </div>
            
            <div className='select-container'>
                <div className='select-item'>
                    <label className='labelInput'>Concepto de pago: </label>
                    <input
                      type="text"
                      id="concepto_pago"
                      name="concepto_pago"
                      placeholder="Concepto de Pago"
                      value={formulario.concepto_pago}
                      onChange={handleChange}
                    />
                </div>
                <div className='select-item'>
                    <label className='labelInput'>Cuota Ordinaria($): </label>
                    <input
                      type="text"
                      id="cuota_ordinaria"
                      name="cuota_ordinaria"
                      placeholder="12000"
                      value={formulario.cuota_ordinaria}
                      onChange={handleChange}
                    />
                </div>
                <div className='select-item'>
                    <label className='labelInput'>Concepto de Cuota Ordinaria: </label>
                    <input
                      type="text"
                      id="concepto_cuota_ordinaria"
                      name="concepto_cuota_ordinaria"
                      value={formulario.concepto_cuota_ordinaria}
                      placeholder="Cuota Ordinaria"
                      onChange={handleChange}
                    />
                </div>
            </div>

            <div className='select-container'>
                
                <div className='select-item'>
                    <label className='labelInput'>Cuota de Penalizacion($): </label>
                    <input
                      type="text"
                      id="cuota_penalizacion"
                      name="cuota_penalizacion"
                      placeholder="12000"
                      value={formulario.cuota_penalizacion}
                      onChange={handleChange}
                    />
                </div>
                
                <div className='select-item'>
                    <label className='labelInput'>Concepto de Cuota de Penalizacion: </label>
                    <input
                      type="text"
                      id="concepto_cuota_penalizacion"
                      name="concepto_cuota_penalizacion"
                      value={formulario.concepto_cuota_penalizacion}
                      placeholder="Cuota de Penalizacion"
                      onChange={handleChange}
                    />
                </div>
                <div className='select-item'></div>
            </div>

            <div className='select-container'>
                
                <div className='select-item'>
                    <label className='labelInput'>Cuota Extraordinaria($): </label>
                    <input
                      type="text"
                      id="cuota_extraordinaria"
                      name="cuota_extraordinaria"
                      placeholder="12000"
                      value={formulario.cuota_extraordinaria}
                      onChange={handleChange}
                    />
                </div>
                
                <div className='select-item'>
                    <label className='labelInput'>Concepto de Cuota Extraordinaria: </label>
                    <input
                      type="text"
                      id="concepto_cuota_extraordinaria"
                      name="concepto_cuota_extraordinaria"
                      value={formulario.concepto_cuota_extraordinaria}
                      placeholder="Cuota Extraordinaria"
                      onChange={handleChange}
                    />
                </div>
                <div className='select-item'></div>
            </div>

            <div className='select-container'>
                
                <div className='select-item'>
                    <label className='labelInput'>Cuota de Reserva($): </label>
                    <input
                      type="text"
                      id="cuota_reserva"
                      name="cuota_reserva"
                      placeholder="12000"
                      value={formulario.cuota_reserva}
                      onChange={handleChange}
                    />
                </div>
                
                <div className='select-item'>
                    <label className='labelInput'>Concepto de Cuota de Reserva: </label>
                    <input
                      type="text"
                      id="concepto_cuota_reserva"
                      name="concepto_cuota_reserva"
                      value={formulario.concepto_cuota_reserva}
                      placeholder="Cuota de Reserva"
                      onChange={handleChange}
                    />
                </div>
                <div className='select-item'></div>
            </div>

            <div className='select-container'>
                
                <div className='select-item'>
                    <label className='labelInput'>Cuota de Adeudos($): </label>
                    <input
                      type="text"
                      id="cuota_adeudos"
                      name="cuota_adeudos"
                      placeholder="12000"
                      value={formulario.cuota_adeudos}
                      onChange={handleChange}
                    />
                </div>
                
                <div className='select-item'>
                    <label className='labelInput'>Concepto de Cuota de Adeudos: </label>
                    <input
                      type="text"
                      id="concepto_cuota_adeudos"
                      name="concepto_cuota_adeudos"
                      value={formulario.concepto_cuota_adeudos}
                      placeholder="Cuota de Adeudos"
                      onChange={handleChange}
                    />
                </div>
                <div className='select-item'></div>
            </div>

            <div className='Aceptado' style={{ display: visible ? 'block' : 'none' }}>Registro exitoso</div>
            <div className="botones-container"> 
              <Link to="/MenuPrincipal">
                <button className="mi-boton2">Regresar</button>
              </Link>
            <button className="mi-boton2" type='submit'>Registrar</button>
            </div>
          </form>   
        </div>
    );
  }
  export default NuevoRecibo;
  
