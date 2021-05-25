import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import user from "./user";
import test from "./test";
import ranking from "./ranking";

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

export default persistReducer(persistConfig, rootReducer);
