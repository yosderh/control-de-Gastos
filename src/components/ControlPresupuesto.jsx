import { useState, useEffect} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import  'react-circular-progressbar/dist/styles.css' ;

const ControlPresupuesto = ({gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentajeGastado, setPorcentajeGastado] = useState(0);

    useEffect(()=>{
        const totalGastado = gastos.reduce((total,gasto)=> gasto.cantidad + total, 0 )


        setGastado(totalGastado);
        setDisponible(presupuesto - totalGastado);

        setTimeout(()=>{
            setPorcentajeGastado(((totalGastado *100) / presupuesto).toFixed(2));
        },1000)
        
    },[gastos])


    const newFormat = (cantidad)=>{
        return (   cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
        )
    }

    const handleResetApp= ()=>{
        const confirmar = confirm('¿deseas borrar todos los datos de la App?');
        if(confirmar){
            setGastos([]);
            setPresupuesto(0);
            setIsValidPresupuesto(false);
        }

    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar
            styles={buildStyles({
                pathColor: porcentajeGastado>100? '#DC2626' : '#3B82F6',
                trailColor: '#F5F5F5',
                textColor: porcentajeGastado>100? '#DC2626' : '#3B82F6'
            })}
            value={porcentajeGastado}
            text={`${porcentajeGastado}% Gastado`}
            />
        </div>


        <div className='contenido-presupuesto'>

            <button
             className='reset-app'
             onClick={handleResetApp}
             >
                Reset App
            </button>

            <p>
                <span>Presupuesto: </span>
                {newFormat(presupuesto)}
            </p>

            <p className={`${disponible<0? 'negativo' : ''} `}>
                <span>Disponible: </span>
                {newFormat(disponible)}
            </p>

            <p>
                <span>Gastado: </span>
                {newFormat(gastado)}
            </p>
        </div>
      
    </div>
  )
}

export default ControlPresupuesto
