// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/admin/categorySlice";
// import productReducer from "./slices/productSlice";
// import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    // product: productReducer,
    // user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
