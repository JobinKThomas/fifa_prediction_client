import { useState } from "react";
import axios from "axios";
import "../styles/prediction.css";

export default function MainContent({ match }) {
    const { teams } = match;
    const [teamA, teamB] = teams;

    const [formData, setFormData] = useState({
        teamAScore: "",
        teamBScore: "",
        prediction: "DRAW",
        name: "",
        mobile: "",
    });
    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    const handleSubmit = async () => {
        if (!formData.name.trim()) {
        return alert("Please enter your name");
        }

        if (!formData.mobile.trim()) {
        return alert("Please enter mobile number");
        }

        if (!formData.teamAScore || !formData.teamBScore) {
        return alert("Please enter both team scores");
        }
        const payload = {
            matchNo: match.match,
            date: match.date,
            venue: match.venue,
            group: match.group,
            teamA: teamA.name,
            teamB: teamB.name,
            ...formData,
        };

        try {
            const { data } = await axios.post(
            "https://fifa-prediction-server.onrender.com/api/predictions",
            payload
            );

            console.log(data);

            alert("Prediction submitted successfully");

            handleClear();
        } catch (error) {
            console.error(error);

            alert(
            error?.response?.data?.message ||
            "Failed to submit prediction"
            );
        }
    };
   
    const handleClear = () => {
        setFormData({
            teamAScore: "",
            teamBScore: "",
            prediction: "DRAW",
            name: "",
            mobile: "",
        });
    };
    
    return(
        <section className="content">
            {/* Match Info */}
            <div className="match-info">
                <div className="info-item">
                    <span className="info-label">DATE</span>
                    <h4 className="info-value">{match?.date}</h4>
                </div>

                <div className="info-item">
                    <span className="info-label">Match</span>
                    <h4 className="info-value">{match.match}</h4>
                </div>

                <div className="info-item">
                    <span className="info-label">GROUP</span>
                    <h4 className="info-value">{match.group}</h4>
                </div>

                <div className="info-item">
                    <span className="info-label">VENUE</span>
                    <h4 className="info-value">{match.venue}</h4>
                </div>
            </div>
            {/* Team Info */}
            <div className="teams-section">
                <div className="team-card">
                    <div className="team-header">
                    <img
                        className="team-flag"
                        src={teamA?.flag}
                        alt={teamA.name}
                    />

                    <div className="team-details">
                        <h2>{teamA.name}</h2>
                        <p>Team A</p>
                    </div>
                    </div>

                    <div className="goal-row">
                    <span>Goals:</span>
                    <input
                        type="number"
                        placeholder="0"
                        min="0"
                        max="20"
                        value={formData.teamAScore}
                        onChange={(e) =>
                            handleChange("teamAScore", e.target.value)
                        }
                    />
                    </div>
                </div>

                <div className="vs-circle">
                    <span>VS</span>
                </div>

                <div className="team-card">
                    <div className="team-header">
                    <img
                        className="team-flag"
                        src={teamB.flag}
                        alt={teamB.name}
                    />

                    <div className="team-details">
                        <h2>{teamB.name}</h2>
                        <p>Team B</p>
                    </div>
                    </div>

                    <div className="goal-row">
                    <span>Goals:</span>
                    <input
                        type="number"
                        placeholder="0"
                        min="0"
                        max="20"
                        value={formData.teamBScore}
                        onChange={(e) =>
                            handleChange("teamBScore", e.target.value)
                        }
                    />
                    </div>
                </div>
            </div>
            {/* Prediction Info */}
            <div className="prediction-section">
                <h4 className="prediction-title">Your Prediction</h4>
                <div className="prediction-options">
                    <label className="prediction-option">
                    <input
                        type="radio"
                        name={`winner-${match?.match}`}
                        value="TEAM_A"
                        checked={formData.prediction === "TEAM_A"}
                        onChange={(e) =>
                            handleChange("prediction", e.target.value)
                        }
                    />
                    <span>Team A Wins</span>
                    </label>

                    <label className="prediction-option">
                    <input
                        type="radio"
                        name={`winner-${match?.match}`}
                        value="DRAW"
                        checked={formData.prediction === "DRAW"}
                        onChange={(e) =>
                            handleChange("prediction", e.target.value)
                        }
                    />
                    <span>Draw</span>
                    </label>

                    <label className="prediction-option">
                    <input
                        type="radio"
                        name={`winner-${match?.match}`}
                        value="TEAM_B"
                        checked={formData.prediction === "TEAM_B"}
                        onChange={(e) =>
                            handleChange("prediction", e.target.value)
                        }
                    />
                    <span>Team B Wins</span>
                    </label>
                </div>
            </div>
            {/* Participant Info */}
            <div className="participant-box">
                <h4>Participant Details</h4>

                <div className="participant-grid">
                <div>
                    <label>Name</label>
                    <input
                        value={formData.name}
                        onChange={(e) =>
                            handleChange("name", e.target.value)
                        }
                    />
                </div>
                <div>
                    <label>Mobile</label>
                    <input
                        value={formData.mobile}
                        onChange={(e) =>
                            handleChange("mobile", e.target.value)
                        }
                    />
                </div>
                </div>
            </div>
            {/* Terms and Coditionds */}
            <p className="terms">
                Terms & Conditions: Each correct team score
                prediction earns 1 point and correct winner
                prediction earns 1 point.
            </p>
            {/* Action Buttons */}
            <div className="action-buttons">
                <button className="clear-btn" onClick={handleClear}>
                  Clear
                </button>

                <button className="submit-btn" onClick={handleSubmit}>
                  Submit
                </button>
          </div>
        </section>
    );
}