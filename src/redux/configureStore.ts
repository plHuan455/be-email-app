import rootReducer, { RootReducer } from './rootReducer';
import {
  AnyAction,
  configureStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const makeConfiguredStore = <T>(reducer: ReducersMapObject<T, AnyAction>) =>
  configureStore<T>({
    reducer,
    middleware: <T>(getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

const makeStore = () => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return { store: makeConfiguredStore(rootReducer) };
  } else {
    // we need it only on client side
    const { persistStore, persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig = {
      key: 'app-email',
      whitelist: [], // make sure it does not clash with server keys
      storage,
      stateReconciler: autoMergeLevel2,
      blackList: ['user'],
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store =
      makeConfiguredStore<ReturnType<typeof rootReducer>>(persistedReducer);
    const persistor = persistStore(store);

    return { store, persistor };
  }
};

export const store = makeStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
