import { createSlice } from '@reduxjs/toolkit'

const initialState = { contactedUsers:[] }

const contactedUsersSlice = createSlice({
    name: 'contactedUsers',
    initialState,
    reducers: {
      GET_USER(state,action){
          
          state.contactedUsers.unshift(action.payload)
      },
      UPDATE_USER(state,action){
          
        state.contactedUsers = action.payload
    },
      REMOVE_USER(state,action) {
        state.contactedUsers = state.contactedUsers.filter(contactedUser=>contactedUser.id !== action.payload)
      },
      REMOVE_ALL(state){
          state.contactedUsers = []
      }
      
    },
  })
  export const { UPDATE_USER,GET_USER,REMOVE_USER,REMOVE_ALL } = contactedUsersSlice.actions;
  
  export const contactedUsers = state => state.contactedUsers.contactedUsers;
  
  export default contactedUsersSlice.reducer