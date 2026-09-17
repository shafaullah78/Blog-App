/*
import React, { useEffect, useState, } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase/config.js';
import { Navigate, useNavigate } from "react-router-dom"


const ProtectedRoutes = ({ children }) => {

    const [existUser, setExistUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const getUsersData = async () => {

        try {

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/auth.user
                    const uid = user.uid;

                    console.log("User", user)
                    setExistUser(user)

                    if (existUser) {
                        console.log("User mil gia hai")
                    } else {
                        <Navigate to="/login" />
                    }

                } else {

                    console.log("user nahi hai")

                }

            });

        } catch (error) {

            console.log(error)
            setExistUser(null)
        }

    }


    useEffect(() => {
        getUsersData()
    }, [])

    if (loading) {

    }


    return (
        children
    )
}

export default ProtectedRoutes */


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

