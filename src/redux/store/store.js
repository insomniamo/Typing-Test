import { configureStore } from '@reduxjs/toolkit';
import typingReducer from '@redux/slices/typingSlice.js';

export const store = configureStore({
  reducer: {
    typing: typingReducer,
  },
});

export default store;