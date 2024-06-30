import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { appSlice } from './appSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { editorSlice } from './editorSlice';
// import { todos } from './todos';

const rootReducer = combineReducers({
  // todos: todos.reducer,
  editorSlice: editorSlice.reducer,
  appSlice: appSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
export const userState = (state: AppState) => state.appSlice.user
export const stgListState = (state: AppState) => state.appSlice.stgList
export const githubReposState = (state: AppState) => state.appSlice.githubRepository
export const socketConnectStatusState = (state: AppState) => state.appSlice.socketConnectStatus
export const activeBotsState = (state: AppState) => state.appSlice.activeBots

export default store;
