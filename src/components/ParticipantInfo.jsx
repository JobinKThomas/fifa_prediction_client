import "../styles/prediction.css";

export default function ParticipantInfo() {
    return(
        <div className="participant-box">
            <h4>Participant Details</h4>

            <div className="participant-grid">
              <div>
                <label>Name</label>
                <input />
              </div>
              <div>
                <label>Mobile</label>
                <input />
              </div>
            </div>
          </div>
    );
}