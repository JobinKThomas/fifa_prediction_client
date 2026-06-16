import { Provider } from "react-redux";
import { store } from "./app/store";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import PredictionList from "./components/PredictionList";
import Prediction from "./pages/Prediction";
import AdminPage from './components/Admin'
import MatchWinner from "./components/MatchWinner";
import LeaderBoard from "./components/LeaderBoard";

function App() {
  return (
    <Provider store={store}>
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
            path="/admin"
            element={<AdminPage />}
          />
          <Route
            path="/MatchWinner"
            element={<MatchWinner />}
          />
          <Route
            path="/leaderBoard"
            element={<LeaderBoard />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
    
  );
}

export default App;