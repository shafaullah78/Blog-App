import react from "react"
import Navbar from "../../componets/Navbar"
import BlogCards from "../../componets/BlogCards"
import { useState, useEffect } from "react";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";


function Home() {

    const [allBlogs, setAllBlogs] = useState([]);

    const getCardData = async () => {

        try {

            const q = query(collection(db, "blogs"));

            const querySnapshot = await getDocs(q);
            const blogs = querySnapshot.docs.map((doc) => (
                { // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());

                    id: doc.id,
                    ...doc.data()
                }
                
            ));

            setAllBlogs(blogs)


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCardData()
    }, [])

    useEffect(()=> {
        console.log("All blogs ka current data: ", allBlogs)
        console.log("All blogs ki total length: ", allBlogs.length)
    })


    return (
        <>
            <Navbar />
            <h1 className="text-center text-3xl mt-5 mb-8">All Blogs</h1>


            <div className='flex justify-around gap-5px flex-wrap'>

                {allBlogs.length > 0 ? allBlogs.map((blog) => (<BlogCards key={blog.id} blog={blog} />)) : <h1 className="text-center text-3xl">Blog finding...</h1>}

            </div>

        </>

    )

}

export default Home
