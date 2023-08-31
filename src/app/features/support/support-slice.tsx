import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SupportState {
    id: string;
    main: number;
    sub: number
}

const initialState: SupportState = {
    id: "",
    main: 99,
    sub: 99
};

const supportSlice = createSlice({
    name: 'support',
    initialState,
    reducers: {
        saveId(state, action: PayloadAction<string>) {
            state.id = action.payload;
        },

        mainMenuState(state, action:PayloadAction<number>) {
            state.main = action.payload;
        },
        
        subMenuState(state, action:PayloadAction<number>) {
            state.sub = action.payload;
        },
        reset: () => initialState,
    }
});

export const { saveId, mainMenuState, subMenuState, reset } = supportSlice.actions;
export default supportSlice.reducer;