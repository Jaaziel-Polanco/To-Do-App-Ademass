import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { getAuth, signOut } from "firebase/auth";
import appFirebase from "../../config/firebase";
import { useState } from "react";
import { Button, Col, Drawer, Row, Spin } from "antd";

const auth = getAuth(appFirebase);

interface Props {
    onClose: () => void;
    open: boolean;
}
interface DescriptionItemProps {
    title: string;
    content: React.ReactNode;
}

const UserProfile = ({ onClose, open }: Props) => {
    const { user } = useUserContext();
    const [isSigningOut, setIsSigningOut] = useState(false);
    const navigate = useNavigate();

    const userSignOut = () => {
        setIsSigningOut(true);
        signOut(auth)
            .then(() => {
                setIsSigningOut(false);
                navigate('/');
            })
            .catch((err: any) => {
                setIsSigningOut(false);
                console.error(err);
            })
    }

    const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
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
                    <DescriptionItem title="Full Name" content={user?.displayName} />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Email" content={user?.email} />
                </Col>
            </Row>
            <Row>
                <Col span={10}>
                    <DescriptionItem title="Se unio en" content={user?.metadata.creationTime} />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Ultima vez online" content={user?.metadata.lastSignInTime} />
                </Col>
            </Row>
            <Button
                onClick={userSignOut}
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