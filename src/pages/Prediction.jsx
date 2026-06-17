import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { 
  fetchPredictions
} from "../features/prediction/predictionSlice";
import SideBar from "../components/sideBar";
import MainContent from './MainContent';
import "../styles/prediction.css";
import { fixtures } from "../data";
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";

export default function Prediction() {
    const dispatch = useDispatch();
    dayjs.extend(customParseFormat);

    const getAvailableMatches = (fixtures) => {
        const now = dayjs();

        const today = now.format("YYYY-MM-DD");
        const tomorrow = now.add(1, "day").format("YYYY-MM-DD");

        // Remaining matches today
        const todayMatches = (fixtures[today] || []).filter((match) => {
            const matchDateTime = dayjs(
            `${match.date} ${match.time}`,
            "YYYY-MM-DD HH.mm"
            );

            return now.isBefore(matchDateTime);
        });

        // All tomorrow matches
        const tomorrowMatches = fixtures[tomorrow] || [];

        return [...todayMatches, ...tomorrowMatches];
    };
    const matches = getAvailableMatches(fixtures);
    const [selectedMatch, setSelectedMatch] = useState(matches?.[0] || null);

    const handleMatchChange = (event) => {
        const match = matches.find(
            (item) => item.match === event.target.value
        );
        setSelectedMatch(match);
    };
    useEffect(() => {
      dispatch(fetchPredictions());
    }, [dispatch]);
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
