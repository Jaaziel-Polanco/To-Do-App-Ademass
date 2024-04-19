import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/Logo-APP-Tareas.png'
import logoLanding from '../assets/landing-logo.png'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <>
            <nav className='w-full h-fit flex justify-between px-9 items-center gap-7 animate-fade-right animate-once animate-duration-[2300ms] animate-ease-in-out'>
                <Link to={'/'}><img src={logo} alt="logo" className='w-28 h-28 animate-pulse animate-infinite animate-duration-[2500ms] animate-ease-in-out' /></Link>
                <div className='flex gap-8 '>
                    <Link to="/register" className='bg-gradientBtn px-11 py-3 rounded-3xl shadow-xl transition-all hover:bg-gradientBtn2 hover:px-12'>Registrate</Link>
                    <Link to="/dashboard" className='bg-gradientBtn2 px-11 py-3 rounded-3xl shadow-xl transition-all hover:bg-gradientBtn hover:px-12'>Iniciar sesión</Link>
                </div>
            </nav>
            <div className='flex justify-center pl-20 py-9 gap-8 animate-fade animate-once animate-duration-[2300ms] animate-ease-in-out '>

                <div className='w-[600px] h-[628px] flex flex-col gap-6 text-left py-20 text-7xl font-roboto font-extrabold'>
                    <h1>Toma el control de tus Tareas en un solo lugar</h1>
                    <p className='text-lg font-normal'>Simplifica tu vida con "To-List". Captura tus ideas, organiza proyectos y celebra la realización de cada tarea. Prioriza lo que importa con facilidad y encuentra el equilibrio perfecto entre productividad y serenidad. Dondequiera que estés, lleva tus tareas contigo y transforma la intención en acción. Con "To-List", estás listo para conquistar tu día.</p>
                    <Link to="/dashboard" className='w-[225px] h-16 flex justify-center items-center bg-secondary text-white text-2xl font-bold rounded-xl shadow-xl transition-all hover:w-60'>
                        Empezar
                    </Link>
                </div>

                <div className='w-fit h-fit mt-[-70px]' >
                    <img src={logoLanding} alt="logoLanding" />
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Home