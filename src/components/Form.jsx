import { useState, useEffect } from 'react';
import Error from './Error';

const Form = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [alta, setAlta] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    if(Object.keys(paciente).length > 0) {
        setNombre(paciente.nombre);
        setPropietario(paciente.propietario);
        setEmail(paciente.email);
        setAlta(paciente.alta);
        setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  const generarID = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validación del formulario
    if([ nombre, propietario, email, alta, sintomas ].includes('')) {
        setError(true);
        return;
    } 
    
    setError(false);

    //Objeto de Pacientes
    const objetoPaciente = {
        nombre,
        propietario,
        email,
        alta,
        sintomas
    }

    if(paciente.id) {
        //Editando registro
        objetoPaciente.id = paciente.id;
        const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState);
        setPacientes(pacientesActualizados);
        setPaciente({});
    } else {
        //Nuevo registro
        objetoPaciente.id = generarID();
        setPacientes([...pacientes, objetoPaciente]);
    }

    //Reiniciar el Form
    setNombre('');
    setPropietario('');
    setEmail('');
    setAlta('');
    setSintomas('');
  }

  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
        <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>
        <p className='text-lg mt-5 text-center mb-10'>
            Añade Pacientes y {''}
            <span className='text-indigo-600 font-bold'>Administralos</span>
        </p>
        <form onSubmit={handleSubmit} className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'>
            {error && <Error>Todos los campos son obligatorios</Error>}
            <div className='mb-5'>
                <label htmlFor='nombreMascota' className='block text-gray-700 uppercase font-bold'>Nombre mascota</label>
                <input 
                    id='nombreMascota'
                    type="text" 
                    placeholder='Nombre de la mascota'
                    className='border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400'
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor='nombrePropietario' className='block text-gray-700 uppercase font-bold'>
                    Nombre Propietario
                </label>
                <input 
                    id='nombrePropietario'
                    type="text" 
                    placeholder='Nombre del propietario'
                    className='border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400'
                    value={propietario}
                    onChange={(e) => setPropietario(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor='nombreEmail' className='block text-gray-700 uppercase font-bold'>
                    Email
                </label>
                <input 
                    id='nombreEmail'
                    type="Email" 
                    placeholder='Email contacto propietario'
                    className='border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor='alta' className='block text-gray-700 uppercase font-bold'>
                    Alta
                </label>
                <input 
                    id='alta'
                    type="date" 
                    className='border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400'
                    value={alta}
                    onChange={(e) => setAlta(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label htmlFor='sintomas' className='block text-gray-700 uppercase font-bold'>
                    Síntomas
                </label>
                <textarea 
                id="sintomas" 
                cols="30" rows="10"
                placeholder='Describe los sintomas'
                className='border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400'
                    value={sintomas}
                    onChange={(e) => setSintomas(e.target.value)}></textarea>
            </div>
            <input 
            value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente' } 
            type="submit" 
            className='bg-indigo-600 w-full hover:bg-indigo-700 cursor-pointer transition-all p-3 text-white uppercase font-bold' />
        </form>
    </div>
  )
}

export default Form