import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MenuInquilino() {
    return (
          <form >
            <h1>Administrar Inquilino</h1>
            <div style={{ textAlign: "center" }}>
                <Link to="/NuevoInquilino">
                    <button>Registrar nuevo Inquilino</button>
                </Link>
                <Link to="/EditoInquilino">
                    <button>Editar Inquilino</button>
                </Link>
                
            </div>
            
            <div className="botones-container">
            <Link to="/MenuPrincipal">
            <button type="submit">Regresar</button>
            </Link>
            </div>

          </form>   
    );
  }
  export default MenuInquilino;
  
