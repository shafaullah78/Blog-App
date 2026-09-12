import { Box, Paper } from "@mui/material";
import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


import { auth } from "../../firebase/config.js"
import Buttons from "../../componets/Buttons";
import Input from "../../componets/Input";

const Signup = () => {

    const provider = new GoogleAuthProvider();

    const [form, setForm] = useState({
        email: "",
        password: "",
        username: ""
    })

    const handleInputChange = (key, value) => {

        console.log("Handle working", value)

        setForm((prev) => ({ ...prev, [key]: value }))
    }

    const signupHandler = async () => {

        console.log("Sign up function chala", form);

        try {

            let response = await createUserWithEmailAndPassword(auth, form.email, form.password)

            console.log(response)

            if(response.user) {
                return toast.success("Signup successfully.!")
            }
         

        } catch (error) {

            const errorMessage = error.message
            const errorCode = error.code

            console.log(errorMessage, errorCode)

            if (errorMessage === "auth/email-already-in-use" || errorCode === "auth/email-already-in-use") {
                return toast.error("user already existing!")
            }else if(errorMessage === "auth/weak-password" || errorCode === "auth/weak-password") {
                return toast.warning("Password should be at least 6 charaters!")
            }else if(errorMessage === "auth/invalid-email" || errorCode === "auth/invalid-email") {
                return toast.error("Invalid Email")
            }



        }

    }

    const signupWithGoogleHandler = () => {

    }

    return (

        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",

        }}>
            <Paper sx={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                padding: "10px",
                width: "400px"
            }}>

                <h1 className="text-3xl font-bold text-center mb-4">Sign Up Page</h1>

                <Input handler={handleInputChange} label="Enter your username" type="username" value={form.username} />
                <Input handler={handleInputChange} label="Enter your Email" type="email" value={form.email} />
                <Input handler={handleInputChange} label="Enter your Password" type="password" value={form.password} />

                <Box className="flex justify-center mb-3">
                    <Buttons title={"Signup with Google"} />
                </Box>

                <Box className="flex justify-center ">
                    <Buttons handler={signupHandler} title={"Signup"} />
                </Box>

            </Paper>
            <ToastContainer />
        </Box>

    )
}

export default Signup