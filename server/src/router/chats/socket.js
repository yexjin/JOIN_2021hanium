const socketMd = async (ctx, next) => {
  const { io } = ctx;
  
  io.of(/^\/.+/).on("connection", (socket) => {
    const newNamespace = socket.nsp;
    console.log("소켓 연결 성공");
    console.log(socket.nsp.name);

    socket.on("disconnect", () => {
      console.log("소켓 연결 종료");
    });
  });
  ctx.state.io = io;
  await next();
};

export default socketMd;
