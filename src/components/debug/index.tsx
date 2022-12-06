import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { UnityContextHook } from "react-unity-webgl/distribution/types/unity-context-hook";

type DebugMenuProps = {
  unityContext: UnityContextHook;
};

export const DebugMenu = ({ unityContext }: DebugMenuProps) => {
  const { sendMessage } = unityContext;

  const startGame = () => {
    sendMessage("GameManager", "StartRace");
  };

  // const raceWin = () => {
  //   sendMessage("GameManager", "RaceWin");
  // };

  // const raceLost = () => {
  //   sendMessage("GameManager", "RaceLost");
  // };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Typography color="primary.main" variant="h3">
            Debug Menu
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" onClick={startGame}>
          Start Game
        </Button>
        {/* <Button size="small" variant="outlined" onClick={raceWin}>
          Race Win
        </Button>
        <Button size="small" variant="outlined" onClick={raceLost}>
          Race Lost
        </Button> */}
      </CardActions>
    </Card>
  );
};
