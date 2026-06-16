import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchPredictions,
  updatePaymentStatus
} from "../features/prediction/predictionSlice";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import "../styles/prediction.css";


function PredictionList() {
  const dispatch = useDispatch();
  const { predictionData, loading } = useSelector(
    (state) => state.predictions
  );

  useEffect(() => {
    dispatch(fetchPredictions());
  }, [dispatch]);

  const uniqueMatches = useMemo(() => {
    return [
      ...new Map(
        predictionData.map((item) => [item.matchNo, item])
      ).values(),
    ];
  }, [predictionData]);

  const [selectedMatchNo, setSelectedMatchNo] = useState("");

  const currentMatchNo =
    selectedMatchNo || uniqueMatches?.[0]?.matchNo || "";

  const selectedPredictions = useMemo(() => {
    return predictionData.filter(
      (item) => item.matchNo === currentMatchNo
    );
  }, [predictionData, currentMatchNo]);

  const handleMatchChange = (event) => {
    setSelectedMatchNo(event.target.value);
  };
  const saveResult = async (match) => {
    try {
      await dispatch(updatePaymentStatus(match)).unwrap();

      alert("Payment Status Updated");
    } catch (error) {
      alert("Failed to update payment status");
      console.error(error);
    }
  }
  return (
    <div className="table-container">
      <h2>Prediction List</h2>
      <div style={{ flex: 1, padding: "20px" }}>
        {
          loading ? 
          <h2>Data fetching</h2>
          :
          <>
            <FormControl fullWidth className="match-select">
              <InputLabel>Select Match</InputLabel>
              <Select
                value={selectedMatchNo}
                label="Select Match"
                onChange={handleMatchChange}
              >
                {uniqueMatches.map((match) => (
                  <MenuItem
                    key={match.matchNo}
                    value={match.matchNo}
                  >
                    Match {match.matchNo} | {match.teamA} vs {match.teamB}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <table className="prediction-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Match</th>
                  <th>Predicted Score</th>
                  <th>Match Score</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {selectedPredictions.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.mobile}</td>
                    <td>
                      {item.teamA} vs {item.teamB}
                    </td>
                    <td>
                      {item.teamAScore} - {item.teamBScore}
                    </td>
                    <td>
                      {item.teamAResult !== null && item.teamBResult !== null
                        ? `${item.teamAResult} - ${item.teamBResult}`
                        : null}
                    </td>
                    <td>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => saveResult(item)}
                      >
                        {item?.paymentStatus ? 'Paid' : 'Mark as Paid'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        }
      </div>
    </div>
  );
}
export default PredictionList;