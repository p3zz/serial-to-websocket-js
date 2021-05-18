const SerialPort = require("serialport");
const WebSocket = require('ws')

let PORT = parseInt(process.env["PORT"] || "3000", 10);
let BAUDRATE = parseInt(process.env["BAUDRATE"] || "115200", 10);
let DEVICE = process.env["DEVICE"] || "/dev/ttyACM0";

const server = new WebSocket.Server({
    port: PORT
});

let serialPort = new SerialPort(DEVICE, {baudRate: BAUDRATE, autoOpen: true});

serialPort.on("error", (err) => console.log(err.message));

serialPort.on("open", () => {
    console.log("Open serial communication with " + DEVICE);
});

let socketOut = null;

server.on("connection", (socket) => {
    console.log("Client connected at port " + PORT + "\n");

    socketOut = socket;

    socketOut.on('disconnect', () => console.log("Client disconnected from port " + PORT + '\n'));

    socketOut.on("message", (msg) => {
        process.stdout.write(msg);
        serialPort.write(msg);
    });
});


serialPort.on("data", (data) => {
    process.stdout.write(data);
    if (socketOut) {
        socketOut.send(data.toString());
    }
});
