import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import walletReducer from './walletSlice'
import friendsReducer from './friendsSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { thunk } from 'redux-thunk'
import { combineReducers } from '@reduxjs/toolkit'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  user: userReducer,
  wallet: walletReducer,
  friends: friendsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return [thunk]
  },
})

export const persistor = persistStore(store)
