import WebSocket, { WebSocketServer } from 'ws';  // This line was missing the { WebSocketServer }
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';  // Important: correct parser import
import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Serve a simple frontend (optional but useful for testing)
app.use(express.static('public')); // Create a 'public' folder with index.html if you want a UI

const serialPortPath = '/COM3'; // Windows: 'COM10', Linux: '/dev/ttyUSB0', macOS: '/dev/cu.*'
const port = new SerialPort({ path: serialPortPath, baudRate: 115200 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

// Handle serial port errors
port.on('error', (err) => {
  console.error('Serial port error:', err.message);
});

port.on('open', () => {
  console.log(`Serial port ${serialPortPath} opened at 115200 baud`);
});

// Broadcast to all connected WebSocket clients
function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Parse incoming serial data
parser.on('data', line => {
  line = line.trim();
  console.log('←', line); // Log raw input
  broadcast(line);

  
  } );

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('New WebSocket client connected');
  

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

// Optional: serve a test page
app.get('/', (req, res) => {
  res.send(`
    <h1>Sensor WebSocket Bridge Active</h1>
    <p>Open browser console and run:</p>
    <code>
      const ws = new WebSocket('ws://localhost:3001');<br>
      ws.onmessage = (e) => console.log(JSON.parse(e.data));
    </code>
  `);
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`WebSocket server on ws://localhost:${PORT}`);
});