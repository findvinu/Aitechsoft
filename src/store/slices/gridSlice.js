import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: []
};

const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    addRow(state, action) {
      state.data.push(action.payload);
    },
    updateRow(state, action) {
      const { id, newData } = action.payload;
      const index = state.data.findIndex(item => item.product_id === id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...newData };
      }
    },
    deleteRow(state, action) {
      const id = action.payload;
      state.data = state.data.filter(item => item.product_id !== id);
    },
  },
});

export const { setData, addRow, updateRow, deleteRow } = gridSlice.actions;

export default gridSlice.reducer;
