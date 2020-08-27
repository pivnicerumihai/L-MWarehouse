import { combineReducers } from "redux";
import shopReducer from "./reducers/Shop.reducer";
import userReducer from "./reducers/User.reducer";
import { persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";

const persistConfig = {
  key: `root`,
  storage: sessionStorage,
  whitelist: ["shop", "user"],
};

const rootReducer = combineReducers({
  shop: shopReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
