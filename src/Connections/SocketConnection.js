const { Server } = require("socket.io");

exports.ConnectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["*"],
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    // join socket
    socket.on("join", async (data, callback) => {
      try {
        socket.join(data.userId);
        console.log("User joined successfully:", data.userId);
        // callback(null, "Success");
      } catch (error) {
        console.error("Failed to join chat:", error);
        // callback(error);
      }
    });
    //impliment concept to support chat
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
};
