import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.js';
import movieRoutes from './routes/movie.js'

const app=express();
const PORT=8080;
app.use(bodyParser.json())

app.get("/", (req, res)=> {
    res.send("Welcome to the Users APIs")
});
app.use("/user", userRoutes)

app.use("/movie",movieRoutes)

app.listen(PORT, ()=>{
    console.log("Server started")
})
