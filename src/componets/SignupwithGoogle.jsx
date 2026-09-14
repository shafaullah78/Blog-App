import React from 'react'
import Buttons from './Buttons'
import { auth } from '../firebase/config'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { Box } from '@mui/material'

import { saveDataIntoDB } from '../pages/auth/Signup'


const SignupwithGoogle = ({ title }) => {

    const provider = new GoogleAuthProvider()

    const LoginWithGoogleHandler = async () => {

        console.log("Ab continue with google wala kaam ho rha hai")

        try {
            const provider = new GoogleAuthProvider();
            let response = await signInWithPopup(auth, provider)

            // console.log(response)

            saveDataIntoDB("", "", response.user)


        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Box className="flex justify-center mb-3">

            <Buttons
                handler={LoginWithGoogleHandler}
                title={"Login with Google"}
            />

        </Box>
    )
}

export default SignupwithGoogle