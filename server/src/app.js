const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http");
const app = express();
const server = http.Server(app);
const io = require("socket.io")(server);
const socketIO = require("./controllers/socket");
mongoose.Promise = global.Promise;

//Import routes
const UserRoutes = require("./routes/users");
const MessageRoutes = require("./routes/messages");
const ConvoRoutes = require("./routes/convos");


// Connect to our mongoDB instance
mongoose.connect(
  "mongodb://localhost:27017/mevnChatDb",
  err => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected");
    }
  }
);

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

//Setup routes
app.use("/api/users", UserRoutes());
app.use("/api/messages", MessageRoutes());
app.use("/api/convos", ConvoRoutes());


app.set("port", port);

//socket stuff//
io.on('connection', (socket) => {
    socket.on('join', (room) => {
      console.log('user has connected to room#' + room)
      socket.room = room
      console.log(room)
      socket.join(room)
    })

    //when the client emits 'sendChat'
    socket.on('sendChat', (data) => {
      io.sockets.to(socket.room).emit('updatechat', data)
      console.log('Sending to room #' + socket.room + ': ' + data)
    })

    //when the client emits 'connection'
    socket.on('disconnect', () => {
      console.log('user has disconnected from ' + socket.room)
    })
})

// Start Server
server.listen(port, () => {
  console.log("Server started on port: " + port);
});

module.exports = app;