import { Income } from "./../../types/Income";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchIncomesData } from "./incomesAPI";

export interface IncomesState {
  allIncomes: Income[];
  incomesStatus: "idle" | "loading" | "failed";
  incomesLoading: boolean;
}

const initialState: IncomesState = {
  allIncomes: [],
  incomesStatus: "idle",
  incomesLoading: true,
};

export const getIncomesData = createAsyncThunk("incomes/get", async () => {
  try {
    const response = await fetchIncomesData();
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
});

const incomesSlice = createSlice({
  name: "incomes",
  initialState,
  reducers: {
    addNew: (state, action: PayloadAction<Income>) => {
      state.allIncomes.push(action.payload);
    },
    remove: (state, action: PayloadAction<string>) => {
      const itemIndex = state.allIncomes.findIndex(
        (i) => i.id === action.payload
      );
      state.allIncomes.splice(itemIndex, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIncomesData.pending, (state) => {
        state.incomesStatus = "loading";
        state.incomesLoading = true;
      })
      .addCase(getIncomesData.fulfilled, (state, action) => {
        state.incomesStatus = "idle";
        state.allIncomes = action.payload;
        state.incomesLoading = false;
      })
      .addCase(getIncomesData.rejected, (state) => {
        state.incomesStatus = "failed";
        state.incomesLoading = false;
      });
  },
});

export const { addNew, remove } = incomesSlice.actions;

export const selectIncomes = (state: RootState) => state.incomes.allIncomes;

export default incomesSlice.reducer;
