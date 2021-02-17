import React from 'react';
import { Grid,  Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    card: {
        width: "200px",
        height: "290px",
        margin: "10px",
        paddingTop: "10px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        borderRadius: '25px',

        '&:hover': {
            backgroundColor: "#d6daf0",
            border: "1px solid black",
        }

    }
    ,
    subject: {
        wordWrap: "break-word",
        fontSize: "16px",
        fontWeight: "bold"
    }
    ,
    textTeaser: {
        wordWrap: "break-word",
        fontSize: "14px",
    }
});

const ThreadCard = ({reply_id, thread_id, name, subject, comment, post_date, is_thread, reply_count,image_url}) => {

    const classes = useStyles();


    return (
        <Link to={`/${reply_id}`}>
            <Grid item className={classes.card}>
                {
                    image_url !== '' ? <img src={image_url} alt="" width="130" height="150"/> : <></>
                }
            <Typography>Replies: {reply_count}</Typography>
            <Typography className={classes.subject}>{subject}</Typography>
            <Typography className={classes.textTeaser}>{comment}</Typography>
        </Grid >
        </Link>
    )
}

export default ThreadCard
