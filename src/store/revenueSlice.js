import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'https://loan-backend-cv1k.onrender.com/api';

export const fetchRevenue = createAsyncThunk(
    "revenue/fetchRevenue",
    async ({ startDate, endDate, groupBy = 'all' } = {}, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token || localStorage.getItem('token');
            if (!token) return rejectWithValue('No token found');

            const params = {};
            if (startDate) params.startDate = startDate;
            if (endDate) params.endDate = endDate;
            if (groupBy) params.groupBy = groupBy;

            const res = await axios.get(`${BASE_URL}/admin/revenue`, {
                params,
                headers: { Authorization: `Bearer ${token}` },
            });

            return res.data.data; // summary, revenue byMonth, revenue byYear etc.
        }catch(error){
            return rejectWithValue(error.response?.data?.message || "Failed to fetch revenue");
        }
    }
)





const initialState = {
    revenueData: null,
    isLoading: false,
    error: null,
    lastFetched: null,
};



const revenueSlice = createSlice({
    name: 'revenue',
    initialState,
    reducers: {
        clearRevenueError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRevenue.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchRevenue.fulfilled, (state, action) => {
                state.isLoading = false;
                state.revenueData = action.payload;
                state.lastFetched = Date.now();
            })
            .addCase(fetchRevenue.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearRevenueError } = revenueSlice.actions;
export default revenueSlice.reducer;