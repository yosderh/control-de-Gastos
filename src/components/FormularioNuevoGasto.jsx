import React, { useState, useEffect } from 'react'
import Mensaje from './Mensaje';

const FormularioNuevoGasto = ({animarModal, guardarGastos, gastoEditar}) => {
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [id, setId]= useState('');
    const [fecha, setFecha] = useState('');

    useEffect(()=>{
      if(Object.keys(gastoEditar).length>0){
        setNombre(gastoEditar.nombre);
        setCantidad(gastoEditar.cantidad);
        setCategoria(gastoEditar.categoria);
        setId(gastoEditar.id);
        setFecha(gastoEditar.fecha);
      }
    },[])

    const handleSubmit = e=>{
        e.preventDefault()

        if([nombre, cantidad,categoria].includes('')){
            setMensaje('Todos los Campos son Obligatorios');
            
            setTimeout(()=>{
                setMensaje('');
            },3000);

            return
        }

        guardarGastos({nombre, cantidad, categoria,id, fecha});
        
    }

    
  return (
    <div>

      <form className={`formulario  ${animarModal? 'animar' : 'cerrar'}`}
            onSubmit={handleSubmit}
      >
      <legend>{gastoEditar.nombre? 'Editar Gasto': 'nuevo gasto'}</legend>
      {mensaje&& <Mensaje tipo='error'>{mensaje}</Mensaje> }

      <div className="campo">
        <label htmlFor="nombre">Nombre Gasto</label>
        <input 
            id='nombre'
            type="text"
            placeholder='Añade el Nombre del Gasto'
            value={nombre}
            onChange={e => setNombre(e.target.value)}
        />

      </div>
      <div className="campo">
        <label htmlFor="cantidad">Cantidad</label>
        <input 
            id='cantidad'
            type="number"
            placeholder='Añade la cantidad'
            value={cantidad}
            onChange={e=> setCantidad(Number(e.target.value))}
        />
      </div>
      <div className="campo">
        <label htmlFor="categoria">Categoria Gasto</label>
        <select 
        id="categoria"
        value={categoria}
        onChange={e=> setCategoria(e.target.value)}
        >
            <option value="">--Seleccione--</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
        </select>
      </div>

        <input type="submit" value={gastoEditar.nombre? 'guardar cambios':'añadir Gasto'} />

      </form>
    </div>
  )
}

export default FormularioNuevoGasto
