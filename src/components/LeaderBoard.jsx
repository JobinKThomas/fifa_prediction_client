import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchLeaderBoard
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function LeaderBoard() {
  const dispatch = useDispatch();
  const { predictionResults, loading } = useSelector(
    (state) => state.predictions
  );
  useEffect(() => {
    dispatch(fetchLeaderBoard());
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
                background:
                "linear-gradient(135deg,#1976d2,#42a5f5)",
                color: "white",
            }}
        >
            <Typography variant="h4" fontWeight={700}>
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
                sx={{
                mb: 1,
                borderRadius: 2,
                overflow: "hidden",
                "&:before": { display: "none" },
                }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        width="100%"
                    >
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

                        <Chip
                        color="primary"
                        label={`${user.totalPoints} pts`}
                        />
                    </Stack>
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
                            <Typography fontWeight={600}>
                                {match.teamA} vs {match.teamB}
                            </Typography>

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                mt={1}
                            >
                                <Typography variant="body2">
                                Prediction
                                </Typography>

                                <Typography>
                                {match.teamAScore} - {match.teamBScore}
                                </Typography>
                            </Stack>

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                            >
                                <Typography variant="body2">
                                Actual
                                </Typography>

                                <Typography>
                                {match.teamAResult ?? "-"} -{" "}
                                {match.teamBResult ?? "-"}
                                </Typography>
                            </Stack>

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                mt={1}
                            >
                                <Typography variant="body2">
                                Points
                                </Typography>

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