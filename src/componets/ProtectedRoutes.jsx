
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config.js";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {

    const [existUser, setExistUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {

            if (user) {
                console.log("User mil gaya hai");
                console.log(user);

                setExistUser(user);
            } else {
                console.log("User nahi hai");

                setExistUser(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();

    }, []);

    // Jab Firebase check kar raha ho
    if (loading) {
        return <h2>Loading...</h2>;
    }

    // Agar user login nahi hai
    if (!existUser) {
        return <Navigate to="/login" replace />;
    }

    // Agar user login hai
    return children;
};

export default ProtectedRoutes;

