import React, {useState, useEffect} from 'react';
import Form from './Form';
import Post from './Post';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';


const axios = require('axios').default;

const useStyles = makeStyles({
    grid: {
        marginBottom: "50px"
    }
});

const Thread = () => {
    const [posts, setPosts] = useState([]);
    const pathName = document.location.pathname;
    const classes = useStyles();

    const baseURL =
process.env.NODE_ENV === "production"
  ? "/api"
  : "http://localhost:5000/api";

    const getPosts = async () => {
        const response = await axios.get(`${baseURL}${pathName}`);
        const jsonData = await response.data;
        setPosts(jsonData);
    };

    useEffect(() => getPosts(), []);
    return (
        <>
            <Form />
            <Grid className={classes.grid} container direction="column" alignItems="flex-start">
            {posts.map(props => {
                return (
                    <Post key={props.reply_id} {...props}/>
                )
            })}
            </Grid>
        </>
    )
}

export default Thread
