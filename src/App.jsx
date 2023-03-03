import { useState, useEffect } from 'react'
import NuevoGasto from './components/NuevoGasto';
import { generarId } from './helpers';
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos';
import Filtros from './components/Filtros';

import IconoNuevoGasto from './img/nuevo-gasto.svg'
// import { object } from 'prop-types';

function App() {
  const [presupuesto, setPresupuesto]= useState(Number(localStorage.getItem('presupuesto'))?? 0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos]= useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );
  const [gastoEditar, setGastoEditar]= useState({});
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(()=>{
    if(Object.keys(gastoEditar).length>0){
      setModal(true);

      setTimeout(()=>{
        setAnimarModal(true);
      },500);
    }
  },[gastoEditar])

  useEffect(()=>{
      if(filtro){
        const gastoFiltrado = gastos.filter(gasto=> gasto.categoria===filtro );
        setGastosFiltrados(gastoFiltrado);
      }
  },[filtro])

  useEffect(()=>{
      localStorage.setItem('presupuesto', presupuesto ?? 0);
    },[presupuesto])
    
    useEffect(()=>{
      const presupuestoLS= Number(localStorage.getItem('presupuesto'))?? 0;
      if(presupuestoLS>0){
        setIsValidPresupuesto(true);
        
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [] );
  },[gastos])
  
    const handleNuevoGasto= ()=>{
      setModal(true);
      setGastoEditar({});

      setTimeout(()=>{
        setAnimarModal(true);
      },500);
    }

    const guardarGastos = gasto=>{

      if(gasto.id){
        // actualizar
        const gastoActualizado= gastos.map(gastoState=> gastoState.id===gasto.id ? gasto : gastoState);

        setGastos(gastoActualizado); 
        setGastoEditar({});
      }else{
        // crear nuevo gasto
        gasto.id= generarId();
        gasto.fecha= Date.now()
        setGastos([...gastos , gasto]);
      }

      setTimeout(()=>{
        setModal(false);
      },500)

      setAnimarModal(false);
    }

    const eliminarGasto = id=>{
        const gastosActualizado = gastos.filter(gasto=> gasto.id !== id )

        setGastos(gastosActualizado); 
    }
  
  return (
   <div className={modal ? 'fijar' : ''}>
    <Header
      gastos={gastos}
      setGastos={setGastos}
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      isValidPresupuesto={isValidPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
    />

    {isValidPresupuesto && (
      <>

      <main>
        <Filtros 
          filtro={filtro}
          setFiltro={setFiltro}
        />
        <ListadoGastos 
          gastos={gastos}
          setGastoEditar={setGastoEditar}
          eliminarGasto={eliminarGasto}
          filtro={filtro}
          gastosFiltrados={gastosFiltrados}
        />
      </main>
      
      <div className='nuevo-gasto'>
          <img src= {IconoNuevoGasto}
             alt="icono de agregar nuevo gasto"
             onClick={handleNuevoGasto} 
          />
      </div>

      </>
    )}
      {modal && <NuevoGasto
       setModal={setModal} 
       animarModal={animarModal}
       setAnimarModal= {setAnimarModal}
       guardarGastos= {guardarGastos}
       gastoEditar= {gastoEditar}
       setGastoEditar={setGastoEditar}
       />}

   </div>
  )
}

export default App
