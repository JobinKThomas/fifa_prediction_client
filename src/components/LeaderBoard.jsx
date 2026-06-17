import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchPredictions
} from "../features/prediction/predictionSlice";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function LeaderBoard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { predictionResults, loading } = useSelector(
    (state) => state.predictions
  );
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    dispatch(fetchPredictions());
  }, [dispatch]);
  
  const leaderboard = Object.values(
    predictionResults.reduce((acc, item) => {
      if (!acc[item.mobile]) {
        acc[item.mobile] = {
          mobile: item.mobile,
          name: item.name,
          totalPoints: 0,
          predictionResults: [],
        };
      }

      acc[item.mobile].totalPoints += item.points || 0;
      acc[item.mobile].predictionResults.push(item);

      return acc;
    }, {})
  ).sort((a, b) => b.totalPoints - a.totalPoints);

  return (
    <>
        {
          loading ? 
          <h2>Data fetching</h2>
          :
        <>
        <Box
            sx={{
                mb: 3,
                p: 3,
                borderRadius: 3,
                background: "linear-gradient(135deg,#00ad48,#00c853)",
                color: "white",
                position: "relative",
                textAlign: "center",
            }}
        >
            <IconButton
                onClick={() => navigate("/")}
                sx={{
                position: "absolute",
                left: 16,
                top: 16,
                color: "white",
                bgcolor: "rgba(255,255,255,0.15)",
                "&:hover": {
                    bgcolor: "rgba(255,255,255,0.25)",
                },
                }}
            >
                <ArrowBackIcon />
            </IconButton>

            <Typography
                variant="h4"
                fontWeight={700}
                sx={{ 
                    mt: 1, 
                    fontSize: {
                    xs: "1.8rem",
                    sm: "2.2rem",
                    }, 
                }}
            >
                🏆 Leaderboard
            </Typography>

            <Typography variant="body2">
                FIFA World Cup Prediction Challenge
            </Typography>
        </Box>
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                mb: 4,
                flexWrap: "wrap",
            }}
        >
            {leaderboard.slice(0, 3).map((user, index) => (
                <Box
                    key={user.mobile}
                    sx={{
                        p: 2,
                        minWidth: 120,
                        textAlign: "center",
                        borderRadius: 3,
                        bgcolor: "background.paper",
                        boxShadow: 3,
                    }}
                >
                    <Typography variant="h4">
                        {["🥇", "🥈", "🥉"][index]}
                    </Typography>

                    <Typography fontWeight={600}>
                        {user.name}
                    </Typography>

                    <Typography color="primary">
                        {user.totalPoints} pts
                    </Typography>
                </Box>
            ))}
        </Box>
        {leaderboard.map((user, index) => (
            <Accordion
                key={user.mobile}
                expanded={expanded === user.mobile}
                onChange={handleAccordionChange(user.mobile)}
                sx={{
                mb: 1,
                borderRadius: 2,
                overflow: "hidden",
                "&:before": { display: "none" },
                }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <div
                        style={{
                            width:"100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "10px"

                        }}>
                        <Chip
                        label={`#${index + 1}`}
                        color={
                            index === 0
                            ? "warning"
                            : index === 1
                            ? "secondary"
                            : index === 2
                            ? "success"
                            : "default"
                        }
                        />

                        <Avatar>
                        {user.name.charAt(0).toUpperCase()}
                        </Avatar>

                        <Box flex={1}>
                        <Typography fontWeight={600}>
                            {user.name}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {user.mobile}
                        </Typography>
                        </Box>
                        </div>
                        <Chip
                        color="primary"
                        label={`${user.totalPoints} pts`}
                        />
                    </div>
                </AccordionSummary>

                <AccordionDetails>
                    {user.predictionResults.map((match) => (
                        <Box
                            key={match._id}
                            sx={{
                                p: 2,
                                mb: 1,
                                borderRadius: 2,
                                bgcolor: "background.paper",
                                border: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <div style={{
                                fontWeight: 700,
                            }}>
                                {match.teamA} vs {match.teamB}
                            </div>
                            <div
                            style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "10px"
                            }}>

                            
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                mt={1}
                            >
                                <div style={{
                                fontWeight: 500,
                                }}>
                                Prediction
                                </div>

                                <div style={{
                                fontWeight: 600,
                                marginLeft: "5px"
                                }}>
                                {match.teamAScore} - {match.teamBScore}
                                </div>
                            </Stack>

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                            >
                                <div style={{
                                fontWeight: 500,
                                }}>
                                Actual
                                </div>

                                <div style={{
                                fontWeight: 600,
                                marginLeft: "5px"
                                }}>
                                {match.teamAResult ?? "-"} -{" "}
                                {match.teamBResult ?? "-"}
                                </div>
                            </Stack>
                            </div>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                mt={1}
                            >
                                <div style={{
                                fontWeight: 600,
                                }}>
                                Points
                                </div>
                                <div style={{
                                marginLeft: "5px"
                                }}>
                                <Chip
                                size="small"
                                color={
                                    match.points >= 10
                                    ? "success"
                                    : match.points > 0
                                    ? "warning"
                                    : "default"
                                }
                                label={match.points}
                                />
                                </div>
                            </Stack>
                        </Box>
                    ))}
                </AccordionDetails>
            </Accordion>
        ))}
        </>
        }
    </>
  );
}