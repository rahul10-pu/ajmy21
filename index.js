import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.js';
import mongoose from 'mongoose';
import tutorialRoutes from "./routes/tutorial.js"
import pgdb from './model/index.js'
import authRotes from './routes/auth.routes.js'
const Role=pgdb.roles
function initializeDB(){
    Role.create({
        id:1,
        nmae:"admin"
    })
    Role.create({
        id:2,
        name:"moderator"
    })
    Role.create({
        id:3,
        name:"user"
    })
}
pgdb.sequelize.sync({force:true})
    .then(
        (result)=>{
            console.log(result)
            initializeDB();
        }
    )
    .catch(
        (err)=>{
            console.log(err)
        }
    )


var corsOption={
    origin:"http://localhost:8081"
}
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
// app.use(corsOption)
const PORT=8080;
app.use(bodyParser.json())

app.get("/", (req, res)=> {
    res.send("Welcome to the Users APIs")
});
app.use("/user", userRoutes)
app.use("/tutorial",tutorialRoutes)
app.use("/api/auth",authRotes)
// app.listen(PORT, ()=>{
//     console.log("Server started")
// })
