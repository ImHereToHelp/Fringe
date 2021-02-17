const express = require('express');
const cors = require('cors');
const pool = require('./db');
const fileRoutes = require("./router/file-upload");


const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", fileRoutes);

app.get('/api', async (req, res) => {
    try {
        const allThreads = await pool.query("SELECT * FROM replies WHERE is_thread=true ORDER BY recent_reply_date DESC");
        res.json(allThreads.rows);
    } catch (error) {
        console.error(error.message);
    }
});

app.post('/api', async (req, res) => {
    try {
        const { name, subject, comment, imageUrl } = req.body;
        console.log(imageUrl);
        const newThread = await pool.query("INSERT INTO replies (name, subject, comment, is_thread, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, subject, comment, true, imageUrl]); 
    } catch (error) {
        console.log(error.message);
    }
    
});

app.get('/api/:thread_id', async (req, res) => {
    try {
        const { thread_id } = req.params;
        const originalPost = await pool.query("SELECT * FROM replies WHERE reply_id = $1", [thread_id]);
        const allReplies = await pool.query("SELECT * FROM replies WHERE thread_id = $1", [thread_id])
        res.json(originalPost.rows.concat(allReplies.rows));
    } catch (error) {
        console.log(error.message);
    }
    
});

app.post('/api/:thread_id', async (req, res) => {
    try {
        const { name, comment, imageUrl } = req.body;
        const { thread_id } = req.params;
        const newReply = await pool.query("INSERT INTO replies (name, comment, thread_id, image_url) VALUES ($1, $2, $3, $4) RETURNING *", [name, comment, thread_id, imageUrl]);
        // console.log(newReply);
        await pool.query("UPDATE replies SET reply_count = reply_count + 1 WHERE reply_id = ($1)", [thread_id]);
        await pool.query("UPDATE replies SET recent_reply_date = ($1) WHERE reply_id = ($2)", [newReply.rows[0].post_date, thread_id]);
        res.status(302);
    } catch (error) {
        console.log(error.message);
    }
});



app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
});