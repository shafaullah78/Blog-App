import React, { useEffect, useState, } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase/config.js';
import { useNavigate } from "react-router-dom"


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

                    setExistUser(user)

                    if (!existUser) {
                        navigate("/login")
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

    if(loading) {
        
    }


    return (
        children
    )
}

export default ProtectedRoutes