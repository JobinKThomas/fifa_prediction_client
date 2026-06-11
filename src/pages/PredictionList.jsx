import axios from "axios";
import { useEffect, useState } from "react";

function PredictionList() {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
  async function loadData() {
    try {
      const { data } = await axios.get(
        "https://fifa-prediction-server.onrender.com/api/predictions"
      );

      setPredictions(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  loadData();
}, []);
  console.log(predictions, 'predictionspredictions');
  
  return (
    <div className="table-container">
      <h2>Prediction List</h2>

      <table className="prediction-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Match</th>
            <th>Score</th>
          </tr>
        </thead>

        <tbody>
          {predictions.map((item, index) => (
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

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default PredictionList;