import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from "@mui/material";
import { UnityContextHook } from "react-unity-webgl/distribution/types/unity-context-hook";

type EscrowProps = {
  unityContext: UnityContextHook;
};

export const Escrow = ({ unityContext }: EscrowProps) => {
  const { sendMessage, addEventListener, removeEventListener } = unityContext;

  const onRaceWon = (param) => {
    console.log("RaceWon", param);
  };

  const onRaceLost = (param) => {
    console.log("RaceLost", param);
  };

  useEffect(() => {
    addEventListener("RaceWon", onRaceWon);
    addEventListener("RaceLost", onRaceLost);

    return () => {
      removeEventListener("RaceWon", onRaceWon);
      removeEventListener("RaceLost", onRaceLost);
    };
  }, []);

  const startGame = () => {
    console.log("startGame");
    sendMessage("GameManager", "StartRace");
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Grid mt={6} sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          Total in Escrow
          <Button
            component="a"
            size="medium"
            target="_blank"
            variant="contained"
            onClick={startGame}
          >
            Start Game
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
