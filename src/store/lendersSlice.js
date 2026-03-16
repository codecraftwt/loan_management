import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'https://loan-backend-cv1k.onrender.com/api';

export const fetchLendersWithPlans = createAsyncThunk(
  "lenders/fetchLendersWithPlans",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token || localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No authentication token');
      }

      const res = await axios.get(`${BASE_URL}/admin/lenders/plans`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.data?.success) {
        throw new Error('API returned unsuccessful');
      }

      const formattedLenders = res.data.data.map(item => ({
        ...item.lender,
        currentPlan: item.currentPlan,
        planPurchaseDetails: item.planPurchaseDetails,
      }));

      return formattedLenders;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch lenders data");
    }
  }
);

// Fetching single lender ID wise
export const fetchLenderDetails = createAsyncThunk(
  "lenders/fetchDetails",
  async (lenderId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token || localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No authentication token');
      }

      const res = await axios.get(
        `${BASE_URL}/admin/lenders/plans?lenderId=${lenderId}&includeDetails=true`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.data?.success || !res.data?.data?.length) {
        throw new Error('Lender not found or API failed');
      }

      return res.data.data[0];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch lender details");
    }
  }
);

const initialState = {
  lenders: [],
  selectedLender: null,
  isLoading: false,
  isLoadingDetails: false,  
  error: null,
  lastFetched: null,
};

const lendersSlice = createSlice({
  name: 'lenders',
  initialState,
  reducers: {
    resetLenders: () => initialState,
    clearSelectedLender: (state) => {
      state.selectedLender = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLendersWithPlans.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLendersWithPlans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lenders = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchLendersWithPlans.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch lender details
      .addCase(fetchLenderDetails.pending, (state) => {
        state.isLoadingDetails = true;
        state.error = null;
        state.selectedLender = null;  
      })
      .addCase(fetchLenderDetails.fulfilled, (state, action) => {
        state.isLoadingDetails = false;
        state.selectedLender = action.payload;  
        state.error = null;  
      })
      .addCase(fetchLenderDetails.rejected, (state, action) => {
        state.isLoadingDetails = false;
        state.error = action.payload;
        state.selectedLender = null;  
      });
  },
});

export const { resetLenders, clearSelectedLender } = lendersSlice.actions;
export default lendersSlice.reducer;
