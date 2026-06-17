import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
    getPredictionsListApi,
    updateMatchResultApi,
    updatePaymentStatusApi,
    createPredictionApi
} from "./predictionApi";

export const createPrediction = createAsyncThunk(
  "predictions/createPrediction",
  async (payload, { rejectWithValue }) => {
    try {
      return await createPredictionApi(payload);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);
export const fetchPredictions = createAsyncThunk(
  "predictions/fetch",
  async () => {
    return await getPredictionsListApi();
  }
);
export const updatePaymentStatus = createAsyncThunk(
  "prediction/updatePaymentStatus",
  async (match, { rejectWithValue }) => {
    try {
      const payload = {
        matchNo: match.matchNo,
        mobile: match.mobile,
        paymentStatus: !match.paymentStatus,
      };

      return await updatePaymentStatusApi(payload);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);
export const updateMatchResult = createAsyncThunk(
  "predictions/updateMatchResult",
  async ({ match, scores }, { rejectWithValue }) => {
    try {
      const payload = {
        matchNo: match.match,
        teamAResult: Number(
          scores[match.match]?.teamAResult || 0
        ),
        teamBResult: Number(
          scores[match.match]?.teamBResult || 0
        ),
      };

      return await updateMatchResultApi(payload);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);
const predictionSlice = createSlice({
  name: "predictions",
  initialState: {
    predictionData: [],
    predictionResults: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createPrediction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(createPrediction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // Optional: add new prediction to store
        state.predictionData.unshift(action.payload);
      })

      .addCase(createPrediction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(fetchPredictions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPredictions.fulfilled, (state, action) => {
        state.loading = false;
        state.predictionData = action.payload;
        state.predictionResults = (action.payload || []).filter(
          item => item.matchCompleted
        );
      })
      .addCase(fetchPredictions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateMatchResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMatchResult.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // Optional: update local state immediately
        const updatedMatch = action.payload;

        state.predictionData = state.predictionData.map((item) =>
          item.matchNo === updatedMatch.matchNo
            ? {
                ...item,
                teamAResult: updatedMatch.teamAResult,
                teamBResult: updatedMatch.teamBResult,
                matchCompleted: true,
              }
            : item
        );
      })
      .addCase(updateMatchResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updatePaymentStatus.pending, (state) => {
        state.error = null;
      })
      .addCase(updatePaymentStatus.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updatePaymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default predictionSlice.reducer;