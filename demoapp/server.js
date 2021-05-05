const hostname='127.0.0.1'
const port=8000;

const server = require('./controller/controller')
server.listen(port, hostname,()=>{
    console.log(`server running at http://${hostname}:${port}/`)
});