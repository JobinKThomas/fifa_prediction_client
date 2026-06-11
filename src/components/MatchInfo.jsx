import "../styles/prediction.css";


export default function MatchInfo({ match }) {
  return (
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
  );
}