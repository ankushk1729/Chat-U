import { createSlice } from '@reduxjs/toolkit'


const initialState = { chat:null }

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    ADD_CHAT(state,action){
        state.chat = action.payload
    },
    REMOVE_CHAT(state) {
      state.chat = null
    },
    
  },
})
export const { ADD_CHAT,REMOVE_CHAT } = chatSlice.actions;

export const chat = state => state.chat.chat;

export default chatSlice.reducer