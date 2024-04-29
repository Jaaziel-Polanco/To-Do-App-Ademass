import { Button, Col, Drawer, List, Row, Spin } from 'antd'
import React, { useState } from 'react'
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import appFirebase from '../../config/firebase';

const auth = getAuth(appFirebase);

const UserProfile = ({ onClose, open }) => {
    const { user } = useUserContext();
    const [isSigningOut, setIsSigningOut] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = () => {
        setIsSigningOut(true);
        signOut(auth)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.error('Error al cerrar la sesión', error);
                setIsSigningOut(false);
            });
    };

    const DescriptionItem = ({ title, content }) => (
        <div className="site-description-item-profile-wrapper">
            <p className="site-description-item-profile-p-label">{title}:</p>
            {content}
        </div>
    );

    return (
        <Drawer width={640} height={250} placement="top" closable={false} onClose={onClose} open={open}>
            <p
                className="site-description-item-profile-p"
                style={{
                    marginBottom: 24,
                }}
            >
                Perfil de usuario
            </p>
            <Row>
                <Col span={10}>
                    <DescriptionItem title="Full Name" content={user.displayName} />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Email" content={user.email} />
                </Col>
            </Row>
            <Row>
                <Col span={10}>
                    <DescriptionItem title="Se unio en" content={user.metadata.creationTime} />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Ultima vez online" content={user.metadata.lastSignInTime} />
                </Col>
            </Row>
            <Button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="text-white mt-3 lg:my-10 bg-red-600 ">
                {isSigningOut ? <Spin /> : "Cerrar sesión"}
            </Button>
            <Button
                onClick={() => navigate('/')}
                className="text-white ml-5 bg-primary">
                Ir al inicio
            </Button>
        </Drawer>
    )
}

export default UserProfile