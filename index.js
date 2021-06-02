import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.js';
import mongoose from 'mongoose';
const dbURL='mongodb+srv://acc1:acc1@cluster0.apqfl.mongodb.net/tutorialapp?retryWrites=true&w=majority'
mongoose.connect(dbURL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((result)=> {
    // console.log(result)
    console.log("Connected to the database")
    app.listen(PORT, ()=>{
        console.log("Server started")
    })
}).catch((err)=>{
    console.log(err)
})
const app=express();
const PORT=8080;
app.use(bodyParser.json())

app.get("/", (req, res)=> {
    res.send("Welcome to the Users APIs")
});
app.use("/user", userRoutes)

// app.listen(PORT, ()=>{
//     console.log("Server started")
// })
