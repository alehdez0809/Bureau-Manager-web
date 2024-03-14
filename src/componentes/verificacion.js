import React, { useState } from 'react';

// Importa las librerías necesarias

// Componente de verificación en dos pasos
const Verificacion = () => {
    // Estado para almacenar el código ingresado
    const [codigo, setCodigo] = useState('');
    // Estado para controlar si el código es incorrecto
    const [codigoIncorrecto, setCodigoIncorrecto] = useState(false);
    // Estado para controlar si se ha enviado el código
    const [codigoEnviado, setCodigoEnviado] = useState(false);

    // Función para manejar el cambio en el campo de texto
    const handleChangeCodigo = (event) => {
        setCodigo(event.target.value);
    };

    // Función para manejar el envío del código
    const handleSubmitCodigo = (event) => {
        event.preventDefault();

        // Comprueba si el código es correcto
        if (codigo === 'codigoCorrecto') {
            // Código correcto, realiza la acción deseada
            console.log('Código correcto');
        } else {
            // Código incorrecto, muestra el mensaje de error
            setCodigoIncorrecto(true);
        }
    };

    // Función para manejar el reenvío del código
    const handleReenviarCodigo = () => {
        // Lógica para reenviar el código
        console.log('Código reenviado');
    };

    return (
        <form onSubmit>
            <h1>Verificación en dos pasos</h1>
            <hr></hr>
            <div className='form-group'>
                <p>Para poder continuar, por favor, ingrese el código de verificación que se le 
                    ha enviado a su correo electrónico
                </p>
                <input
                    type='text'
                    id='codigo'
                    name='codigo'
                    placeholder='Código de verificación'
                />
                <button type='submit'>Comprobar</button>
                <p className='p2'>Reenviar código</p>
            </div>    

        </form>    
    );
};

export default Verificacion;