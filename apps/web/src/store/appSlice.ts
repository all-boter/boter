import { GithubRepository } from "@/services/githubService";
import { IStrategy, strateies } from "@/services/stgApi";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BotStatus, INotifyBotMsg, SUCCESS } from "@/common/constants";
import { ConnectStatus } from "@/common/socketConnector";
import { getOwnedAllBotsStatus } from "@/services/botApi";
import { getAuthUser } from "@/services/userApi";

export const fetchStrategies = createAsyncThunk(
  "strategies/fetch",
  async () => {
    const res = await strateies();
    if (res.code === SUCCESS) {
      return res.data;
    }

    return []
  }
);

export const queryOwnedAllBotsStatus = createAsyncThunk(
  "owned/allStatus",
  async () => {
    const res = await getOwnedAllBotsStatus();
    if (res.code === SUCCESS) {
      return res.data;
    }

    return []
  }
);

export const fetchAuthUser = createAsyncThunk(
  "auth/user",
  async () => {
    const res = await getAuthUser();
    if (res.code === SUCCESS) {
      return res.data;
    }

    return null
  }
);

enum PlanType {
  Free = 'Free',
  Basic = 'Basic',
  Advanced = 'Advanced',
  God = 'God',
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  planType: PlanType;
  exp?: number;
}

interface InitialState {
  user: User
  githubRepository: GithubRepository | null
  stgList: IStrategy[]
  socketConnectStatus: ConnectStatus,
  activeBots: {
    [botId: string]: {
      status: BotStatus
    }
  },
  botStorage: {
    [botId: string]: {
      data: any
    }
  }
}

const initialState: InitialState = {
  user: {
    id: '',
    username: '',
    email: '',
    exp: 0,
    avatar: "",
    planType: PlanType.Free
  },
  githubRepository: null,
  stgList: [],
  socketConnectStatus: { type: 1, msg: '' },
  activeBots: {},
  botStorage: {}
}

const loadStatePersiste = () => {
  try {
    const serializedState = localStorage.getItem('botUser');
    if (serializedState === null) {
      return initialState;
    }

    return {
      ...initialState,
      user: JSON.parse(serializedState)
    };
  } catch (err) {
    return initialState;
  }
};

const saveStatePersiste = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('botUser', serializedState);
  } catch {
    console.error('saveStatePersiste error')
  }
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState: loadStatePersiste() as InitialState,
  reducers: {
    addGithubRepository: (state, action: PayloadAction<GithubRepository>) => {
      state.githubRepository = action.payload;

      return state
    },
    setSocketConnectStatus: (state, action: PayloadAction<ConnectStatus>) => {
      state.socketConnectStatus = action.payload;

      return state
    },
    setBotStatus: (state, action: PayloadAction<INotifyBotMsg>) => {
      if (action.payload) {
        state.activeBots[action.payload.id] = action.payload
      }

      return state
    },
    setBotStorage: (state, action: PayloadAction<{id: string,data: any}>) => {
      if (action.payload) {
        state.botStorage[action.payload.id] = action.payload.data
      }

      return state
    },
    updateAllBotStatus: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach(botId => {
        state.activeBots[botId] = {
          status: BotStatus.Running
        }
      })

      return state
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchStrategies.fulfilled,
      (state, action: PayloadAction<IStrategy[]>) => {

        state.stgList = action.payload;
      },
    ).addCase(
      queryOwnedAllBotsStatus.fulfilled,
      (state, action: PayloadAction<string[]>) => {
        action.payload.forEach(botId => {
          state.activeBots[botId] = {
            status: BotStatus.Running
          }
        })
      }
    ).addCase(
      fetchAuthUser.fulfilled,
      (state, action: PayloadAction<User | null>) => {
        if (action.payload) {
          saveStatePersiste(action.payload);
          state.user = action.payload
        }
      }
    )
  },
});

export const appActions = appSlice.actions