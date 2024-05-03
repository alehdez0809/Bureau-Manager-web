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
        
        <div style={{marginTop: "610px"}}>
            <h1>Registro y edición de C/E/D</h1>
            <div className='container2'>
                <div className="nuevoCondominio" style={{marginRight: "20px"}}>
                    <NuevoCondominio />
                </div>
                <div className="edicionCondominio" style={{marginRight: "20px"}}>
                    <NuevoEdificio />
                </div>
                <div>
                    <NuevoDepartamento />
                </div>
            </div>
            <div className='container2' style={{marginTop: "20px"}}>
                <div>
                    <EdicionCondominio />
                </div>
                <div>
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