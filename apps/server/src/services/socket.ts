import * as dotenv from 'dotenv'
import { Redis } from 'ioredis';
import { Server } from "socket.io";

dotenv.config();

const pub = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});
const sub = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

class SocketService {
  private _io: Server;

  constructor() {
    console.log('Init Socket Service...')
    this._io = new Server({
      cors: {
        allowedHeaders: ['*'],
        origin: '*',
      },
    });
    sub.subscribe('MESSAGES');
  }

  public initListeners() {
    const io = this.io;
    console.log('Initialize Socket Listeners...');
    
    io.on("connect", (socket) => {
      console.log(`New Socket Connected`, socket.id);

      socket.on('event:message', async ({ message }: { message: string }) => {
        console.log('New Message Received.', message)
        // publish this message to Redis
        await pub.publish('MESSAGES', JSON.stringify({ message }));

        
      });
    });
    
    sub.on('message', (channel, message) => {
      if (channel === 'MESSAGES') {
        console.log('new message from Redis', message);
        io.emit('message', message);
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;