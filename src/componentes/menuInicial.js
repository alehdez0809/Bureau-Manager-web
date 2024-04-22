import React, {useEffect, useState} from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { useAuth } from '../AuthContext';

function MenuInicial() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const authData = JSON.parse(localStorage.getItem('authData'));
    const id_administrador = parseInt(authData?.id);
    const [adminName, setAdminName] = useState('');
    const [adminApellidoP, setAdminApellidoP] = useState('');
    const [adminApellidoM, setAdminApellidoM] = useState('');

    const fetchAdminInfo = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/getAdmin/${id_administrador}`);  // Asegúrate de que el id está siendo correctamente pasado
            const data = await response.json();
            if (response.ok) {
                setAdminName(data.nombre_administrador);  
                setAdminApellidoP(data.apellido_paterno_administrador);
                setAdminApellidoM(data.apellido_materno_administrador);
            } else {
                throw new Error(data.message || 'Error al obtener la información del administrador');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('No se pudo cargar la información del administrador');
        }
    };

    const handleLogout = () => {
        logout(); 
        navigate("/"); 
    };
    useEffect(() => {
        document.body.classList.add('body1');
        fetchAdminInfo();
        return () => {
            document.body.classList.remove('body1');
        };
    }, []);
    return (
          <form className='fromMenu'>
            <h1>Bienvenido administrador(a):</h1>
            <h1>{adminName}</h1>

            <button type="submit" onClick={handleLogout}>Cerrar Sesion</button>


          </form>   
    );
  }
  export default MenuInicial;
  
