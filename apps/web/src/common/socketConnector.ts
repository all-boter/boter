import store from "@/store";
import { appSlice } from "@/store/appSlice";
import { io, Socket } from "socket.io-client";

enum ConnectStatusType {
  disconnect = 1,
  requesting = 2,
  error = 3,
  connected = 8,
}

export interface ConnectStatus {
  type: ConnectStatusType
  msg: string
}

export class SocketConnector {
  private socket!: Socket;
  private connectStatus = { type: ConnectStatusType.disconnect, msg: 'not init' };
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
      this.connectStatus = { type: ConnectStatusType.connected, msg: 'ok' }
      this.setSocketConnectStatus()
      this.setupListeners();
    });

    this.socket.on("disconnect", (reason) => {
      console.log('%c=WebSocket connection disconnected,reason:', 'color:cyan', reason)
      this.connectStatus = { type: ConnectStatusType.disconnect, msg: reason }
      this.setSocketConnectStatus()
    });

    this.socket.on("connect_error", (error) => {
      console.log('%c=WebSocket connection error', 'color:cyan', error)
      this.connectStatus = { type: ConnectStatusType.error, msg: error.toString() }
      this.setSocketConnectStatus()
    });

    if (!SocketConnector.instance) {
      SocketConnector.instance = this;
    }
  }

  private setSocketConnectStatus() {
    store.dispatch(appSlice.actions.setSocketConnectStatus(this.connectStatus));
  }

  private setupListeners() {
    this.socket.on('count', (data) => {
      console.log('%c=Received count', 'color:cyan', data)
    });

    // this.socket.on("runCode", (data) => {
    //   console.log('%c=WebSocket runCode', 'color:cyan',data)
    // });
  }

  static getInstance(): SocketConnector {
    if (!SocketConnector.instance) {
      console.log('%c=getInstance-1', 'color:red');
    } else {
      console.log('%c=getInstance-2', 'color:red');
    }

    return SocketConnector.instance;
  }

  public getConnectionStatus(): ConnectStatus {
    return this.connectStatus;
  }

  public emitStartEvent() {
    this.socket.emit('start', 'Start counting');
  }

  public emitBotRunStatus() {
    console.log('%c=emitBotRunStatus===>', 'color:cyan')
    this.socket.emit('botRunStatus', 'boter ok', (response: any) => {
      console.log('%c=emitBotRunStatus', 'color:red', response)
    });
  }

  public emitTimeoutBotRunStatus() {
    console.log('%c=emitBotRunStatus===>', 'color:cyan')
    this.socket.timeout(5000).emit('botRunStatus', 'boter ok', (err: any, response: any) => {
      if (err) {
        console.log('%c=emitTimeoutBotRunStatus error', 'color:red', response)
      } else {
        console.log('%c=emitBotRunStatus', 'color:red', response)
      }
    });
  }
}
