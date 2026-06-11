import { useState } from "react";
import "../styles/prediction.css";


export default function PredictionInfo({match}) {
  const [prediction, setPrediction] = useState("DRAW");

  return (
    <div className="prediction-section">
      <h4 className="prediction-title">Your Prediction</h4>
      <div className="prediction-options">
        <label className="prediction-option">
          <input
            type="radio"
            name={`winner-${match?.match}`}
            value="TEAM_A"
            checked={prediction === "TEAM_A"}
            onChange={(e) => setPrediction(e.target.value)}
          />
          <span>Team A Wins</span>
        </label>

        <label className="prediction-option">
          <input
            type="radio"
            name={`winner-${match?.match}`}
            value="DRAW"
            checked={prediction === "DRAW"}
            onChange={(e) => setPrediction(e.target.value)}
          />
          <span>Draw</span>
        </label>

        <label className="prediction-option">
          <input
            type="radio"
            name={`winner-${match?.match}`}
            value="TEAM_B"
            checked={prediction === "TEAM_B"}
            onChange={(e) => setPrediction(e.target.value)}
          />
          <span>Team B Wins</span>
        </label>
      </div>
    </div>
  );
}