// src/features/dashboard/dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://loan-backend-cv1k.onrender.com/api';

export const fetchRevenue = createAsyncThunk(
  'dashboard/fetchRevenue',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token || localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No authentication token');
      }

      const res = await axios.get(`${BASE_URL}/admin/revenue?groupBy=all`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.data?.success) {
        throw new Error('API returned unsuccessful');
      }

      return res.data.data.summary;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Failed to fetch revenue');
    }
  }
);

export const fetchRecentActivities = createAsyncThunk(
  'dashboard/fetchRecentActivities',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token || localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No authentication token');
      }

      const res = await axios.get(`${BASE_URL}/admin/recent-activities?limit=10`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.data?.success) {
        throw new Error('API returned unsuccessful');
      }

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Failed to fetch activities');
    }
  }
);




const initialState = {
  revenue: null,
  activities: [],
  isLoading: false,
  error: null,
  lastFetched: null
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    resetDashboard: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // Revenue
      .addCase(fetchRevenue.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRevenue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.revenue = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchRevenue.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Activities
      .addCase(fetchRecentActivities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRecentActivities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activities = action.payload;
      })
      .addCase(fetchRecentActivities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { resetDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;