import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SupportState {
    id: string;
    name: string;
    main: string;
    sub: string
}

const initialState: SupportState = {
    id: "",
    name: "",
    main: "",
    sub: ""
};

const supportSlice = createSlice({
    name: 'support',
    initialState,
    reducers: {
        saveId(state, action: PayloadAction<string>) {
            state.id = action.payload;
        },
        saveName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
        mainMenuState(state, action:PayloadAction<string>) {
            state.main = action.payload;
        },
        
        subMenuState(state, action:PayloadAction<string>) {
            state.sub = action.payload;
        },
        reset: () => initialState,
    }
});

export const { saveId, saveName, mainMenuState, subMenuState, reset } = supportSlice.actions;
export default supportSlice.reducer;