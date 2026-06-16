import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
// import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
// import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import "../styles/prediction.css";
import { NavLink } from "react-router-dom";

export default function SideBar() {
    return(
        <aside className="sidebar">
          <div className="vertical-title">
            FIFA WORLD CUP 2026
          </div>
          {/* <NavLink to="/">
            <SportsSoccerIcon />
          </NavLink> */}

          <NavLink to="/leaderBoard">
            <EmojiEventsIcon />
          </NavLink>

          {/* <NavLink to="/matchWinner">
            <WorkspacePremiumIcon />
          </NavLink> */}
        </aside>
    )
}