import { useState } from "react";
import { fixtures } from "../data";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField
} from "@mui/material";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

function AdminPage() {
    const [scores, setScores] = useState({});
    const handleScoreChange = (matchNo, team, value) => {
    setScores((prev) => ({
        ...prev,
        [matchNo]: {
        ...prev[matchNo],
        [team]: value,
        },
    }));
    };
    const saveResult = async (match) => {
      const payload = {
          matchNo: match.match,
          teamAResult: Number(scores[match.match]?.teamAResult || 0),
          teamBResult: Number(scores[match.match]?.teamBResult || 0),
      };
      try {
        await axios.put(
          `${API_URL}/api/predictions/match-result`,
          payload
        );
        alert("Result Saved");
      }
      catch (error) {
            console.error(error);
        }
    }
    return (
    <Box>
      {Object.entries(fixtures).map(([date, matches]) => (
        <Box key={date} mb={4}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              mt: 2,
              fontWeight: "bold",
              bgcolor: "#f5f5f5",
              p: 1,
              borderRadius: 1,
            }}
          >
            {date}
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Match</TableCell>
                  <TableCell>Teams</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {matches.map((match) => (
                  <TableRow key={match.match}>
                    <TableCell>{match.match}</TableCell>

                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        flexWrap="wrap"
                      >
                        <img
                          src={match.teams[0].flag}
                          alt={match.teams[0].name}
                          width={25}
                        />
                        {match.teams[0].name}

                        <strong> vs </strong>

                        <img
                          src={match.teams[1].flag}
                          alt={match.teams[1].name}
                          width={25}
                        />
                        {match.teams[1].name}
                      </Box>
                    </TableCell>

                    <TableCell>{match.time}</TableCell>
                    <TableCell>{match.group}</TableCell>
                    <TableCell>
                        <Box display="flex" gap={1} alignItems="center">
                            <TextField
                                size="small"
                                // type="number"
                                sx={{ width: 70 }}
                                value={scores[match.match]?.teamAResult || ""}
                                onChange={(e) =>
                                    handleScoreChange(
                                    match.match,
                                    "teamAResult",
                                    e.target.value
                                    )
                                }
                            />

                            <Typography>-</Typography>

                            <TextField
                                size="small"
                                // type="number"
                                sx={{ width: 70 }}
                                value={scores[match.match]?.teamBResult || ""}
                                onChange={(e) =>
                                    handleScoreChange(
                                    match.match,
                                    "teamBResult",
                                    e.target.value
                                    )
                                }
                            />
                        </Box>
                    </TableCell>

                    <TableCell>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => saveResult(match)}
                    >
                        Save
                    </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </Box>
  );
};
export default AdminPage;

