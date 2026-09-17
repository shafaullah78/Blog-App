import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from './Input';
import Buttons from './Buttons';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function CreateModal() {

    const [blogForm, setBlogForm] = React.useState({
        title: "",
        description: "",
        file: null
    })

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleInputChange = (key, value) => {
        setBlogForm((prev) => ({...prev, [key]: value}))
    }


    const postBlogHandler = () => {

        try {

            console.log("Post blog handler is working")

            console.log(blogForm)

        } catch (error) {

            console.log("Post blog handler is not working properly")

        }

    }

    return (
        <div>
            <Button onClick={handleOpen}>Create a Blog</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create your blog
                    </Typography>

                    <Input
                        label="Blog Title"
                        type="text"
                        handler={handleInputChange}
                        id="title"
                        value={blogForm.title}
                    />

                    <Input
                        label="Blog Description"
                        type="text"
                        handler={handleInputChange}
                        id="description"
                        value={blogForm.description}
                    />

                    <Input
                        label="Choose the file"
                        type="file"
                        handler={handleInputChange}
                        id="file"
                        value={blogForm.file}
                    />

                    <Buttons
                        handler={postBlogHandler}
                        title={"Create Blog"}
                    />

                </Box>
            </Modal>
        </div>
    );
}
