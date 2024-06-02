import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchData = createAsyncThunk(
  "grid/fetchData",
  async ({ method, url }, thunkAPI) => {
    try {
      const response = await axios({
        method: method.toLowerCase(),
        url,
      });

      console.log("API response:", response.data.data);

      if (Array.isArray(response.data.data)) {
        return response.data;
      } else {
        throw new Error("Data is not an array");
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setData(state, action) {
      state.data.data = Array.isArray(action.payload) ? action.payload : [];
    },
    addRow(state, action) {
      state.data.data.push(action.payload);
    },
    updateRow(state, action) {
      const { id, newData } = action.payload;
      const index = state.data.data.findIndex((item) => item.product_id === id);
      if (index !== -1) {
        state.data.data[index] = { ...state.data.data[index], ...newData };
      }
    },
    deleteRow(state, action) {
      const id = action.payload;
      state.data.data = state.data.data.filter(
        (item) => item.product_id !== id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setData, addRow, updateRow, deleteRow } = gridSlice.actions;

export default gridSlice.reducer;
