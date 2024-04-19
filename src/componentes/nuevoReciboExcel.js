import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosCreate } from "react-icons/io";

function NuevoReciboExcel() {

  useEffect(() => {
    document.body.classList.add('body2');

    return () => {
        document.body.classList.remove('body2');
    };
  });
  return (
    <div style={{paddingTop: "210px"}}>
      <h1>Crear recibos a partir de Excel</h1>
      <Link to="/NuevoRecibo">
            <button type="button" className="mi-boton2" style={{width: '260px'}}><IoIosCreate />  Generar recibos manualmente</button>
      </Link>
      <form className='fromInquilino'>
        <div className='select-container'>
          <div className='select-item'>
            <label>Seleccione un condominio:</label>
            <select id="opciones">

            </select>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NuevoReciboExcel;
