import React, { useEffect } from 'react'
import { useUserContext } from '../context/UserContext'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Loading from '../components/Loading/Loading';

const auth = getAuth();


export const LayoutPrivate = () => {
    const { user, setUser } = useUserContext();
    const [loading, setLoading] = React.useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
            if (user) {
                navigate('/dashboard')
            }
        })
        return () => unsubscribe()
    }, [navigate])

    if (loading) {
        return <Loading />
    }

    if (!user) {
        return <Navigate to="/login" replace={true} />
    }

    return (
        <Outlet />
    )
}
