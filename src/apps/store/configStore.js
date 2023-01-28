import { configureStore } from "@reduxjs/toolkit";
// import { verifyAuth } from "./actions/authAction";
import rootReducers from "./reducers/rootReducers";

export function configStore() {
  const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
//   store.dispatch(verifyAuth())
  return store;
}