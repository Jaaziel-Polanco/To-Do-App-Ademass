import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import appFirebase from '../config/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const auth = getAuth(appFirebase);

const LayoutPrivate = () => {
    const { user, setUser } = useUserContext();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Hook para manejar la navegación
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
            setUser(usuarioFirebase);
            setLoading(false);
            if (usuarioFirebase) {
                navigate('/dashboard'); // Redirige al Dashboard si hay usuario
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    if (loading) {
        return <Loading />;
    }

    if (!user) {
        return <Navigate to="/login" replace={true} />;
    }

    return <Outlet />;
};

export default LayoutPrivate;