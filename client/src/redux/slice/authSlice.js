/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem('userInfo')) || null,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginAction: (state, action) => {
            state.user = action.payload;
        },

        logoutAction: (state, action) => {
            state.user = null;
        },

        updateProfileAction: (state, action) => {
            state.user = { ...state.user, ...action.payload };
            localStorage.setItem('userInfo', JSON.stringify(state.user));
        },
    }

});

export const {loginAction, logoutAction, updateProfileAction} = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;