import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function VerRecibo() {

  const [visible, setVisible] = useState(false);
  const [registros, setRegistros] = useState([]);
  const [recibosSeleccionados, setRecibosSeleccionados] = useState([]);

  const [mensajeExito, setMensajeExito] = useState('');


  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('authData'));
    const id_administrador = parseInt(authData?.id);
    axios.get(`http://localhost:4000/api/getRecibos/${id_administrador}`)
      .then(response => {
        if(response.data.length === 0){
          setRegistros([]);
        }
        else{
          setRegistros(response.data);
        }})
      .catch(error => {
        console.log(error);
        alert('Error al obtener los recibos');
      });
  }, []);
  

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
          
            // Crear un enlace temporal y simular un clic para descargar el archivo
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


  const handleCheckboxChange = (reciboId) => {
    if (recibosSeleccionados.includes(reciboId)) {
      // Si el recibo ya está seleccionado, se remueve de la lista
      setRecibosSeleccionados(prevState => prevState.filter(id => id !== reciboId));
    } else {
      // Si el recibo no está seleccionado, se agrega a la lista
      setRecibosSeleccionados(prevState => [...prevState, reciboId]);
    }
  };
  


  let opcionesRegistro;
  if (registros.length === 0) {
    opcionesRegistro = <h2>No hay registros disponibles</h2>;
  } else {
    opcionesRegistro = registros.map(c => (
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
  }
    return (
        <div className='div-contenedor '>
          <form className="fromRecibo" onSubmit={handleSubmit}>
            <h2>Seleccione los Recibos a enviar</h2>

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
          </form>   
        </div>
    );
  }
  export default VerRecibo;
  
