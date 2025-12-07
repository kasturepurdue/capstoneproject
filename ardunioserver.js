
import { WebSocketServer } from 'ws';
import { SerialPort, ReadlineParser } from 'serialport';
import express from 'express';
import http from 'http';


const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const port = new SerialPort({ path: '/COM4', baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

// Broadcast to all WebSocket clients
function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

parser.on('data', line => {
  if (line.startsWith('Temp: ')) {
    const temp = parseFloat(line.slice(6));
    console.log(`→ ${temp} °C`);
    broadcast({ type: 'temperature', value: temp});
  } else if (line.includes('Fault')) {
    broadcast({ type: 'fault', message: line.trim() });
  }
});

server.listen(3001, () => {
  console.log('Backend + WebSocket running on ws://localhost:3001');
});