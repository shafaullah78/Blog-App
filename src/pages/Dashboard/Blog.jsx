import React from 'react'
import Navbar from "../../componets/Navbar"
import { useState, useEffect } from 'react'
import { auth } from '../../firebase/config'
import { onAuthStateChanged } from 'firebase/auth/web-extension'
import CreateModal from '../../componets/CreateModal'


const Blog = () => {

  const [user, setUser] = useState(null)

  const getUsersData = async () => {


    onAuthStateChanged(auth, (user) => {
      if (user) {

        const uid = user.uid;

        console.log("User", user)
        setUser(user)

      } else {

        setUser(null)

      }

    });

  }


  useEffect(() => {

    getUsersData()

  })

  return (

    <>

      <Navbar user={user} />

      <CreateModal />



    </>

  )

}

export default Blog;