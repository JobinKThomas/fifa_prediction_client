import MainContent from "../components/MainContent";
import SideBar from "../components/sideBar";
import "../styles/prediction.css";
import { matches } from "../data"

export default function Prediction() {
    return (
        <>
      {matches.map((match) => (
        <div className="prediction-page">
            <div className="prediction-card">
                <SideBar />
                <MainContent match={match}/>
            </div>
        </div>
      ))}
      </>
    );
}
