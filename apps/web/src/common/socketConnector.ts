import { io, Socket } from "socket.io-client";

export class SocketConnector {
  private socket!: Socket;
  private isConnected = false;
  private static instance: SocketConnector;

  constructor(token: string) {
    console.log('%c=process.env.REACT_APP_BASE_SOCKET', 'color:cyan', { REACT_APP_BASE_SOCKET: process.env.REACT_APP_BASE_SOCKET, token })
    this.socket = io(process.env.REACT_APP_BASE_SOCKET!, {
      auth: {
        token,
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

    // this.socket.on("runCode", (data) => {
    //   console.log('%c=WebSocket runCode', 'color:cyan',data)
    // });

    if (!SocketConnector.instance) {
      SocketConnector.instance = this;
    }
  }

  private setupListeners() {
    this.socket.on('count', (data) => {
      console.log('%c=Received count', 'color:cyan', data)
    });
  }

  public emitStartEvent() {
    this.socket.emit('start', 'Start counting');
  }

  public emitBotRunStatus() {
    console.log('%c=emitStartEvent', 'color:cyan')
    this.socket.emit('botRunStatus', 'boter ok');
  }

  public isConnectionEstablished(): boolean {
    return this.isConnected;
  }

  static getInstance(): SocketConnector {
    if (!SocketConnector.instance) {
      // EventsGateway.instance = new EventsGateway(prisma, jwtService);
      console.log('%c=getInstance-1', 'color:red');
    } else {
      console.log('%c=getInstance-2', 'color:red');
    }

    return SocketConnector.instance;
  }
}
