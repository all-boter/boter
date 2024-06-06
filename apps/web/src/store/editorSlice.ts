import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from ".";

export interface Editor {
  id: string;
  message: string;
  completed: boolean;
}

const initialState: Editor = {
  id: "",
  message: "",
  completed: false
}

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      console.log('%c=editorSlice-add', 'color:red', action)
      state.message = action.payload
      return state;
    },
  }
});


export const userState = (state: AppState) => state.editorSlice.message