import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        const localAuth = localStorage.getItem('auth'); 
        console.log("localAuth:", localAuth);
        setAuth(localAuth); 
    }, []);

    return auth ? <Navigate to="/login" /> :<Outlet />  ;
};

export default ProtectedRoutes;
