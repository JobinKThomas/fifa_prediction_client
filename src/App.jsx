import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import PredictionList from "./pages/PredictionList";
import Prediction from "./pages/Prediction";
import MyPredictions from "./pages/MyPredictions";
import AdminPage from './pages/Admin'

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
        <Route
          path="/my-predictions"
          element={<MyPredictions />}
        />
        <Route
          path="/admin"
          element={<AdminPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;