import { createSlice } from '@reduxjs/toolkit';

const stackSlice = createSlice({
  name: 'stack',
  initialState: {
    items: ['Elemento 1', 'Elemento 2'],
  },
  reducers: {
    push: (state, action) => {
      state.items.push(action.payload);
    },
    pop: (state) => {
      if (state.items.length > 0) {
        state.items.pop();
      }
    },
  },
});

export const { push, pop } = stackSlice.actions;
export default stackSlice.reducer;