import { configureStore } from '@reduxjs/toolkit'
import ChatReducer from './reducers/ChatUser';
import ContactedUsersReducer from './reducers/ContactedUsers';
import storage from 'redux-persist/lib/storage';
import {combineReducers} from "redux";
import { persistReducer } from 'redux-persist';

const reducers = combineReducers({
  chat: ChatReducer,
  contactedUsers:ContactedUsersReducer
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist:['contactedUsers']
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
});
