let socket = io.connect("http://localhost:5000")
let room_input = document.getElementById("room-input")
let send_btn = document.getElementById("send-button")
let join_btn = document.getElementById("join-button")
let input = document.getElementById("message-input")
let form = document.getElementById("send-container")
let top_big_div = document.querySelector(".message-container")
socket.on("connect",()=>addMessage(`You connected with id: ${socket.id}`))

join_btn.addEventListener("click",()=>{
    let room = room_input.value
    socket.emit("join-room",room,message=>{
        addMessage(message)
    })
})

socket.on("receive-message",message=>{
    addMessage(message)
})
form.addEventListener("submit",e=>{
    e.preventDefault()
    let room = room_input.value
    let message = input.value
    if(message){
         socket.emit("send-message",message,room)
          input.value = ""
    }
})
function addMessage(message){
    let newDiv = document.createElement("div")
    newDiv.textContent = message
    console.log(newDiv)
    newDiv.classList.add("bebeDivStyle")
    document.querySelector(".message-container").appendChild(newDiv)
}