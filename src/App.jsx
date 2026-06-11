import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import PredictionList from "./pages/PredictionList";
import Prediction from "./pages/Prediction";
// import PredictionPage from "./pages/PredictionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Prediction />}
        />
        <Route
          path="/predictionList"
          element={<PredictionList />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;