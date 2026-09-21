import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { onAuthStateChanged } from 'firebase/auth/web-extension';
import { auth } from '../firebase/config';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";



const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),

    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

export default function RecipeReviewCard({ blog }) {

    const [expanded, setExpanded] = React.useState(false);

    const [userId, setUserId] = React.useState("")

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const getUsersData = async () => {


        onAuthStateChanged(auth, (user) => {

            if (user) {

                const uid = user.uid;

                console.log("User", user)
                setUserId(uid)

            } else {

                setUserId(null)

            }

        });

    }

    React.useEffect(() => {
        getUsersData()
    }, [])

    const deleteHandler = async (blogId) => {

        console.log(blogId)

        try {
            await deleteDoc(doc(db, "blogs", blogId));

            console.log("Blog deleted successfully");

        } catch (error) {
            console.log("Delete error:", error);
        }

    }


    const editHandler = ({blog}) => {
        console.log("Yes edit button pr click kia to ye function chal raha hai", blog)
    }


    return (

        <Card sx={{ width: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={blog.title}
                subheader="created by me"
            />
            <CardMedia
                component="img"
                // height="194"
                sx={{
                    height: 200,
                    objectFit: "cover"
                }}
                image={blog.blogImgUrl}
                alt={blog.title}
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {blog.description}
                </Typography>
            </CardContent>


            {blog.authorId == userId ? (<CardActions disableSpacing>
                <IconButton onClick={() => editHandler(blog)} aria-label="add to favorites">
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteHandler(blog.id)} aria-label="share">
                    <DeleteIcon />
                </IconButton>
                <ExpandMore

                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"

                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>) : ""}
        </Card>

    );

}
