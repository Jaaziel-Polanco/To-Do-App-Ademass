import React from 'react'
import { Outlet } from 'react-router-dom'

const GeneralLayout = () => {
    return (
        <div>
            <Outlet />
            {
                // aca puede ir un footer general
            }
        </div>
    )
}

export default GeneralLayout