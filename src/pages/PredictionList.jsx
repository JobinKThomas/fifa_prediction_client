import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import "../styles/prediction.css";
const API_URL = import.meta.env.VITE_API_URL;

function PredictionList() {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await axios.get(
          `${API_URL}/api/predictions`
        );
        // const { data } = await axios.get(
        //   "https://fifa-prediction-server.onrender.com/api/predictions"
        // );

        setPredictions(data.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadData();
  }, []);

  const uniqueMatches = useMemo(() => {
    return [
      ...new Map(
        predictions.map((item) => [item.matchNo, item])
      ).values(),
    ];
  }, [predictions]);
  

  const [selectedMatchNo, setSelectedMatchNo] = useState("");

  const currentMatchNo =
    selectedMatchNo || uniqueMatches?.[0]?.matchNo || "";

  const selectedPredictions = useMemo(() => {
    return predictions.filter(
      (item) => item.matchNo === currentMatchNo
    );
  }, [predictions, currentMatchNo]);

  const handleMatchChange = (event) => {
    setSelectedMatchNo(event.target.value);
  };
  const saveResult = async (match) => {
    const payload = {
        matchNo: match.matchNo,
        mobile: match.mobile,
        paymentStatus: !match?.paymentStatus
    };
    try {
        await axios.put(
          `${API_URL}/api/predictions/payment-status`,
          payload
        );
        alert("Result Saved");
      }
      catch (error) {
            console.error(error);
        }
  }
  return (
    <div className="table-container">
      <h2>Prediction List</h2>
      <div style={{ flex: 1, padding: "20px" }}>
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
      </div>
    </div>
  );
}
export default PredictionList;