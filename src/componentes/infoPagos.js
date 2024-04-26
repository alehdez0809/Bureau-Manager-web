import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

function InfoPagos() {
    const authData = JSON.parse(localStorage.getItem('authData'));
    const id_administrador = parseInt(authData?.id);

    const [datosPagos, setDatosPagos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const [registrosPorPagina] = useState(10);

    const [condominios, setCondominios] = useState([]);
    const [edificios, setEdificios] = useState([]);

    const [filtroCondominio, setFiltroCondominio] = useState('');
    const [filtroEdificio, setFiltroEdificio] = useState('');
    const [filtroFecha, setFiltroFecha] = useState('');

    const [mostrarFiltros, setMostrarFiltros] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/getInfoPagos/${id_administrador}`);
                
                setDatosPagos(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error al obtener los datos');
                setLoading(false);
                console.error(err);
            }
        };

        fetchData();

        document.body.classList.add('body1');
        return () => {
            document.body.classList.remove('body1');
        };
    }, [id_administrador]);

    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>Error al cargar los datos: {error}</p>;

    const ultimoRegistro = paginaActual * registrosPorPagina;
    const primerRegistro = ultimoRegistro - registrosPorPagina;
    const datosActuales = datosPagos.slice(primerRegistro, ultimoRegistro);

    const paginaSiguiente = () => {
        if (paginaActual < Math.ceil(datosPagos.length / registrosPorPagina)) {
            setPaginaActual(paginaActual + 1);
        }
    };

    const paginaAnterior = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
        }
    };

    return (
        <div className='div-contenedor div-espaciado' style={{marginTop: "150px"}}>
            <h1>Información de Pagos</h1>
            <form className="fromRecibo">
                <table>
                    <thead>
                        <tr>
                            <th>Condominio</th>
                            <th>Departamento</th>
                            <th>Total Pagado</th>
                            <th>Adeudo</th>
                            <th>Fecha de Registro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datosActuales.length > 0 ? (
                            datosActuales.map((pago, index) => (
                                <tr key={index}>
                                    <td>{pago.nombre_condominio}</td>
                                    <td>{pago.numero_departamento}</td>
                                    <td>{pago.total_pagado}</td>
                                    <td style={{ color: parseFloat(pago.adeudo) > 0 ? 'red' : 'black' }}>{pago.adeudo}</td>
                                    <td>{pago.fecha_pago}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center" }}>No hay registros</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="navegacion-pag">
                    <button onClick={paginaAnterior} disabled={paginaActual === 1} className="btn-pag" type='button'>
                        <FaArrowCircleLeft /> Anterior
                    </button>
                    <span>Página {paginaActual} de {Math.ceil(datosPagos.length / registrosPorPagina)}</span>
                    <button onClick={paginaSiguiente} disabled={paginaActual === Math.ceil(datosPagos.length / registrosPorPagina)} className="btn-pag" type='button'>
                        Siguiente <FaArrowCircleRight />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default InfoPagos;
