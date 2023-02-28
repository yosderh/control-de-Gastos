import React from 'react'
import btnCerrar from '../img/cerrar.svg'
import FormularioNuevoGasto from './FormularioNuevoGasto'

const NuevoGasto = ({setModal, animarModal, setAnimarModal, guardarGastos, gastoEditar, setGastoEditar}) => {
    const handleCerrarModal= ()=>{
      
      setTimeout(()=>{
        setModal(false);
        setGastoEditar({});
      },500)

      setAnimarModal(false);

    }


  return (
    <div className="modal">
      <div className='cerrar-modal'>

        <img 
        src={btnCerrar} 
        alt="boton para cerrar el Modal" 
        onClick={handleCerrarModal}
        />
      </div>
        <FormularioNuevoGasto
          animarModal={animarModal}
          guardarGastos= {guardarGastos}
          gastoEditar={gastoEditar}
        />
    </div>
  )
}

export default NuevoGasto
