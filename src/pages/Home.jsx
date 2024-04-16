import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>Home en proceso...
            <Link className='bg-primary rounded m-5' to="/login"> ir al Login</Link>
        </div>
    )
}

export default Home