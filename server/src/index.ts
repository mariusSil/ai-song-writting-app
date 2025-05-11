import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { Server as SocketServer } from 'socket.io';
import * as OpenApiValidator from 'express-openapi-validator';
import aiRoutes from './api/ai-routes';
import env from './config/env';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? 'https://yourdomain.com' 
      : 'http://localhost:3001',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// API Documentation
app.use('/api-docs', express.static('openapi'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', version: '0.1.0' });
});

// OpenAPI Validation
app.use(
  OpenApiValidator.middleware({
    apiSpec: './openapi.yaml',
    validateRequests: true,
    validateResponses: true,
  })
);

// API Routes
app.use('/api/ai', aiRoutes);

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  const clientBuildPath = path.resolve(__dirname, '../../client/dist');
  app.use(express.static(clientBuildPath));

  // Handle any requests that don't match the ones above
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

// Socket.IO for real-time features
io.on('connection', (socket) => {
  console.log('New client connected', socket.id);
  
  // Handle real-time editing/collaboration
  socket.on('join-song', (songId: string) => {
    socket.join(`song:${songId}`);
  });
  
  socket.on('leave-song', (songId: string) => {
    socket.leave(`song:${songId}`);
  });
  
  socket.on('update-content', (data: { songId: string, content: any }) => {
    socket.to(`song:${data.songId}`).emit('content-updated', data.content);
  });
  
  // Handle audio streaming for recording
  socket.on('start-recording', (data: { songId: string }) => {
    socket.join(`recording:${data.songId}`);
  });
  
  socket.on('audio-chunk', (data: { songId: string, chunk: ArrayBuffer }) => {
    // Echo audio back for monitoring
    socket.emit('audio-monitor', data.chunk);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });
});

// Start server
const PORT = env.PORT;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
