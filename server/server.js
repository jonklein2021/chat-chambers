const io = require('socket.io')(9000, {
    cors: { origin: ['http://localhost:3000'] }
});

io.on("connection", socket => {
    console.log('Socket connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
    });

    socket.on('send-message', message => {
        console.log(`${socket.id}: ${message}`);
    })
});