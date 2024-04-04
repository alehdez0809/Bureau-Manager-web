import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaArrowCircleLeft, FaArrowCircleRight, FaFilter} from "react-icons/fa";


function VerRecibo() {

  const [visible, setVisible] = useState(false);
  const [registros, setRegistros] = useState([]);
  const [recibosSeleccionados, setRecibosSeleccionados] = useState([]);

  const [mensajeExito, setMensajeExito] = useState('');

  const [paginaActual, setPaginaActual] = useState(1);
  const [registrosPorPagina] = useState(15);

  const [condominios, setCondominios] = useState([]);
  const [edificios, setEdificios] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);

  const [filtroCondominio, setFiltroCondominio] = useState('');
  const [filtroEdificio, setFiltroEdificio] = useState('');
  const [filtroDepartamento, setFiltroDepartamento] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');

  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  useEffect(() => {
        document.body.classList.add('body1');

        return () => {
            document.body.classList.remove('body1');
        };
    
  }, []);
  
  useEffect(()=>{
    cargarCondominios();
    cargarRecibos();
  },[]);

  useEffect(() => {
    if (filtroCondominio) {
      cargarEdificios(filtroCondominio);
    }
  }, [filtroCondominio]);

  useEffect(() => {
    if (filtroEdificio) {
      cargarDepartamentos(filtroEdificio);
    }
  }, [filtroEdificio]);
  
  const cargarCondominios = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem('authData'));
      const id_administrador = parseInt(authData?.id);
      const response = await axios.get(`http://localhost:4000/api/getCondominios/${id_administrador}`);
      setCondominios(response.data);
    } catch (error) {
      console.error("Error al cargar condominios:", error);
    }
  };

  const cargarEdificios = async (idCondominio) => {
    try {
      const response = await axios.post(`http://localhost:4000/api/getEdificiosbyCondominio`, { id_condominio: idCondominio });
      setEdificios(response.data);
      setFiltroEdificio(''); 
    } catch (error) {
      console.error("Error al cargar edificios:", error);
    }
  };

  const cargarDepartamentos = async (idEdificio) => {
    try {
      const response = await axios.post(`http://localhost:4000/api/getDepartamentosbyEdificios`, { id_edificio: idEdificio });
      setDepartamentos(response.data);
      setFiltroDepartamento(''); 
    } catch (error) {
      console.error("Error al cargar departamentos:", error);
    }
  };

  const cargarRecibos = async () => {
    const authData = JSON.parse(localStorage.getItem('authData'));
    const id_administrador = parseInt(authData?.id);
    try {
      const response = await axios.get(`http://localhost:4000/api/getRecibos/${id_administrador}`);
      colocarRecibos(response);
    } catch (error) {
      console.error("Error al cargar recibos:", error);
    }
  };

  const colocarRecibos =(response) =>{
    setRegistros(response.data);
    setPaginaActual(1);

  };

  const handleChangeCondominio = async (e) => {
    const idCondominio = e.target.value;
    setFiltroCondominio(idCondominio);
  
    setFiltroEdificio('');
    setFiltroDepartamento('');
    cargarEdificios(idCondominio);
  };
  

  const handleChangeEdificio = async (e) => {
    const idEdificio = e.target.value;
    setFiltroEdificio(idEdificio);

    setFiltroDepartamento('');
    cargarDepartamentos(idEdificio);
  };
  
  const handleChangeDepartamento = (e) => {
    const idDepartamento = e.target.value;
    setFiltroDepartamento(idDepartamento);
  };

  const ultimoRegistro = paginaActual * registrosPorPagina;
  const primerRegistro = ultimoRegistro - registrosPorPagina;
  const registrosActuales = registros.slice(primerRegistro, ultimoRegistro);

  const paginaSiguiente = () => setPaginaActual(paginaActual + 1);
  const paginaAnterior = () => setPaginaActual(paginaActual - 1);



  const handleSubmit = async event => {
    event.preventDefault();
    const submitButton = event.nativeEvent.submitter;
    const buttonValue = submitButton.getAttribute('value');
    if (buttonValue==='correo'){
        try {
            const resultado = await axios.post('http://localhost:4000/api/enviarRecibosCorreoElectronico', recibosSeleccionados);
            if (resultado.data === 200) {
              setVisible(true);
              setMensajeExito('Recibos enviados correctamente');
              setRecibosSeleccionados([]);
            } else {
              alert(resultado.data);
            }
            } catch (error) {
            console.error(error);
            alert('Error al rcrear correos');
        }
    }
    else{
        try {
            const response = await axios.post('http://localhost:4000/api/generarPDFMasivo', recibosSeleccionados, {
              responseType: 'blob',
            });
          
            const fileURL = window.URL.createObjectURL(response.data);
          
            const link = document.createElement('a');
            link.href = fileURL;
            link.download = 'archivo.pdf';
            link.click();
          
            setVisible(true);
            setRecibosSeleccionados([]);
          } catch (error) {
            console.error(error);
            alert('Error al crear el PDF');
          }
          
    }
  };

  const handleFiltrar = async () => {
    const authData = JSON.parse(localStorage.getItem('authData'));
    const id_administrador = parseInt(authData?.id);
  
    let mes = '';
    let anio = '';
    if (filtroFecha) {
      const parts = filtroFecha.split('-');
      anio = parts[0];
      mes = parseInt(parts[1], 10);
    }
    console.log(mes + anio);
  
    try {
      const response = await axios.get(`http://localhost:4000/api/getRecibosFiltrados/${id_administrador}`, {
        params: {
          condominio: filtroCondominio || null,
          edificio: filtroEdificio || null,
          departamento: filtroDepartamento || null,
          mes,
          anio,
        }
      });
      console.log(response.data);
      colocarRecibos(response);
    } catch (error) {
      console.error("Error al filtrar recibos:", error);
    }
  };
  

  const handleCheckboxChange = (reciboId) => {
    if (recibosSeleccionados.includes(reciboId)) {
      setRecibosSeleccionados(prevState => prevState.filter(id => id !== reciboId));
    } else {
      setRecibosSeleccionados(prevState => [...prevState, reciboId]);
    }
  };
  


  let opcionesRegistro = registrosActuales.length === 0 
    ? <tr><td colSpan="6">No hay registros disponibles</td></tr> 
    : registrosActuales.map(c => (
      <tr key={c.id_recibo}>
        <td>{c.nombre_completo_inquilino}</td>
        <td>{c.fecha}</td>
        <td>{c.no_recibo}</td>
        <td>{c.concepto_pago}</td>
        <td>{c.total_pagar}</td>
        <td>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(c.id_recibo)}
            checked={recibosSeleccionados.includes(c.id_recibo)}
          />
        </td>
      </tr>
    ));
    return (
        <div className='div-contenedor div-espaciado'>
          <form className="fromRecibo" onSubmit={handleSubmit}>

            <h2>Seleccione los Recibos a enviar</h2>
            <button type="button" onClick={() => setMostrarFiltros(!mostrarFiltros)} className="icono-filtro">
              <FaFilter />
            </button>
            <div className={`filtros-contenedor ${mostrarFiltros ? 'mostrar' : ''}`}>
              <select value={filtroCondominio} onChange={handleChangeCondominio} className='select-filtro-recibos'>
                <option value="">Todos los condominios</option>
                {condominios.map((condominio) => (
                  <option key={condominio.id_condominio} value={condominio.id_condominio}>{condominio.nombre_condominio}</option>
                ))}
              </select>
              <select value={filtroEdificio} onChange={handleChangeEdificio} className='select-filtro-recibos'>
                <option value="">Todos los edificios</option>
                  {edificios.map((edificio) => (
                <option key={edificio.id_edificio} value={edificio.id_edificio}>{edificio.nombre_edificio}</option>
                ))}
              </select>
              <select value={filtroDepartamento} onChange={handleChangeDepartamento} className='select-filtro-recibos'>
                <option value="">Todos los departamentos</option>
                  {departamentos.map((departamento) => (
                <option key={departamento.id_departamento} value={departamento.id_departamento}>{departamento.numero_departamento}</option>
                ))}
              </select>
              <input type="month" value={filtroFecha} onChange={e => setFiltroFecha(e.target.value)} style={{marginTop: '10px'}}/>
              <div style={{textAlign: 'right'}}>
                <button type="button" onClick={handleFiltrar} className='btn-pag'>Filtrar</button>
              </div>
              
            </div>
            <table>
                <thead>
                  <tr>
                    <th>Inquilino</th>
                    <th>Fecha</th>
                    <th>No. de Recibo</th>
                    <th>Concepto de Pago</th>
                    <th>Total de Pago</th>
                    <th>Seleccionar:</th>
                  </tr>
                </thead>
                <tbody>
                {opcionesRegistro}
                </tbody>
            </table>
            <div className='Aceptado' style={{ display: visible ? 'block' : 'none' }}>Recibo descargado</div>
            <div className='mensajeExito' style={{ display: visible ? 'block' : 'none' }}>{mensajeExito}</div>
            <div className='select-container'>
            <div className="botones-container"> 
              <Link to="/MenuPrincipal">
                <button className="mi-boton2">Regresar</button>
              </Link>
            <button className="mi-boton2" type='submit' value="correo">Enviar por Correo</button>
            <button className="mi-boton2" type='submit' value="PDF">Hacer PDF de Recibos</button>
            </div>
            </div>
            <div className='navegacion-pag'>
              <button onClick={paginaAnterior} disabled={paginaActual === 1} className='btn-pag'><FaArrowCircleLeft/>  Anterior</button>
              <span className='span-pag'>Página {paginaActual}</span>
              <button onClick={paginaSiguiente} disabled={paginaActual === Math.ceil(registros.length / registrosPorPagina)} className='btn-pag'>Siguiente  <FaArrowCircleRight/></button>
            </div>
          </form>   
        </div>
    );
  }
  export default VerRecibo;
  
