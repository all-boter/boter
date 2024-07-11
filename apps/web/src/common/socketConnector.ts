import store from "@/store";
import { appSlice } from "@/store/appSlice";
import { io, Socket } from "socket.io-client";

enum ConnectStatusType {
  disconnect = 1,
  requesting = 2,
  error = 3,
  connected = 8,
}

enum MessageType {
  BOT_STATUS = 100,
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
    this.socket = io(process.env.REACT_APP_BASE_SOCKET!, {
      auth: {
        token,
      },
      /**
       * force use WebSocket; control polling event sending frequency
       *  */
      transports: ['websocket'],
      reconnectionAttempts: 360,
      reconnectionDelay: 5000,
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

  private setupListeners() {
    this.socket.on('private-msg', (data) => {
      console.log('%c=Received private messageType:', 'color:cyan', data.type, data)
      switch (data.type) {
        case MessageType.BOT_STATUS:
          store.dispatch(appSlice.actions.setBotStatus(data?.data));

          break
        default:
          break;
      }
    });
  }

  private setSocketConnectStatus() {
    store.dispatch(appSlice.actions.setSocketConnectStatus(this.connectStatus));
  }

  static getInstance(): SocketConnector {
    return SocketConnector.instance;
  }

  public getConnectionStatus(): ConnectStatus {
    return this.connectStatus;
  }

  public disconnect(): void {
    if (this.socket) {
      console.log('%c=Manually disconnecting WebSocket', 'color:cyan');
      this.socket.disconnect();
      this.connectStatus = { type: ConnectStatusType.disconnect, msg: 'Manually disconnected' };
      this.setSocketConnectStatus();
    }
  }
}
