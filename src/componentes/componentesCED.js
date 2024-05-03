import React , {useEffect} from 'react';
import NuevoCondominio from './nuevoCondominio';
import EdicionCondominio from './edicionCondominio';
import NuevoEdificio from './nuevoEdificio';
import EdicionEdificio from './edicionEdificio';
import NuevoDepartamento from './nuevoDepa';
import EdicionDepartamento from './edicionDepa';


function ComponenteCED() {

    useEffect(() => {
        document.body.classList.add('body2');
        return () => {
            document.body.classList.remove('body2');
        };
    }, []);
    return (
        
        <div style={{marginTop: "730px"}}>
            <h1 style={{color: "#163C40"}}>Registro y edición de C/E/D</h1>
            <div className='container2'>
                <div className="nuevoCondominio" style={{marginRight: "40px"}}>
                    <NuevoCondominio />
                </div>
                <div className="edicionCondominio" style={{marginRight: "40px"}}>
                    <NuevoEdificio />
                </div>
                <div>
                    <NuevoDepartamento />
                </div>
            </div>
            <div className='container2' style={{marginTop: "30px"}}>
                <div style={{marginRight: "40px"}}>
                    <EdicionCondominio />
                </div>
                <div style={{marginRight: "40px"}}>
                    <EdicionEdificio />
                </div>
                <div>
                    <EdicionDepartamento />
                </div>
            </div>
            
        </div>
    );
}

export default ComponenteCED;