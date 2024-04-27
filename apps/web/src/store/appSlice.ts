import { GithubRepository } from "@/services/githubService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  username: string;
  email: string;
  exp: number;
}

interface InitialState {
  user: User
  githubRepository: GithubRepository | null
}

const initialState: InitialState = {
  user: {
    id: '',
    username: '',
    email: '',
    exp: 0
  },
  // githubRepository: null
  githubRepository: null
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

      console.log('%c=addGithubRepository', 'color:#1dddae', action.payload)

      return state
    }
  }
});

export const appActions = appSlice.actions