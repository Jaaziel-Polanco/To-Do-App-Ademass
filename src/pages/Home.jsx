import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/Logo-APP-Tareas.png'
import logoLanding from '../assets/landing-logo.png'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <>
            <nav className='w-full h-fit flex justify-between pr-6 pt-4 lg:pt-0 lg:px-9 items-center gap-7 animate-fade-right animate-once animate-duration-[2300ms] animate-ease-in-out'>
                <Link to={'/'}><img src={logo} alt="logo" className='w-16 h-16 lg:w-28 lg:h-28 animate-pulse animate-infinite animate-duration-[2500ms] animate-ease-in-out' /></Link>
                <div className='flex gap-3 lg:gap-8 '>
                    <Link to="/register" className='bg-gradientBtn px-4 py-3 lg:px-11 lg:py-3 text-sm lg:text-base rounded-3xl shadow-xl transition-all hover:bg-gradientBtn2 lg:hover:px-12'>Registrate</Link>
                    <Link to="/dashboard" className='bg-gradientBtn2 px-3 py-3 lg:px-11 lg:py-3 text-sm lg:text-base rounded-3xl shadow-xl transition-all hover:bg-gradientBtn lg:hover:px-12'>Iniciar sesión</Link>
                </div>
            </nav>

            <div className='flex flex-col-reverse lg:flex-row justify-center lg:pl-20 py-9 lg:gap-8 mb-20 lg:mb-0 animate-fade animate-once animate-duration-[2300ms] animate-ease-in-out '>
                <div className='lg:w-[600px] lg:h-[628px] flex flex-col gap-6 text-left lg:py-20 px-5 lg:px-0 text-[40px] lg:text-7xl font-roboto font-extrabold'>
                    <h1>Toma el control de tus Tareas en un solo lugar</h1>
                    <p className=' text-sm lg:text-lg font-normal'>Simplifica tu vida con "To-List". Captura tus ideas, organiza proyectos y celebra la realización de cada tarea. Prioriza lo que importa con facilidad y encuentra el equilibrio perfecto entre productividad y serenidad. Dondequiera que estés, lleva tus tareas contigo y transforma la intención en acción. Con "To-List", estás listo para conquistar tu día.</p>
                    <Link to="/dashboard" className='w-40 lg:w-56 h-14 lg:h-16 flex justify-center items-center bg-secondary text-white text-xl lg:text-2xl font-bold rounded-xl shadow-xl transition-all hover:w-44 lg:hover:w-60'>
                        Empezar
                    </Link>
                </div>

                <div className='w-screen lg:w-fit h-fit lg:mt-[-70px]' >
                    <img src={logoLanding} alt="logoLanding" />
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Home