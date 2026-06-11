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
    <div>
      {predictions.map((item) => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <p>
            {item.teamA} {item.teamAScore} - {item.teamBScore} {item.teamB}
          </p>
          <p>Prediction : {item.prediction} </p>
        </div>
      ))}
    </div>
  );
}
export default PredictionList;