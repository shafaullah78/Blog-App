import axios from "axios";

export const uploadImagesToCloudnary = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    formData.append("upload_preset", "Blog-images")

    const response = await axios.post(

        "https://api.cloudinary.com/v1_1/sdfnemh8/image/upload",

        formData
    )

    console.log(response)

   return response.data

}
