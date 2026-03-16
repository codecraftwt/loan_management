import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import dashboaReducer from "./dashboardSlice";
import lendersReducer from "./lendersSlice";
import plansReducer from "./plansSlice";
import revenueReducer from "./revenueSlice";



export const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboaReducer,
        lenders: lendersReducer,
        plans: plansReducer,
        revenue: revenueReducer,
    }
})