import React, {useState, useEffect} from 'react';
import ThreadCard from './ThreadCard';
import { Grid } from '@material-ui/core';
import Form from './Form';

const axios = require('axios').default;
const baseURL = process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5000/api";

const Content = () => {
    const [threads, setThreads] = useState([]);

    const getThreads = async () => {
        const response = await axios.get(`${baseURL}`);
        const jsonData = await response.data;
        setThreads(jsonData);
    };
    useEffect(() => getThreads(),[]);

    return (
        <>
        <Form />
        <Grid container>
            {threads.map(props => {
                return (
                    <ThreadCard key={props.reply_id} {...props}/>
                )
            })}
        </Grid>
        </>
    )
}

export default Content
