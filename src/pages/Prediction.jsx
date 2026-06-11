import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
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

    const [selectedMatch, setSelectedMatch] = useState(matches?.[0] || null);

    const handleMatchChange = (event) => {
        const match = matches.find(
            (item) => item.match === event.target.value
        );

        setSelectedMatch(match);
    };

    return (
        <>
        <div className="prediction-page">
            <div className="prediction-card">
                <SideBar />
                <div style={{ flex: 1, padding: "20px" }}>
                    <FormControl  className="match-select">
                        <InputLabel>Select Match</InputLabel>

                        <Select
                            value={selectedMatch?.match || ""}
                            label="Select Match"
                            onChange={handleMatchChange}
                        >
                            {matches.map((match) => (
                            <MenuItem
                                key={match.match}
                                value={match.match}
                            >
                                {match.date} | {match.teams[0].name} vs {match.teams[1].name}
                            </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {selectedMatch && (
                        <MainContent match={selectedMatch} />
                    )}
                </div>
            </div>
        </div>
      </>
    );
}
