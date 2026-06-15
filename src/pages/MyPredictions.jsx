import "../styles/prediction.css";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

function MyPredictions() {
    const [search, setSearch] = useState("");
    const [predictions, setPredictions] = useState([]);
    
    useEffect(() => {
    async function loadData() {
        try {
        const { data } = await axios.get(
            `${API_URL}/api/predictions`,
        );
        // const { data } = await axios.get(
        //     "https://fifa-prediction-server.onrender.com/api/predictions"
        // );

        setPredictions(data.data);
        } catch (error) {
        console.error(error);
        }
    }

    loadData();
    }, []);
    
    const filteredPredictions = predictions.filter(
    (item) =>
        item.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
        item.mobile.includes(search)
    );

    return(
        <div className="table-container">
            <TextField
                fullWidth
                label="Search"
                placeholder="Search by name or mobile"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ mb: 2 }}
                className="search-input"
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                    ),
                }}
            />
            <h2>My Predictions</h2>
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
                    {filteredPredictions.map((item, index) => (
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
    )
}
export default MyPredictions;
