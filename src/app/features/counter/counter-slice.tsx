import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
    value: string;
}

const initialState: CounterState = {
    value: "",
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        saveId(state, action: PayloadAction<string>) {
            state.value = action.payload;
        }
    }
});

export const { saveId } = counterSlice.actions;
export default counterSlice.reducer;