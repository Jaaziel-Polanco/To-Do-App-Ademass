import { useState, useEffect } from 'react';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Loading from '../components/Loading';

import appFirebase from '../config/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const auth = getAuth(appFirebase);

const LayoutPrivate = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
            setUser(usuarioFirebase);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            {user ? <Dashboard /> : <Login />}
        </>
    );
};

export default LayoutPrivate;
