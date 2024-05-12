import { GithubRepository } from "@/services/githubService";
import { IStrategy, strateies } from "@/services/stgApi";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SUCCESS } from "@/common/constants";

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

export interface User {
  id: string;
  username: string;
  email: string;
  exp: number;
}

interface InitialState {
  user: User
  githubRepository: GithubRepository | null
  stgList: IStrategy[]
}

const initialState: InitialState = {
  user: {
    id: '',
    username: '',
    email: '',
    exp: 0
  },
  githubRepository: null,
  stgList: [],
}

const loadStatePersiste = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialState;
  }
};

const saveStatePersiste = (state: InitialState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch {
    console.error('saveStatePersiste error')
  }
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState: loadStatePersiste() as InitialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;

      saveStatePersiste(state);

      return state;
    },
    addGithubRepository: (state, action: PayloadAction<GithubRepository>) => {
      state.githubRepository = action.payload;

      return state
    }
  },
  extraReducers(builder) {
    builder.addCase(
      fetchStrategies.fulfilled,
      (state, action: PayloadAction<IStrategy[]>) => {

        state.stgList = action.payload;
      },
    )
  },
});

export const appActions = appSlice.actions