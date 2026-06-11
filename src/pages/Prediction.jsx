// import MainContent from "../components/MainContent";
import SideBar from "../components/sideBar";
import MainContent from './MainContent';
import "../styles/prediction.css";
import { fixtures } from "../data"

export default function Prediction() {
    const gettodayFixtures = (fixturesByDate) => {
        const today = new Date();
        today.setDate(today.getDate() + 1);

        const dateKey = today.toISOString().split("T")[0];

        return fixturesByDate[dateKey] || [];
    };
    const matches = gettodayFixtures(fixtures);

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
