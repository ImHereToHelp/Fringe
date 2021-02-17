import React, { useState } from 'react';
import { Grid, TextField,  Paper, Button, Divider } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/styles';

const axios = require('axios').default;

const useStyles = makeStyles({
    root: {
        width: "350px",
        margin: 'auto'
    }
    ,
    button:{
        width: '50px',
    }
    ,
    input: {
        // display: 'none'
    }
    ,
    divider: {
        margin: "10px 0px"
      }
});

const Form = () => {

    const classes = useStyles();
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [comment, setComment] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const pathName = document.location.pathname;
    const image = document.getElementById("image-upload");

    const baseURL = process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5000/api";

    const handleSubmit = async e => {
        e.preventDefault();
        if (comment.trim() === '') {
            alert('Posts require a comment');
            return;
        }
        if (image.files[0] !== undefined) {
            const formData = new FormData();
            formData.append("image", image.files[0], "test");
            const response = await axios.post(`${baseURL}/image-upload`, formData);
            document.location.reload();
            const response2 = await axios.post(`${baseURL}${pathName}`, {
                name: name,
                subject: subject,
                comment: comment,
                imageUrl: response.data.imageUrl
            });
        } else {
            axios.post(`${baseURL}${pathName}`, {
                name: name,
                subject: subject,
                comment: comment,
                imageUrl: imageUrl
        });
            document.location.reload();
        }
    }

    const showSubjectField = () => {
        if (pathName === '/')
            return (<TextField variant="outlined" placeholder="Subject" size="small" fullWidth value={subject} onChange={e => setSubject(e.target.value)}></TextField>)
        else
            return <></>
    };

    return (
       <> <Grid container direction="column" alignItems="center">
            <form className="form-container" onSubmit={e => handleSubmit(e)}>
                <Grid item>
                    <Paper className={classes.root} elevation={5}>
                        <TextField variant="outlined" placeholder="Name" size="small" fullWidth value={name} onChange={e => setName(e.target.value)}></TextField>
                        {showSubjectField()}
                        <TextField variant="outlined" placeholder="Comment" multiline rows={6} fullWidth value={comment} onChange={e => setComment(e.target.value)}></TextField> 
                    </Paper>    
                </Grid>
                    <Grid container item justify="space-between">
                        <input accept="image/*" className={classes.input} id="image-upload" type="file" />
                        <Button type="submit" variant="contained" color="primary" className={classes.button}>Post</Button>
                        
                </Grid>
            </form>
            <Divider className={classes.divider} />
        </Grid>
        <Divider className={classes.divider} />
    </>
    )
}

export default Form
