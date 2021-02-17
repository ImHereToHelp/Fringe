import React from 'react';
import { Grid, TextField, Paper, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const moment = require('moment');

const useStyles = makeStyles({
    paper: {
        backgroundColor: "#d6daf0",
        textAlign: "left",
        marginBottom: "5px",
        wordWrap: "break-word",
        padding: "10px",
        
    }
    ,
    name: {
        fontWeight: "bold",
        color: "#117743",
        marginBottom: "5px"
    }
    
    ,
    comment: {
        marginLeft: "15px",
    }
    ,
    commentContainer: {
        // wordWrap: "break-word",
        maxWidth: "70vw",
    }
    ,
    postGrid: {
        padding: "0px 15px"
    }
});


const Post = ({ reply_id, thread_id, name, subject, comment, post_date, is_thread, reply_count, image_url}) => {
    const classes = useStyles();
    const date = new Date(post_date.replace(' ', 'T'));

    return (
        <Grid item className={classes.postGrid}>
            <Paper elevation={2} className={classes.paper}>
                <Typography className={classes.name} display='inline'>{name === '' ? "Anonymous" : name}</Typography>
                <Typography display='inline'>   {moment(date).format('llll')} EST </Typography>
                <Typography display='inline'>No.{reply_id}</Typography>
                <Grid item container wrap="nowrap" >
                    <Grid item>
                        {
                            image_url !== '' ? <a href={image_url}><img className={classes.image} src={image_url} width="200" height="200" alt=""/></a> : <></>
                        }
                    </Grid>
                    
                    <Grid item nowrap className={classes.commentContainer}>
                        <Typography  className={classes.comment} display='inline'>{comment}</Typography>
                    </Grid>
                     
                </Grid>
                
            </Paper>
        </Grid>
    )
}

export default Post
