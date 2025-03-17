// src/redux/slices/categorySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Category {
  id: number;
  name: string;
  image: string;
  description: string;
}

interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    deleteCategory: (state, action: PayloadAction<number>) => {
      state.categories = state.categories.filter((cat) => cat.id !== action.payload);
    },
  },
});

export const { setCategories, addCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;
