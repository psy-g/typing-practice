import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";
import { applyMiddleware, createStore } from "redux";
import promiseMiddlerware from "redux-promise";
import reduxThunk from "redux-thunk";

import user from "modules/user";
import test from "modules/test";
import ranking from "modules/ranking";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "ranking"],
};

const rootReducer = combineReducers({
  user,
  test,
  ranking,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const Store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(promiseMiddlerware, reduxThunk))
);

const persistor = persistStore(Store);

export { Store, persistor };
