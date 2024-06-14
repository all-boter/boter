import { io, Socket } from "socket.io-client";

export class SocketConnector {
  private socket!: Socket;
  private isConnected = false;

  constructor(token: string) {
    console.log('%c=process.env.REACT_APP_BASE_SOCKET', 'color:cyan', { REACT_APP_BASE_SOCKET: process.env.REACT_APP_BASE_SOCKET, token })
    this.socket = io(process.env.REACT_APP_BASE_SOCKET!, {
      auth: {
        token: token,
      }
    });

    this.socket.on("connect", () => {
      console.log('%c=WebSocket connection established', 'color:cyan')
      this.isConnected = true;
      this.setupListeners();
    });

    this.socket.on("disconnect", () => {
      console.log('%c=WebSocket connection disconnected', 'color:cyan',)
      this.isConnected = false;
    });
  }

  private setupListeners() {
    this.socket.on('count', (data) => {
      console.log('%c=Received count', 'color:cyan', data)
    });
  }

  public emitStartEvent() {
    console.log('%c=emitStartEvent', 'color:cyan')
    this.socket.emit('start', 'Start counting');
  }

  public isConnectionEstablished(): boolean {
    return this.isConnected;
  }
}
