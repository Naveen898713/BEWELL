require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { mongodbConnection } = require("./src/Connections/DatabaseConnection");
const { ConnectToSocket } = require("./src/Connections/SocketConnection");

app.use(cors());
app.use(express.json());
const server = http.createServer(app);
// database connection
mongodbConnection();
// redis connection
require("./src/Connections/RedisConnection");
// SockectConnection
ConnectToSocket(server);
// server

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

// Routes
require("./src/Routes/User")(app);
require("./src/Routes/AdminRoutes")(app);
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("server is running on ", PORT);
});
