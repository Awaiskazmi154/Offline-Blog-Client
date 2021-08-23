import { createStore, combineReducers } from 'redux';
import blogReducer from './reducers/blogReducer';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';


const rootReducer = combineReducers({
  blogReducer: blogReducer
})


const persistConfig = {
  key: 'root',
  storage : AsyncStorage,
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)