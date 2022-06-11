let {instrument} = require("@socket.io/admin-ui")

let express = require("express")
let socket = require("socket.io")
let app = express()


let server = app.listen(5000,function(){
    console.log("express is running...")
},{
    cors: {
        origin: ["https://admin.socket.io/" , "http://localhost:8080"]
    }
})

app.use(express.static("docs"))

let io = socket(server)

io.on("connection",function(socket){
    socket.on("send-message",(message,room)=>{
        if(room === ""){
            socket.broadcast.emit("receive-message",message)
        }else{
            socket.to(room).emit("receive-message",message)
        }
    })
    socket.on("join-room",(room,cb)=>{
        socket.join(room)
        cb(`Joined ${room}`)
    })
})
  
instrument(io,{auth: false})