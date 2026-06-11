import "../styles/prediction.css";


export default function TeamInfo({team}) {
  const [teamA, teamB] = team;
  
  return (
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
          />
        </div>
      </div>
    </div>
  );
}