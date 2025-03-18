import { createSlice } from '@reduxjs/toolkit';

const tripSlice = createSlice({
  name: 'trips',
  initialState: { trips: [], currentTrip: null, loading: false, error: null },
  reducers: {
    setTrip(state, action) {
      state.currentTrip = action.payload;
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setTrip, setLoading, setError } = tripSlice.actions;
export default tripSlice.reducer;
